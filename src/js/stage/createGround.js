import loadTexture from './loadTexture';
import setTextureRepeat from './setTextureRepeat';

let texturePath = '/textures/ground/1.png';

let texture = setTextureRepeat(loadTexture(texturePath), 10);

export default function createGround(mesh) {
	const geometry = createGeometry(mesh);
	const material = createMaterial();
	geometry.translate(0, -0.1, 0);
	
	const ground = new THREE.Mesh(geometry, material);
	ground.receiveShadow = true;
	
	return ground;
}

//=========================================================
function createMaterial() {
	return new THREE.MeshPhongMaterial({
		side: THREE.DoubleSide,
		map: texture,
		bumpMap: texture,
	});
}

//=========================================================
function createGeometry(mesh) {
	const box = mesh.geometry.boundingBox;
	const w = box.max.x - box.min.x;
	const h = box.max.z - box.min.z;
	const geometry = new THREE.PlaneGeometry(w, h);
	
	geometry.rotateX(-Math.PI / 2);
	
	return geometry;
}
