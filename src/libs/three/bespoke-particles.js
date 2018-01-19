/* Refined version of https://threejs.org/examples/?q=partic#canvas_interactive_particles */

/* eslint-disable no-undef */
let PI2 = Math.PI * 2,
	container,
	camera,
	scene,
	renderer,
	radius = 600,
	theta = 0,
	programFill = function(context) {
		context.beginPath();
		context.arc(0, 0, 0.5, 0, PI2, true);
		context.fill();
	};

init();
animate();

function init() {
	container = document.createElement("div");
	container.className = "bg";
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 0);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xfcf9e7);

	for (let i = 0; i < 150; i++) {
		let particle = new THREE.Sprite(new THREE.SpriteCanvasMaterial({color: Math.random() * 0x808080 + 0x808080, program: programFill, opacity: 0.1}));

		particle.position.x = Math.random() * 800 - 400;
		particle.position.y = Math.random() * 800 - 400;
		particle.position.z = Math.random() * 800 - 400;
		particle.scale.x = particle.scale.y = Math.random() * 20 + 20;
		scene.add(particle);
	}

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);

	render();
}

function render() {
	theta += 0.025;

	camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
	camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
	camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
	camera.lookAt(scene.position);

	camera.updateMatrixWorld();
	renderer.render(scene, camera);
}
