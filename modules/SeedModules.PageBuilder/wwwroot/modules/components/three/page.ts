import mod = require('SeedModules.PageBuilder/modules/module');
import THREE = require('three');

//THREE['PointerLockControls'] = PointerLockControls;

interface IPointerLockControls {
  dispose();
  getObject(): THREE.Object3D;
  getDirection(v): any;
  enabled: boolean;
}

class PointerLockControls implements IPointerLockControls {
  dispose() {
    document.removeEventListener('mousemove', this._onMouseMove, false);
  }

  getObject(): THREE.Object3D {
    return this._yawObject;
  }

  getDirection(v) {
    return v;
  }

  enabled: boolean;

  private _onMouseMove(event) {}

  private _yawObject: THREE.Object3D;
  private _pitchObject: THREE.Object3D;
  private _PI_2: number;

  constructor(camera) {
    camera.rotation.set(0, 0, 0);

    this._pitchObject = new THREE.Object3D();
    this._pitchObject.add(camera);

    this._yawObject = new THREE.Object3D();
    this._yawObject.position.y = 10;
    this._yawObject.add(this._pitchObject);

    this._PI_2 = Math.PI / 2;

    this._onMouseMove = event => {
      if (!this.enabled) return;

      var movementX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      this._yawObject.rotation.y -= movementX * 0.002;
      this._pitchObject.rotation.x -= movementY * 0.002;

      this._pitchObject.rotation.x = Math.max(
        -this._PI_2,
        Math.min(this._PI_2, this._pitchObject.rotation.x)
      );
    };

    document.addEventListener('mousemove', this._onMouseMove, false);

    this.enabled = false;

    this.getDirection = (() => {
      // assumes the camera itself is not rotated

      var direction = new THREE.Vector3(0, 0, -1);
      var rotation = new THREE.Euler(0, 0, 0, 'YXZ');

      return v => {
        rotation.set(
          this._pitchObject.rotation.x,
          this._yawObject.rotation.y,
          0
        );

        v.copy(direction).applyEuler(rotation);

        return v;
      };
    })();
  }
}

interface IThreeScope extends ng.IScope {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  vm: Controller;

  controlsEnabled: boolean;
}

class Controller {
  lockpointer() {
    var element = document.body;
    var havePointerLock =
      'pointerLockElement' in document ||
      'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document;
    if (havePointerLock) {
      element.requestPointerLock =
        element.requestPointerLock ||
        element['mozRequestPointerLock'] ||
        element['webkitRequestPointerLock'];
      element.requestPointerLock();

      this.controls.enabled = true;
      this.$scope.controlsEnabled = true;
    }
  }

  keydown($event: KeyboardEvent) {
    switch ($event.keyCode) {
      case 27:
        this.controls.enabled = false;
        this.$scope.controlsEnabled = false;
        break;
      default:
        break;
    }
  }

  private controls: PointerLockControls;

  static $inject = ['$scope', '$element'];
  constructor(private $scope: IThreeScope, private $element: JQLite) {
    $scope.vm = this;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      $element.innerWidth() / 600,
      0.1,
      1000
    );

    //
    $scope.controlsEnabled = false;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var vertex = new THREE.Vector3();
    var color = new THREE.Color();
    var raycaster;
    var objects = [];

    var onKeyDown = function(event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        case 32: // space
          if (canJump === true) velocity.y += 350;
          canJump = false;
          break;
      }
    };

    var onKeyUp = function(event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;
      }
    };

    var pointerlockchange = event => {
      if (
        document.pointerLockElement === document.body ||
        document['mozPointerLockElement'] === document.body ||
        document['webkitPointerLockElement'] === document.body
      ) {
        $scope.controlsEnabled = true;
        controls.enabled = true;
      } else {
        controls.enabled = false;
        $scope.controlsEnabled = false;
      }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener(
      'webkitpointerlockchange',
      pointerlockchange,
      false
    );

    raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    );
    //

    var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);

    // vertex displacement

    var position = floorGeometry.attributes.position;

    for (var i = 0, l = position.count; i < l; i++) {
      vertex.fromBufferAttribute(position as THREE.BufferAttribute, i);

      vertex.x += Math.random() * 20 - 10;
      vertex.y += Math.random() * 2;
      vertex.z += Math.random() * 20 - 10;

      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    floorGeometry = floorGeometry.toNonIndexed() as THREE.PlaneBufferGeometry; // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    var colors = [];

    for (var i = 0, l = position.count; i < l; i++) {
      color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      colors.push(color.r, color.g, color.b);
    }

    floorGeometry.addAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );

    var floorMaterial = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors
    });

    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floor);
    //

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize($element.innerWidth(), 600);

    $element.append(renderer.domElement);

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    $scope.scene = scene;
    $scope.camera = camera;
    $scope.renderer = renderer;
    $scope.cube = cube;

    var controls = new PointerLockControls(camera);
    scene.add(controls.getObject());
    this.controls = controls;

    // controls.enabled = true;

    // controls.movementSpeed = 100; //设置移动的速度
    // controls.rollSpeed = Math.PI / 6; //设置旋转速度
    // controls.autoForward = false;
    // controls.dragToLook = false;

    function render() {
      requestAnimationFrame(render);
      update();
    }

    function update() {
      if ($scope.controlsEnabled === true) {
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects(objects);

        var onObject = intersections.length > 0;

        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveLeft) - Number(moveRight);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward)
          velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        if (onObject === true) {
          velocity.y = Math.max(0, velocity.y);
          canJump = true;
        }

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if (controls.getObject().position.y < 10) {
          velocity.y = 0;
          controls.getObject().position.y = 10;

          canJump = true;
        }

        prevTime = time;
      }

      renderer.render(scene, camera);
    }

    render();
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/three/page',
  Controller
);
