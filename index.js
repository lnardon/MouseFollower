// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js";

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setClearColor(0x25c8ce);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 5;

//LIGHTS
const light1 = new THREE.AmbientLight(0xffffff, 0.5),
  light2 = new THREE.PointLight(0xffffff, 1);

scene.add(light1);
scene.add(light2);

//OBJECT
const box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  new THREE.MeshNormalMaterial()
);
box.geometry.translate(0, 0, 0.5);
box.scale.set(1, 1, 1);
scene.add(box);

window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(e) {
  console.log(box.rotation);
  if (e.clientX < window.innerWidth / 2) {
    box.rotation.y = -0.2;
  } else {
    box.rotation.y = 0.2;
  }

  if (e.clientY < window.innerHeight / 2) {
    box.rotation.x = -0.2;
  } else {
    box.rotation.x = 0.2;
  }
}

//RENDER LOOP
requestAnimationFrame(render);
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
