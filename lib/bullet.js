(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {})
	var Bullet = Asteroids.Bullet = function (options) {
		Asteroids.MovingObject.call(this, options)
		this.vel = options.vel;
		this.color = Bullet.COLOR;
		this.radius = Bullet.RADIUS;
		this.wrappable = false;
	}
	
	Bullet.COLOR = "#9966FF";
	Bullet.RADIUS = 5;
	Bullet.VEL = 15;
	
	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject)
	
	Bullet.prototype.collideWith = function(otherObject) {
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.remove(this)
			this.game.remove(otherObject)
		}
	}
	
})(this)