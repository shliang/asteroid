(function(root){
	Asteroids = root.Asteroids = (root.Asteroids || {});
	var Game = Asteroids.Game = function () {
		this.asteroids = [];
		this.addAsteroids()
		this.ship = [];
		this.addShip()
		this.bullets = [];
	}
	
	Game.prototype.addAsteroids = function () {
		for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
			this.asteroids.push(new Asteroids.Asteroid({
				pos: this.randomPosition(),
				game: this
				}
			))
		}
		return this.asteroids
	}
	
	Game.prototype.addShip = function () {
		this.ship.push(
			new Asteroids.Ship({
					pos: this.randomPosition(),
					game: this
				})
	)}
	
	Game.prototype.randomPosition = function () {
		var x = Math.random() * Game.DIM_X;
		var y = Math.random() * Game.DIM_Y;
		return [x, y]
	}
	
	Game.prototype.draw = function (ctx) {
		ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
		ctx.fillStyle = Game.BG_COLOR;
		ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
		
		this.allObjects().forEach(function(object) {
			object.draw(ctx)
		})
		
		this.drawScore(ctx)
	}	
	
	Game.prototype.moveObjects = function () {
		this.allObjects().forEach(function(object) {
			object.move()
		})
	}
	
	Game.prototype.wrap = function (pos) {
		var x = pos[0];
		var y = pos[1];
		x = (x < 0 ? x+= Game.DIM_X : x % Game.DIM_X)
		y = (y < 0 ? y+= Game.DIM_Y : y % Game.DIM_Y)
		return [x, y]
	}
	
	Game.prototype.checkCollisions = function() {
		// be careful, since allObjects method creates a different copy of moving object,
		// if we store the copy in a variable, the objects that should be removed from
		// the array still appears since the objects in the allObjects are a separate copy
		// of objects in this.asteroids/this.bullets
		for (var i = 0; i < this.allObjects().length - 1; i++) {
			for (var j = i + 1; j < this.allObjects().length; j++) {
				if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
					this.allObjects()[j].collideWith(this.allObjects()[i])
				}
			}
		}
	}
	
	Game.prototype.step = function () {
		this.moveObjects()
		this.checkCollisions()
	}
	
	Game.prototype.remove = function(object) {
		if (object instanceof Asteroids.Asteroid) {
			this.asteroids[this.asteroids.indexOf(object)].pos = this.randomPosition()
			Game.SCORE += 1;
		} else if (object instanceof Asteroids.Bullet) {
			this.bullets.splice(this.bullets.indexOf(object), 1)
		}
	}

	Game.prototype.bindKeyHandlers = function () {
		var ship = this.ship[0];
		key('a', function(){ ship.power([-2, 0]) });
		key('s', function(){ ship.power([0, 2]) });
		key('d', function(){ ship.power([2, 0]) });
		key('w', function(){ ship.power([0, -2]) });
		key('space', function(){ ship.fireBullet()})
	}
	
	Game.prototype.allObjects = function() {
		return [].concat(this.ship).concat(this.asteroids).concat(this.bullets)
	}
	
	Game.prototype.outOfBound = function (pos) {
		return (pos[0] > Game.DIM_X || pos[0] < 0 || 
		pos[1] > Game.DIM_Y || pos[1] < 0)
	}
	
	Game.prototype.drawScore = function (ctx) {
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Asteroids destroyed: " + Game.SCORE, 32, 32)
	}
	
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 0;
	Game.BG_COLOR = "#666633";
	Game.SCORE = 0;
	
})(this)