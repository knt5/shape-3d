import { $window, $stage } from './dom';
import createSkyBox from './createSkyBox';
import createMesh from './createMesh';
import createGround from './createGround';
import datGui from './datGui';

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

// Light
let sunDistance = 200;

// Camera
let cameraRadius = 600;
let cameraHeight = 300;
let cameraDirection = Math.PI / 2;

init();
animate();

//=========================================================
function init() {
	createStage();  // Create renderer, scene, camera and controls
	addLights();
	addSkyBox();
	
	//scene.add(new THREE.GridHelper(300, 10));
	
	createMesh(id, (createedMesh, topMesh) => {
		// Save
		mesh = createedMesh;
		
		// Add to scene
		scene.add(mesh);
		scene.add(topMesh);
		
		// Create and add ground to scene
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
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	$stage.append(renderer.domElement);
	
	// scene
	scene = new THREE.Scene();
	scene.autoUpdate = false;
	// scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
	
	// camera
	camera = new THREE.PerspectiveCamera(30, getAspect(), 1, 10000);
	camera.position.set(
		cameraRadius * Math.cos(cameraDirection),
		cameraHeight,
		cameraRadius * Math.sin(cameraDirection)
	);
	scene.add(camera);
	
	// controls
	trackball = new THREE.TrackballControls(camera, $stage.get(0));
	trackball.staticMoving = false;
	trackball.maxDistance = 1000;
	trackball.minDistance = 200;
}

//=========================================================
function addLights() {
	// directional
	light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(
		sunDistance * Math.cos(datGui.config.sunDirection),
		datGui.config.sunHeight,
		sunDistance * Math.sin(datGui.config.sunDirection)
	);
	light.castShadow = true;
	//light.shadow.mapSize.width = 2048;
	//light.shadow.mapSize.height = 2048;
	light.shadow.camera.top = 300;
	light.shadow.camera.bottom = -300;
	light.shadow.camera.left = -300;
	light.shadow.camera.right = 300;
	scene.add(light);
	
	// helper
	//scene.add(new THREE.CameraHelper(light.shadow.camera));
	
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
	scene.updateMatrixWorld();
	renderer.render(scene, camera);
}

//=========================================================
function animate() {
	// Set light position
	light.position.x = sunDistance * Math.cos(datGui.config.sunDirection);
	light.position.y = datGui.config.sunHeight;
	light.position.z = sunDistance * Math.sin(datGui.config.sunDirection);
	
	// Auto rotation of camera
	if (datGui.config.autoRatation) {
		cameraDirection += 0.002;
		camera.position.x = cameraRadius * Math.cos(cameraDirection);
		camera.position.z = cameraRadius * Math.sin(cameraDirection);
		camera.lookAt(scene.position);
	} else {
		trackball.update();
	}
	
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
