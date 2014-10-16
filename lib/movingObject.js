(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var MovingObject = Asteroids.MovingObject = function(options) {
		this.game = options.game;
		this.pos = options.pos;
		this.wrappable = true;
	};
	
	MovingObject.prototype.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2* Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#003300";
		ctx.stroke();
	};
	
	MovingObject.prototype.move = function () {
		var posX = this.pos[0];
		var posY = this.pos[1];
		var velX = this.vel[0];
		var velY = this.vel[1];
		var newX = posX + velX;
		var newY = posY + velY;
		var x = posX + velX;
		var y = posY + velY;
		if (this.wrappable == true) {
			this.pos = this.game.wrap([x,y])
		}	else if (this.game.outOfBound(this.pos) ) {
			this.game.remove(this)	
		} else {
			this.pos = [x, y]
		}
	}
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
		var xDiff = this.pos[0] - otherObject.pos[0]
		var yDiff = this.pos[1] - otherObject.pos[1]
		var distance = Math.sqrt( xDiff * xDiff + yDiff * yDiff)
		return distance < (this.radius + otherObject.radius)
	}
	
	MovingObject.prototype.collideWith = function(otherObject) {
 	}
	
})(this)