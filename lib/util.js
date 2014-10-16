(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var Util = Asteroids.Util = {}; 
	
	var inherits = Util.inherits = function (child, parent) {
		function Surrogate () {}
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
	};
	
	var randomVec = Util.randomVec = function(magnitude) {
		var randomAngle = Math.random() * 2 * Math.PI;
		var x = Math.cos(randomAngle) * magnitude;
		var y = Math.sin(randomAngle) * magnitude;
		return [x, y]
	}
	
	var dist = Util.dist = function(pos1, pos2) {
		return Math.sqrt(Math.pow((pos2[0] - pos1[0]), 2) + 
			Math.pow((pos2[1] - pos1[1]), 2))
	}
	
	var norm = Util.norm = function(pos) {
		return dist(pos, [0, 0]);
	}
	
	var normalize = Util.normalize = function(pos) {
		var mag = norm(pos);
		// gives velocity when ship looks stationary, [-2.220446049250313e-16, -2.220446049250313e-16]
		if (mag < 1e-15) {
			return 0
		}
		return [pos[0]/mag, pos[1]/mag]
	}
})(this)