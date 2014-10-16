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
	}
	
	Ship.prototype.draw = function (ctx) {
		//consider when ship has 0 velocity
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2* Math.PI, false);
		ctx.strokeStyle = "#003300";
		ctx.stroke();
		
		if (this.vel[0] == 0 && this.vel[1] == 0) {
			var vertex = [this.pos[0] , this.pos[1] - 22 ];
		} else if (this.vel[0] == 0) {
			var vertex = this.vel[1] < 0? [this.pos[0] , this.pos[1] - 22 ] :
			[this.pos[0] , this.pos[1] + 22 ];
		} else if (this.vel[1] == 0) {
			var vertex = this.vel[0] > 0? [this.pos[0] + 22, this.pos[1] ] :
			[this.pos[0] - 22, this.pos[1] ];
		} else {
			var normalizedNorm = Asteroids.Util.normalize(this.vel),
					theta = Math.abs(normalizedNorm[1] / normalizedNorm[0]);
					console.log(normalizedNorm);
					console.log(theta);
					console.log(this.vel);
			if (normalizedNorm[0] > 0 && normalizedNorm[1] > 0) {
				var vertex = [this.pos[0] + 25 * Math.cos(theta),
					this.pos[1] + 25 * Math.sin(theta)]
			} else if (normalizedNorm[0] > 0 && normalizedNorm[1] < 0) {
				var vertex = [this.pos[0] + 25 * Math.cos(theta),
							this.pos[1] - 25 * Math.sin(theta)]
			} else if (normalizedNorm[0] < 0 && normalizedNorm[1] > 0) {
				var vertex = [this.pos[0] - 25 * Math.cos(theta),
							this.pos[1] + 25 * Math.sin(theta)]
			} else {
				var vertex = [this.pos[0] - 25 * Math.cos(theta),
							this.pos[1] - 25 * Math.sin(theta)]
			}
		}
		
	// 	{
// 			var normalizedNorm = Asteroids.Util.normalize(this.vel),
// 					theta = normalizedNorm[1] / normalizedNorm[0]
// 					vertexX = this.vel[0] > 0 ? this.pos[0] + 25 * Math.cos(theta) :
// 						this.pos[0] - 25 * Math.cos(theta),
// 					// vertexX = this.pos[0] + 25 * Math.cos(theta),
// 					// vertexY = this.vel[1] - 0 ? this.pos[1] + 25 * Math.sin(theta) :
// // 						this.pos[1] - 25 * Math.sin(theta),
// 					vertexY = this.pos[1] + 25 * Math.sin(theta),
// 					vertex = [vertexX, vertexY];
// 					console.log(this.vel);
// 					console.log(normalizedNorm);
// 					console.log(theta);
// 	}
	
		ctx.beginPath();
    ctx.moveTo(vertex[0], vertex[1]);
    ctx.lineTo(vertex[0] - 20, vertex[1] + 40);
    ctx.lineTo(vertex[0] + 20, vertex[1] + 40);
		ctx.fillStyle = "blue";
    ctx.fill();
	}
	
})(this)