let container;
let camera,
	scene,
	renderer;

// let raycaster;
// let mouse;

let PI2 = Math.PI * 2;

let programFill = function(context) {
	context.beginPath();
	context.arc(0, 0, 0.5, 0, PI2, true);
	context.fill();
};

// let programStroke = function(context) {
// 	context.lineWidth = 0.025;
// 	context.beginPath();
// 	context.arc(0, 0, 0.5, 0, PI2, true);
// 	context.stroke();
// };

// let INTERSECTED;

let radius = 600;
let theta = 0;

init();
animate();

function init() {
	container = document.createElement("div");
	container.className = "bg";
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 0);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	for (let i = 0; i < 150; i++) {
		let particle = new THREE.Sprite(new THREE.SpriteCanvasMaterial({color: Math.random() * 0x808080 + 0x808080, program: programFill, opacity: 0.1}));

		particle.position.x = Math.random() * 800 - 400;
		particle.position.y = Math.random() * 800 - 400;
		particle.position.z = Math.random() * 800 - 400;
		particle.scale.x = particle.scale.y = Math.random() * 20 + 20;
		scene.add(particle);
	}

	// raycaster = new THREE.Raycaster();
	// mouse = new THREE.Vector2();

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	//document.addEventListener("mousemove", onDocumentMouseMove, false);

	//

	window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

// function onDocumentMouseMove(event) {
// 	event.preventDefault();

// 	// mouse.x = event.clientX / window.innerWidth * 2 - 1;
// 	// mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

//

function animate() {
	requestAnimationFrame(animate);

	render();
}

function render() {
	// rotate camera

	theta += 0.025;

	camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
	camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
	camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
	camera.lookAt(scene.position);

	camera.updateMatrixWorld();

	// find intersections

	//raycaster.setFromCamera(mouse, camera);

	// let intersects = raycaster.intersectObjects(scene.children);

	// if (intersects.length > 0) {
	// 	if (INTERSECTED !== intersects[0].object) {
	// 		if (INTERSECTED) {
	// 			INTERSECTED.material.program = programStroke;
	// 		}

	// 		INTERSECTED = intersects[0].object;
	// 		INTERSECTED.material.program = programFill;
	// 	}
	// } else {
	// 	if (INTERSECTED) {
	// 		INTERSECTED.material.program = programStroke;
	// 	}

	// 	INTERSECTED = null;
	// }

	renderer.render(scene, camera);
}
