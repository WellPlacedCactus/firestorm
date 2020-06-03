
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
	constructor(x, y, r, c) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
	}

	move() {}

	draw(c) {
		c.fillStyle = this.c.toString();
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		c.fill();
	}

	update() {}

	render() {}
}

class MovingParticle extends Particle {
	constructor(x, y, r, c, velX, velY) {
		super(x, y, r, c);
		this.velX = velX;
		this.velY = velY;
	}

	move() {
		this.x += this.velX;
		this.y += this.velY;
	}
}

class FireParticle extends MovingParticle {
	constructor() {
		super(null, null, null, null, null, null);

		this.r = randi(10, 20);

		this.x = mouse.x;
		this.y = mouse.y;
		
		this.c = new Color(255, randi(0, 255), 0);

		this.velX = randi(5, 15) * rands() * 0.1;
		this.velY = randi(5, 15) * this.r * 0.05 * -1;

		this.decay = 0.001 * this.r;
		this.dead = false;
	}

	update() {
		this.c.a -= this.decay;

		if (this.c.a < 0) this.dead = true;

		this.move();
	}

	render(c) {
		this.draw(c);
	}
}

//** FUNCTIONS

function randi(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function rands() {
	return Math.random() < 0.5 ? 1 : -1;
}

function radians(deg) {
	return deg * (Math.PI / 180);
}

function collision(particle1, particle2) {
	let dx = particle1.x - particle2.x;
	let dy = particle1.y - particle2.y;
	let distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < particle1.radius + particle2.radius) {
		return true;
	} else {
		return false;
	}
}