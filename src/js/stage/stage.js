import { $window, $stage } from './dom';
import loadSkyBox from './loadSkyBox';

let camera, scene, renderer;
let trackball;
let directionalLight, ambientLight;

init();
animate();

//=========================================================
function init() {
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(getWidth(), getHeight());
	renderer.setPixelRatio(renderer.getPixelRatio());
	renderer.setClearColor(0xffffff);
	$stage.append(renderer.domElement);
	
	// scene
	scene = new THREE.Scene();
	scene.autoUpdate = false;
	// scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
	
	// camera
	camera = new THREE.PerspectiveCamera(30, getAspect(), 1, 10000);
	camera.position.set(0, 100, 300);
	scene.add(camera);
	
	// controls
	trackball = new THREE.TrackballControls(camera, $stage.get(0));
	trackball.staticMoving = false;
	
	// light
	directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(-100, 100, -20);
	directionalLight.castShadow = true;
	scene.add(directionalLight);
	
	ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
	
	// skybox
	const skyBox = loadSkyBox();
	scene.add(skyBox);
	
	// loadGround();
	
	// loadShape();
	
	
	
	
	
	
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
