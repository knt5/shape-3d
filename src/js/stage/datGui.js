const datGui = new dat.GUI();
const config = {
	sunDirection: 0.97 * Math.PI,
	sunHeight: 220
};

init();

//=========================================================
export default {
	config,
	datGui
};

//=========================================================
function init() {
	datGui.add(config, 'sunDirection', 0, Math.PI * 2);
	datGui.add(config, 'sunHeight', 0, 500);
}
