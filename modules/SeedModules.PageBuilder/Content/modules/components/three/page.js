define(["require", "exports", "SeedModules.PageBuilder/modules/module", "three"], function (require, exports, mod, THREE) {
    "use strict";
    exports.__esModule = true;
    var PointerLockControls = (function () {
        function PointerLockControls(camera) {
            var _this = this;
            camera.rotation.set(0, 0, 0);
            this._pitchObject = new THREE.Object3D();
            this._pitchObject.add(camera);
            this._yawObject = new THREE.Object3D();
            this._yawObject.position.y = 10;
            this._yawObject.add(this._pitchObject);
            this._PI_2 = Math.PI / 2;
            this._onMouseMove = function (event) {
                if (!_this.enabled)
                    return;
                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                _this._yawObject.rotation.y -= movementX * 0.002;
                _this._pitchObject.rotation.x -= movementY * 0.002;
                _this._pitchObject.rotation.x = Math.max(-_this._PI_2, Math.min(_this._PI_2, _this._pitchObject.rotation.x));
            };
            document.addEventListener('mousemove', this._onMouseMove, false);
            this.enabled = true;
            this.getDirection = (function () {
                var direction = new THREE.Vector3(0, 0, -1);
                var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
                return function (v) {
                    rotation.set(_this._pitchObject.rotation.x, _this._yawObject.rotation.y, 0);
                    v.copy(direction).applyEuler(rotation);
                    return v;
                };
            })();
        }
        PointerLockControls.prototype.dispose = function () {
            document.removeEventListener('mousemove', this._onMouseMove, false);
        };
        PointerLockControls.prototype.getObject = function () {
            return this._yawObject;
        };
        PointerLockControls.prototype.getDirection = function (v) {
            return v;
        };
        PointerLockControls.prototype._onMouseMove = function (event) { };
        return PointerLockControls;
    }());
    var Controller = (function () {
        function Controller($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            $scope.vm = this;
            $scope.lon = 0;
            $scope.lat = 0;
            $scope.phi = 0;
            $scope.theta = 0;
            $scope.onPointerDownPointerX = 0;
            $scope.onPointerDownPointerY = 0;
            $scope.onPointerDownLon = 0;
            $scope.onPointerDownLat = 0;
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, $element.innerWidth() / 600, 0.1, 1000);
            var controlsEnabled = true;
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
            var onKeyDown = function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        moveForward = true;
                        break;
                    case 37:
                    case 65:
                        moveLeft = true;
                        break;
                    case 40:
                    case 83:
                        moveBackward = true;
                        break;
                    case 39:
                    case 68:
                        moveRight = true;
                        break;
                    case 32:
                        if (canJump === true)
                            velocity.y += 350;
                        canJump = false;
                        break;
                }
            };
            var onKeyUp = function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        moveForward = false;
                        break;
                    case 37:
                    case 65:
                        moveLeft = false;
                        break;
                    case 40:
                    case 83:
                        moveBackward = false;
                        break;
                    case 39:
                    case 68:
                        moveRight = false;
                        break;
                }
            };
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);
            raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
            var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
            floorGeometry.rotateX(-Math.PI / 2);
            var position = floorGeometry.attributes.position;
            for (var i = 0, l = position.count; i < l; i++) {
                vertex.fromBufferAttribute(position, i);
                vertex.x += Math.random() * 20 - 10;
                vertex.y += Math.random() * 2;
                vertex.z += Math.random() * 20 - 10;
                position.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }
            floorGeometry = floorGeometry.toNonIndexed();
            position = floorGeometry.attributes.position;
            var colors = [];
            for (var i = 0, l = position.count; i < l; i++) {
                color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                colors.push(color.r, color.g, color.b);
            }
            floorGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            var floorMaterial = new THREE.MeshBasicMaterial({
                vertexColors: THREE.VertexColors
            });
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            scene.add(floor);
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
            controls.enabled = true;
            function render() {
                requestAnimationFrame(render);
                update();
            }
            function update() {
                if (controlsEnabled === true) {
                    raycaster.ray.origin.copy(controls.getObject().position);
                    raycaster.ray.origin.y -= 10;
                    var intersections = raycaster.intersectObjects(objects);
                    var onObject = intersections.length > 0;
                    var time = performance.now();
                    var delta = (time - prevTime) / 1000;
                    velocity.x -= velocity.x * 10.0 * delta;
                    velocity.z -= velocity.z * 10.0 * delta;
                    velocity.y -= 9.8 * 100.0 * delta;
                    direction.z = Number(moveForward) - Number(moveBackward);
                    direction.x = Number(moveLeft) - Number(moveRight);
                    direction.normalize();
                    if (moveForward || moveBackward)
                        velocity.z -= direction.z * 400.0 * delta;
                    if (moveLeft || moveRight)
                        velocity.x -= direction.x * 400.0 * delta;
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
        Controller.prototype.mousedown = function ($event) {
            $event.preventDefault();
            this.$scope.focued = true;
            this.$scope.onPointerDownPointerX = $event.clientX;
            this.$scope.onPointerDownPointerY = $event.clientY;
            this.$scope.onPointerDownLon = this.$scope.lon;
            this.$scope.onPointerDownLat = this.$scope.lat;
        };
        Controller.prototype.mouseup = function ($event) {
            this.$scope.focued = false;
        };
        Controller.prototype.mousemove = function ($event) {
            if (!this.$scope.focued)
                return;
            this.$scope.lon =
                (this.$scope.onPointerDownPointerX - $event.clientX) * 0.1 +
                    this.$scope.onPointerDownLon;
            this.$scope.lat =
                ($event.clientY - this.$scope.onPointerDownPointerY) * 0.1 +
                    this.$scope.onPointerDownLat;
        };
        Controller.prototype.keydown = function ($event) {
            switch ($event.keyCode) {
                case 65:
                    this.$scope.camera.position.x -= 0.1;
                    break;
                case 68:
                    this.$scope.camera.position.x += 0.1;
                    break;
                case 87:
                    this.$scope.camera.position.z -= 0.1;
                    break;
                case 83:
                    this.$scope.camera.position.z += 0.1;
                    break;
                case 27:
                    this.$element.blur();
                    break;
                default:
                    break;
            }
        };
        Controller.$inject = ['$scope', '$element'];
        return Controller;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/three/page', Controller);
});
//# sourceMappingURL=page.js.map