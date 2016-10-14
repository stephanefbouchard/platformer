var Game = Game || {};

Game.GameOverScene = function(gameConfig) {
	this.gameConfig = gameConfig;
};

Game.GameOverScene.prototype.load = function () {
	this.container = new Container();
	this.container.visible = false;

	var message = new Text(
		"GAME OVER!",
		{font: "64px Futura", fill: "black"}
	);
	message.x = 120;
	message.y = 120;
	this.container.addChild(message);

	var message = new Text(
		"'R' to restart",
		{font: "32px Futura", fill: "black"}
	);
	message.x = 1000;
	message.y = 500;
	this.container.addChild(message);

	return this.container;
};

Game.GameOverScene.prototype.show = function() {
	this.container.visible = true;
};

Game.GameOverScene.prototype.hide = function() {
	this.container.visible = false;
};
