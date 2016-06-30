(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./stage');

},{"./stage":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $window = exports.$window = $(window);
var $stage = exports.$stage = $('#stage');

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loadSkyBox;
var dir = '/textures/skybox/';

function loadSkyBox() {
	var loader = new THREE.TextureLoader();

	var materials = [new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }), // right
	new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }), // left
	new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'top.png') }), // top
	new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'bottom.png') }), // bottom
	new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }), // front
	new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }) // back
	];

	var material = new THREE.MeshFaceMaterial(materials);

	var geometry = new THREE.BoxGeometry(3000, 3000, 3000);

	var mesh = new THREE.Mesh(geometry, material);

	return mesh;
}

},{}],4:[function(require,module,exports){
'use strict';

var _dom = require('./dom');

var _loadSkyBox = require('./loadSkyBox');

var _loadSkyBox2 = _interopRequireDefault(_loadSkyBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var camera = void 0,
    scene = void 0,
    renderer = void 0;
var trackball = void 0;
var directionalLight = void 0,
    ambientLight = void 0;

init();
animate();

//=========================================================
function init() {

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(getWidth(), getHeight());
	renderer.setPixelRatio(renderer.getPixelRatio());
	renderer.setClearColor(0xffffff);
	_dom.$stage.append(renderer.domElement);

	// scene
	scene = new THREE.Scene();
	scene.autoUpdate = false;
	// scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

	// camera
	camera = new THREE.PerspectiveCamera(30, getAspect(), 1, 10000);
	camera.position.set(0, 100, 300);
	scene.add(camera);

	// controls
	trackball = new THREE.TrackballControls(camera, _dom.$stage.get(0));
	trackball.staticMoving = false;

	// light
	directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(-100, 100, -20);
	directionalLight.castShadow = true;
	scene.add(directionalLight);

	ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);

	// skybox
	var skyBox = (0, _loadSkyBox2.default)();
	scene.add(skyBox);

	// loadGround();

	// loadShape();

	_dom.$window.on('resize', function () {
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

},{"./dom":2,"./loadSkyBox":3}]},{},[1]);
