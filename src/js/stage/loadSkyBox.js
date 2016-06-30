const dir = '/textures/skybox/';

export default function loadSkyBox() {
	const loader = new THREE.TextureLoader();
	
	const materials = [
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }),  // right
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }),  // left
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'top.png') }),  // top
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'bottom.png') }),  // bottom
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') }),  // front
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: loader.load(dir + 'side.png') })  // back
	];
	
	const material = new THREE.MeshFaceMaterial(materials);
	
	const geometry = new THREE.BoxGeometry(3000, 3000, 3000);
	
	const mesh = new THREE.Mesh(geometry, material);
	
	return mesh;
}
