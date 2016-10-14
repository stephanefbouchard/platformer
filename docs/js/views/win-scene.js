var Game = Game || {};

Game.WinScene = function(gameConfig) {
	this.gameConfig = gameConfig;
};

Game.WinScene.prototype.load = function () {
	this.container = new Container();
	this.container.visible = false;

	var message = new Text(
		"YOU WON!",
		{font: "64px Futura", fill: "black"}
	);
	message.x = 120;
	message.y = 120;
	this.container.addChild(message);

	return this.container;
};

Game.WinScene.prototype.show = function() {
	this.container.visible = true;
};
