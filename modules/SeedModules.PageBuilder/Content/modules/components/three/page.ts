import mod = require('SeedModules.PageBuilder/modules/module');
import THREE = require('three');

class Controller {
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      $element.innerWidth() / 600,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize($element.innerWidth(), 600);

    $element.append(renderer.domElement);

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    function render() {
      requestAnimationFrame(render);
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    }
    render();
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/three/page',
  Controller
);
