
//** ENV

let canvas;
let context;
let mouse;
let particles;

function init() {
	canvas = document.querySelector('#viewport');
	context = canvas.getContext('2d');
	mouse = {};

	particles = [];

	resize();
	loop();
}

function loop() {
	requestAnimationFrame(loop);

	//** ADD PARTICLES

	if (mouse.down) {
		for (let i = 0; i < 10; i++) {
			particles.push(new FireParticle())
		}
	}

	//** CLEAR

	context.fillStyle = 'black';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	//** UPDATE & DRAW PARTICLES

	for (let i = particles.length - 1; i >= 0; i--) {
		let particle = particles[i];

		particle.update();
		particle.render(context);

		if (particle.x + particle.r < 0 ||
			particle.y + particle.r < 0 ||
			particle.x - particle.r > canvas.width ||
			particle.y - particle.r > canvas.height ||
			particle.dead) {
			particles.splice(i, 1);
		}
	}

	//** HUD

	context.font = '28px Comic Sans MS';
	context.fillStyle = 'white';
	context.fillText(particles.length, 10, 30);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mousedown() {
	mouse.down = true;
}

function mouseup() {
	mouse.down = false;
}

window.onload = init;
window.onresize = resize;
window.onmousemove = mousemove;
window.onmousedown = mousedown;
window.onmouseup = mouseup;