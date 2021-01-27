
//** CLASSES

class Color {
	constructor(r, g, b, a = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toString() {
		return `rgba(
			${this.r},
			${this.g},
			${this.b},
			${this.a})`;
	}
}

class Particle {
	constructor(x, y, r, c, vx, vy, d) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
		this.vx = vx;
		this.vy = vy;
		this.d = d;
		this.dead = false;
	}

	move() {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += 0.1;
	}

	decay() {
		this.c.a -= this.d;
	}

	die(vp) {
		if (this.x + this.r < 0 ||
			this.y + this.r < 0 ||
			this.x - this.r > vp.width ||
			this.y - this.r > vp.height ||
			this.c.a < 0) this.dead = true;
	}

	tick(vp) {
		this.move();
		this.decay();
		this.die(vp);
	}

	draw(c) {
		c.fillStyle = this.c.toString();
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		c.fill();
	}
}

//** FUNCTIONS

function randi(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randf(min, max) {
	return Math.random() * (max - min) + min;
}

function rands() {
	return Math.random() < 0.5 ? 1 : -1;
}

function radians(deg) {
	return deg * (Math.PI / 180);
}