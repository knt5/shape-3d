export default function setTextureRepeat(texture, repeat) {
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repeat, repeat);
	return texture;
}
