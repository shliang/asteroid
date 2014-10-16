(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var Asteroid = Asteroids.Asteroid = function (options) {
		Asteroids.MovingObject.call(this, options) // this should set the position
		this.color = Asteroid.COLOR;
		this.radius = Asteroid.RADIUS; 
		this.vel = Asteroids.Util.randomVec(2);
	}
	
	Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
	
	Asteroid.prototype.collideWith = function(otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
			otherObject.pos = this.game.randomPosition();
			otherObject.vel = [0,0];
		} else if (otherObject instanceof Asteroids.Bullet) {
			this.game.remove(this)
			this.game.remove(otherObject)
		}
	}
	
	Asteroid.COLOR = "#00FF00";
	Asteroid.RADIUS = 30;
	
})(this)