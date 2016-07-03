import loadTexture from './loadTexture';
import setTextureRepeat from './setTextureRepeat';

const amount = 60;

const dir = '/shapes/';
let texturePath = '/textures/object/1.png';

let texture = setTextureRepeat(loadTexture(texturePath), 1);
let material = createMaterial();
let topMaterial = createTopMaterial();

export default function createMesh(shapeId, callback) {
	const shape = {};
	shape.id = shapeId;
	shape.path = dir + shape.id + '.json';
	
	$.getJSON(shape.path)
	.then(
		(data) => {
			const shapes = createShapes(data);
			
			// Make 3D geometry (ExtrudeGeometry)
			const geometries = createGeometries(shapes);
			const geometry = mergeGeometries(geometries);
			
			// Make top geometry (ShapeGeometry)
			const topGeometries = createTopGeometries(shapes);
			const topGeometry = mergeGeometries(topGeometries);
			
			//-------------------------
			// Set center (xz only)
			// TODO: change
			geometry.computeBoundingBox();
			const x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
			const z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
			geometry.translate(-x, 0, -z);
			topGeometry.translate(-x, amount + 0.1, -z);
			//-------------------------
			
			// Make mesh
			const mesh = new THREE.Mesh(geometry, material);
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			
			// Make top mesh
			const topMesh = new THREE.Mesh(topGeometry, topMaterial);
			
			callback(mesh, topMesh);
		},
		() => {
			console.error(`Failed to load: ${shape.path}`);
			callback();
		}
	);
}

//=========================================================
function createMaterial() {
	return new THREE.MeshPhongMaterial({
		color: 0xffffff,
		map: texture,
		bumpMap: texture,
	});
}

//=========================================================
function createTopMaterial() {
	return new THREE.MeshStandardMaterial({
		color: 0xffffff,
		roughness: 0.15,
		metalness: 0.6
	});
}

//=========================================================
function createGeometries(shapes) {
	const geometries = [];
	let geometry;
	
	for (const shape of shapes) {
		geometry = new THREE.ExtrudeGeometry(shape, {
			amount,
			bevelThickness: 0,
			bevelSize: 0,
			bevelSegments: 0,
			bevelEnabled: false,
			curveSegments: 0,
			steps: 1
		});
		
		geometry.rotateX(-Math.PI / 2);
		
		geometries.push(geometry);
	}
	
	return geometries;
}

//=========================================================
function createTopGeometries(shapes) {
	const geometries = [];
	let geometry;
	
	for (const shape of shapes) {
		geometry = new THREE.ShapeGeometry(shape);
		geometry.rotateX(-Math.PI / 2);
		geometries.push(geometry);
	}
	
	return geometries;
}

//=========================================================
function mergeGeometries(geometries) {
	const geometry = new THREE.Geometry();
	geometries.forEach((g) => geometry.mergeMesh(new THREE.Mesh(g)));
	
	return geometry;
}

//=========================================================
function createShapes(data) {
	let feature, c, i;
	const shapes = [];
	let shape, vectors;
	
	for (feature of data.features) {
		c = feature.geometry.coordinates;
		
		for (i=0; i<c.length; i++) {
			vectors = createVectors(c[i]);
			
			if (i === 0) {
				shape = new THREE.Shape(vectors);
			} else {
				shape.holes.push(new THREE.Path(vectors));
			}
		}
		
		shapes.push(shape);
	}
	
	return shapes;
}

//=========================================================
function createVectors(ring) {
	return ring.map((xy) => new THREE.Vector2(xy[0], xy[1]));
}
