var Game = Game || {};

var SOUND_LIB = createjs.Sound;

Game.Sound = function() {
	this.JUMP_ID = "jump";
	this.COIN_ID = "coin";
	this.NEXT_LEVEL_ID = "next-level";
	this.GAME_OVER_ID = "game-over";
	this.WON_ID = "won";
	this.THEME_ID = "theme";

	this.SONG_VOLUME = 0.3;

	SOUND_LIB.on("fileload", function(event) {
		if (event.id === this.THEME_ID) {
			this.themeSong();
		}
	}.bind(this));
	SOUND_LIB.registerSound("sound/theme.mp3", this.THEME_ID);
	SOUND_LIB.registerSound("sound/jump.m4a", this.JUMP_ID);
	SOUND_LIB.registerSound("sound/doit.m4a", this.COIN_ID);
	SOUND_LIB.registerSound("sound/nextlevel.m4a", this.NEXT_LEVEL_ID);
	SOUND_LIB.registerSound("sound/gameover.m4a", this.GAME_OVER_ID);
	SOUND_LIB.registerSound("sound/won.m4a", this.WON_ID);
};

Game.Sound.prototype.themeSong = function() {
	var instance = createjs.Sound.play(this.THEME_ID);
	instance.on("complete", this.themeSong, this);
	instance.volume = this.SONG_VOLUME;
};

Game.Sound.prototype.jump = function() {
	var instance = SOUND_LIB.play(this.JUMP_ID);
	instance.volume = 0.2;
};

Game.Sound.prototype.coin = function() {
	SOUND_LIB.play(this.COIN_ID);
};

Game.Sound.prototype.nextLevel = function() {
	SOUND_LIB.play(this.NEXT_LEVEL_ID);
};

Game.Sound.prototype.gameOver = function() {
	SOUND_LIB.play(this.GAME_OVER_ID);
};

Game.Sound.prototype.won = function() {
	SOUND_LIB.play(this.WON_ID);
};

