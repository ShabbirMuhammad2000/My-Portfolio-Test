import { render } from 'vue'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.addEventListener('DOMContentLoaded', () => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 1000);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.setZ(30)

  renderer.render(scene, camera)

  const geometry = new THREE.TorusGeometry(10, 4, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xf347 });
  const torus = new THREE.Mesh(geometry, material);
  
  scene.add(torus)

  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10,10,10)
  
  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// // const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('/public/stars-2643089_1280.jpg')
scene.background = spaceTexture


// Avatar
const mubiTexture = new THREE.TextureLoader().load('/public/IMG-20230312-WA0000.jpg')


const mubi = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({
    map: mubiTexture
  })
 )

 scene.add(mubi)


// Moon

const moonTexture = new THREE.TextureLoader().load('/public/beautiful-glowing-gray-full-moon.jpg')
const normalTexture = new THREE.TextureLoader().load('/public/black-white-details-moon-texture-concept (1).jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)

mubi.position.z = -5;
mubi.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  mubi.rotation.y += 0.01;
  mubi.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera
moveCamera()

// Animation Loop
  function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    moon.rotation.x += 0.005;
    
    // controls.update()

    renderer.render(scene, camera)
  }

  animate()

})

