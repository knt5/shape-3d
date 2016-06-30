import { $window, $stage } from './dom';
import createSkyBox from './createSkyBox';
import createMesh from './createMesh';
import createGround from './createGround';

// Parameter
const id = getId();

// 3D Basis
let camera, scene, renderer;
let trackball;
let light, ambientLight;

// 3D Objects
let skyBox;
let mesh;
let ground;

init();
animate();

//=========================================================
function init() {
	createStage();  // Create renderer, scene, camera and controls
	addLights();
	addSkyBox();
	
	//scene.add(new THREE.GridHelper(300, 10));
	
	createMesh(id, (createedMesh) => {
		mesh = createedMesh;
		scene.add(mesh);
		
		ground = createGround(mesh);
		scene.add(ground);
	});
	
	registerEvents();
}

//=========================================================
function createStage() {
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(getWidth(), getHeight());
	renderer.setPixelRatio(renderer.getPixelRatio());
	renderer.setClearColor(0xffffff);
	renderer.shadowMap.enabled = true;
	$stage.append(renderer.domElement);
	
	// scene
	scene = new THREE.Scene();
	scene.autoUpdate = false;
	// scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
	
	// camera
	camera = new THREE.PerspectiveCamera(30, getAspect(), 1, 10000);
	camera.position.set(0, 300, 500);
	scene.add(camera);
	
	// controls
	trackball = new THREE.TrackballControls(camera, $stage.get(0));
	trackball.staticMoving = false;
	trackball.maxDistance = 1000;
}

//=========================================================
function addLights() {
	// directional
	light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(-200, 100, -50);
	light.castShadow = true;
	//light.shadow.mapSize.width = 2048;
	//light.shadow.mapSize.height = 2048;
	scene.add(light);
	
	// ambient
	ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
}

//=========================================================
function addSkyBox() {
	skyBox = createSkyBox();
	scene.add(skyBox);
}

//=========================================================
function registerEvents() {
	$window.on('resize', () => {
		camera.aspect = getAspect();
		camera.updateProjectionMatrix();
		renderer.setSize(getWidth(), getHeight());
	});
}

//=========================================================
function render() {
	trackball.update();
	scene.updateMatrixWorld();
	renderer.render(scene, camera);
}

//=========================================================
function animate() {
	render();
	requestAnimationFrame(animate);
}

//=========================================================
function getWidth() {
	return window.innerWidth;
}

function getHeight() {
	return window.innerHeight;
}

function getAspect() {
	return getWidth() / getHeight();
}

//=========================================================
function getId() {
	const path = window.location.pathname;
	return path.substr(path.lastIndexOf('/') + 1);
}
