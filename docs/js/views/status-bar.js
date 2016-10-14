var Game = Game || {};

Game.StatusBar = function(sound, gameState, gameConfig) {
	this.sound = sound;
	this.gameState = gameState;
	this.gameConfig = gameConfig;
	this.coinMessage;
};

Game.StatusBar.prototype.load = function() {
	var statusBar = new Container();
	this.coinMessage = new Text(
		this.getCoinsText(),
		{font: "32px Futura", fill: "black"}
	);
	this.coinMessage.x = this.gameConfig.VIEW_WIDTH - 200;
	this.coinMessage.zIndex = 1000;
	this.coinMessage.y = 10;

	statusBar.addChild(this.coinMessage);

	return statusBar;
};

Game.StatusBar.prototype.getCoinsText = function () {
	return this.gameState.badges + ' BADGES';
};

Game.StatusBar.prototype.incrementCoins = function() {
	this.sound.coin();
	this.gameState.badges++;
	this.refresh();
};

Game.StatusBar.prototype.refresh = function() {
	this.coinMessage.setText(this.getCoinsText());
};


