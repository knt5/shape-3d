import loadTexture from './loadTexture';

const dir = '/textures/skybox/';

export default function createSkyBox() {
	const side = loadTexture(dir + 'side.png');
	const top = loadTexture(dir + 'top.png');
	const bottom = loadTexture(dir + 'bottom.png');
	
	const materials = [
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: side }),  // right
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: side }),  // left
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: top }),  // top
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: bottom }),  // bottom
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: side }),  // front
		new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: side })  // back
	];
	
	const material = new THREE.MeshFaceMaterial(materials);
	const geometry = new THREE.BoxGeometry(3000, 3000, 3000);
	const mesh = new THREE.Mesh(geometry, material);
	
	return mesh;
}
