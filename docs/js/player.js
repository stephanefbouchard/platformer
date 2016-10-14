var Game = Game || {};

var PLAYER_DEFAULT_CONFIG = {
	PLAYER_WIDTH: 72,
	PLAYER_HEIGHT: 97,
	PLAYER_FRAME: 10,
	PLAYER_START_X: 400,
	PLAYER_START_Y: 0,
	PLAYER_END_X: 1100,
	PLAYER_FRAMERATE: 0.10,
	PLAYER_JUMP: 30,
	PLAYER_MAX_GRAVITY: 15,
	PLAYER_WALK_SPEED: 5,
	PLAYER_RUN_SPEED: 15
};

Game.Player = function(gameState, gameConfig) {
	this.gameState = gameState;
	this.gameConfig = gameConfig;
	this.config = PLAYER_DEFAULT_CONFIG;

	this.texture = resources["images/player1.json"].textures;

	this.sprite;
	this.frametime = this.config.PLAYER_FRAMERATE;
	this.frameindex = 0;
	this.lasttime = new Date().getTime();
};

Game.Player.prototype.load = function() {
	this.sprite = new Sprite(this.texture[0]);
	frametime = this.config.PLAYER_FRAMERATE;

	this.sprite.anchor.x = 0.5;
	this.sprite.x = this.config.PLAYER_START_X;
	this.sprite.y = this.config.PLAYER_START_Y;
	this.sprite.vx = 0;
	this.sprite.vy = 0;

	return this.sprite;
};

Game.Player.prototype.jump = function() {
	this.sprite.vy = -this.config.PLAYER_JUMP;
};

Game.Player.prototype.changeDirection = function(direction) {
	this.sprite.scale.x = direction;
};

Game.Player.prototype.move = function(scene, level) {
	if (this.sprite.vx > 0 && scene.x + this.gameConfig.VIEW_WIDTH < scene.width && (this.sprite.x + scene.x) >= this.config.PLAYER_START_X) {
		scene.x -= this.sprite.vx;
	} else if (this.sprite.vx < 0 && scene.x < 0) {
		scene.x -= this.sprite.vx;
	}

	//use the explorer's velocity to make it move
	this.sprite.y += this.sprite.vy;
	level.checkForTerrainCollision();
	this.sprite.x += this.sprite.vx;

	this.applyGravity();

	this.animate(this.gameState.controls.leftOn, this.gameState.controls.rightOn);
};

Game.Player.prototype.applyGravity = function() {
	if (this.gameState.gravity) {
		//Gravity
		if (this.sprite.vy < this.config.PLAYER_MAX_GRAVITY) {
			this.sprite.vy += 2;
		}
	} else {
		if (this.sprite.vy > 0) {
			this.sprite.vy = 0;
		}
	}
}

/********************
 * PLAYER ANIMATION
 ********************/
Game.Player.prototype.animate = function(leftOn, rightOn) {
	if (rightOn && this.sprite.vx < this.config.PLAYER_WALK_SPEED) {
		this.sprite.vx = this.config.PLAYER_WALK_SPEED;
	} else if (leftOn && this.sprite.vx > -this.config.PLAYER_WALK_SPEED) {
		this.sprite.vx = -this.config.PLAYER_WALK_SPEED;
	}

	if (rightOn || leftOn) {
		// Determine seconds elapsed since last frame
		var currtime = new Date().getTime();
		var delta = (currtime-this.lasttime)/1000;

		this.frametime -= delta;
		if (this.frametime <= 0) {
			this.frameindex++;
			if (this.frameindex > this.config.PLAYER_FRAME) {
				this.frameindex = 0;
			}
			this.sprite.texture = this.texture[this.frameindex];
			if (this.sprite.vx < this.config.PLAYER_RUN_SPEED && this.sprite.vx > -this.config.PLAYER_RUN_SPEED) {
				this.sprite.vx *= 1.10;
			}
			this.frametime = this.config.PLAYER_FRAMERATE;
		}
		this.lasttime = currtime;
	} else {
		this.sprite.vx = 0;
	}
};
