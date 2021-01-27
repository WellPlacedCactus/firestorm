
//** ENV

let canvas;
let context;
let mouse;
let keys;
let particles;

function init() {
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	mouse = {};
	keys = [];
	particles = [];

	document.body.append(canvas);
	resize();
	loop();
}

function loop() {
	requestAnimationFrame(loop);

	//** ADD PARTICLES

	if (mouse.down) {
		for (let i = 0; i < 10; i++) {
			particles.push(new Particle(
				mouse.x,
				mouse.y,
				randi(5, 25),
				new Color(255, randi(0, 255), 0),
				randf(-3, 3),
				-randf(10, 15),
				randf(0.01, 0.05)
			));
		}
	}

	//** CLEAR

	context.fillStyle = 'black';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	//** UPDATE & DRAW PARTICLES

	for (let i = particles.length - 1; i >= 0; i--) {
		let particle = particles[i];

		particle.tick(canvas);
		particle.draw(context);

		if (particle.dead) particles.splice(i, 1);
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

function keydown(e) {
	keys[e.keyCode] = true;
}

function keyup(e) {
	keys[e.keyCode] = false;
}

window.onload = init;
window.onresize = resize;
window.onmousemove = mousemove;
window.onmousedown = mousedown;
window.onmouseup = mouseup;