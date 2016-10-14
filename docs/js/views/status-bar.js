var Game = Game || {};

Game.StatusBar = function(sound, gameConfig) {
	this.sound = sound;
	this.gameConfig = gameConfig;
	this.coinMessage;
	this.coins = 0;
};

Game.StatusBar.prototype.load = function() {
	var statusBar = new Container();
	this.coinMessage = new Text(
		this.getCoinsText(),
		{font: "32px Futura", fill: "black"}
	);
	this.coinMessage.x = this.gameConfig.VIEW_WIDTH - 200;
	this.coinMessage.y = 10;

	statusBar.addChild(this.coinMessage);

	return statusBar;
};

Game.StatusBar.prototype.getCoinsText = function () {
	return this.coins + ' BADGES';
};

Game.StatusBar.prototype.incrementCoins = function() {
	this.sound.coin();
	this.coins++;
	this.coinMessage.setText(this.getCoinsText());
};
