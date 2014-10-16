(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var GameView = Asteroids.GameView = function (game, ctx) {
		this.game = game;
		this.ctx = ctx;
	}
	
	GameView.prototype.start = function() {
		var gameView = this;
		setInterval(function() {
			gameView.game.step();
			gameView.game.draw(gameView.ctx);
		}, 1000/32)
		this.game.bindKeyHandlers()
	}
})(this)