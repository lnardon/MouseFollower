// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/MTLLoader.js";

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
const light1 = new THREE.AmbientLight(0xffffff, 1);
const light2 = new THREE.SpotLight(0xffffff);
light2.position.z = 10;
scene.add(light1);
scene.add(light2);

//OBJECT
const loader = new OBJLoader();
const mtlLoader = new MTLLoader();
let helmet;
mtlLoader.load("./eyeball.mtl", (materials) => {
  materials.preload();
  loader.setResourcePath("./textures/");
  loader.setMaterials(materials);
  loader.load("./eyeball.obj", (object) => {
    helmet = object;
    scene.add(helmet);
  });
});

// FUNCTION TO CONVERT COORDINATES
// (x/width) * 2 -1
// -(y/height) * 2 +1

window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(e) {
  helmet.rotation.x = (e.clientY / window.innerHeight) * 2 - 1;
  helmet.rotation.y = (e.clientX / window.innerWidth) * 2 - 1;
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
