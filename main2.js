/*************** 1. Init Scene ************** */
const scene = new THREE.Scene();
/*************** End Scene **************** */

/*************** 2. Init Camera ************** */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10; // In order to see the object
/*************** End Camera **************** */

/*************** 3. Init Renderer ************** */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // wire up html
/***************** End Renderer ************** */

/*************** 4. Responsive ************** */
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
/*************** End Responsive *********** */

/*************** 5. Init Interactor ************** */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
/*************** End Interactor ************** */

/*************** 6. Init Geometry ************** */
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
// const mesh = new THREE.Mesh(geometry, material);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xf7f7f7 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(2, 2, -2);
// mesh.rotation.set(45, 0, 0);
// mesh.scale.set(1, 2, 1);
//scene.add(mesh);
//let meshX = -10;
for (let i = 0; i < 15; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  scene.add(mesh);
  //meshX += 1;
}
/*************** End Geometry ************** */

/*************** 7. Init Light ************** */
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);
// const light2 = new THREE.PointLight(0xffffff, 2, 1000);
// light.position.set(0, 0, 25);
// scene.add(light2);
/*************** End Light ************** */

/********* 8. Add scene and camera to a func ********** */
const render = () => {
  // Redraw render every time refresh
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
/********* End Func ********** */

/********* 9. Define Interaction Func ********** */
function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  for (let i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, 0.5, {
      x: 0.5,
      ease: Expo.easeOut
    });
    this.tl.to(intersects[i].object.position, 0.5, {
      x: 2,
      ease: Expo.easeOut
    });
    this.tl.to(
      intersects[i].object.rotation,
      0.5,
      { y: Math.PI * 5, ease: Expo.easeOut },
      '=-1.5'
    );
  }
}
/********* End func ********** */

window.addEventListener('mousemove', onMouseMove);
render();
