(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var Ship = Asteroids.Ship = function (options) {
		Asteroids.MovingObject.call(this, options)
		this.color = Ship.COLOR;
		this.radius = Ship.RADIUS;
		this.vel = [0, 0];
	}
	
	Asteroids.Util.inherits(Ship, Asteroids.MovingObject)
	Ship.COLOR = "#6699FF";
	Ship.RADIUS = 25;
	Ship.SHAPE = [[0, 0], [-20, 40], [40, 40]];
	
	Ship.prototype.power = function(impulse) {
		if (Math.abs(this.vel[0] + impulse[0]) < 7) {
			this.vel[0] += impulse[0]
		} 
		
		if (Math.abs(this.vel[1] + impulse[1]) < 7) {
			this.vel[1] += impulse[1]
		}
	}
	
	Ship.prototype.fireBullet = function (game) {
		var normoalizedVel = Asteroids.Util.normalize(this.vel)
		
		if (normoalizedVel) {
			var relVel = [normoalizedVel[0] * Asteroids.Bullet.VEL, 
				normoalizedVel[1] * Asteroids.Bullet.VEL]
		
			var bullet = new Asteroids.Bullet({
				vel: [this.vel[0] + relVel[0], this.vel[1] + relVel[1]],
				pos: this.pos,
				game: this.game
			})
			this.game.bullets.push(bullet)	
		}
	};	
})(this)