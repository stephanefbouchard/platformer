var Game = Game || {};

Game.KeyControls = function(sound, game, gameState, player) {
	this.sound = sound;
	this.game = game;
	this.player = player;
	this.gameState = gameState;
	this.gameState.controls.rightOn = false;
	this.gameState.controls.leftOn = false;
};

Game.KeyControls.prototype.init = function() {
	var left = this.keyboard(37),
		up = this.keyboard(32),
		right = this.keyboard(39),
		restart = this.keyboard(82);

	left.press = function() {
		this.gameState.controls.leftOn = true;
		this.gameState.controls.rightOn = false;
		this.player.changeDirection(-1);
	}.bind(this);
	left.release = function() {
		this.gameState.controls.leftOn = false;
	}.bind(this);

	up.press = function() {
		if (!this.gameState.gravity) {
			this.sound.jump();
			this.player.jump();
		}
	}.bind(this);
	up.release = function() {
	}.bind(this);

	right.press = function() {
		this.gameState.controls.rightOn = true;
		this.gameState.controls.leftOn = false;
		this.player.changeDirection(1);
	}.bind(this);
	right.release = function() {
		this.gameState.controls.rightOn = false;
	}.bind(this);

	restart.press = function() {
		this.game.restart();
	}.bind(this);
};

Game.KeyControls.prototype.keyboard = function (keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	);
	window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	);
	return key;
};
