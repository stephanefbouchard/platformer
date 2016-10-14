var Game = Game || {};

Game.Level = function(map, player, statusBar, gameScene, gameState, gameConfig) {
	this.map = map;
	this.player = player;
	this.statusBar = statusBar;
	this.gameScene = gameScene;
	this.gameState = gameState;
	this.gameConfig = gameConfig;
	this.finish = false;

	this.tiles = [];
};

Game.Level.prototype.loadTerrain = function(gameScene) {
	var id = resources["images/platformer.json"].textures;

	var tile;
	for (var y=0; y < this.map.length; y++) {
		this.tiles[y] = [];
		for (var x=0; x < this.map[y].length; x++) {
			if (this.map[y][x] !== 0) {
				tile = new Sprite(id[this.map[y][x] + ".png"]);
				tile.x = x * this.gameConfig.TILE_WIDTH;
				tile.y = y * this.gameConfig.TILE_HEIGHT;
				this.gameScene.addChild(tile);
				this.tiles[y][x] = tile;
			}
		}
	}
	return this;
};

/********************
 * GRAVITY and COLLISION
 ********************/
var BADGE_TILE_MIN = 200;
var BADGE_TILE_MAX = 205;

var DOOR_TILE = 10;
var DOOR_TILE_TOP = 11;


Game.Level.prototype.checkForTerrainCollision = function() {
	this.gameState.gravity = true;

	var top = this.player.sprite.y;
	var bottom = this.player.sprite.y + this.player.config.PLAYER_HEIGHT;
	var middle = this.player.sprite.y + this.player.config.PLAYER_HEIGHT/2;
	var left = this.player.sprite.x - this.player.config.PLAYER_WIDTH/3;
	var right = this.player.sprite.x + this.player.config.PLAYER_WIDTH/3;

	//BOTTOM check
	if (this.checkTileCollision(left, bottom) || this.checkTileCollision(right, bottom)) {
		this.gameState.gravity = false;
		//TOP CHECK
	} else if (this.checkTileCollision(left, top) || this.checkTileCollision(right, top)) {
		this.player.sprite.vy = this.player.sprite.vy < 0 ? 0 : this.player.sprite.vy;
	}

	//RIGHT CHECK
	if (this.checkTileCollision(right, middle)) {
		if (this.player.sprite.vx > 0) {
			this.player.sprite.vx = 0;
		}
		//LEFT CHECK
	} else if (this.checkTileCollision(left, middle)) {
		if (this.player.sprite.vx < 0) {
			this.player.sprite.vx = 0;
		}
	}
};

Game.Level.prototype.checkTileCollision = function(x, y) {
	var tile = this.getTileAtPosition(x, y);

	if (tile.y >= 0 && tile.y < this.map.length) {
		var object = this.map[tile.y][tile.x];
		if (object > 0) {
			//BADGE CASE
			if (object >= BADGE_TILE_MIN && object <= BADGE_TILE_MAX) {
				this.map[tile.y][tile.x] = 0;
				this.gameScene.removeChild(this.tiles[tile.y][tile.x]);
				this.statusBar.incrementCoins();
			} else if (object === DOOR_TILE || object === DOOR_TILE_TOP) {
				this.finish = true;
				return true;
			} else {
				return true;
			}
		}
	}
	return false;
};

Game.Level.prototype.getTileAtPosition = function(x, y) {
	return {
		x: parseInt(x/this.gameConfig.TILE_WIDTH),
		y: parseInt(y/this.gameConfig.TILE_HEIGHT)
	};
};

Game.Level.prototype.checkForEndGame = function() {
	var xy = this.getCurrentTile();

	if (xy.y >= this.map.length) {
		return true;
	}
	return false;
};

Game.Level.prototype.checkForFinish = function() {
	return this.finish;
};

Game.Level.prototype.getCurrentTile = function() {
	return {
		x: parseInt(this.player.sprite.x / this.gameConfig.TILE_WIDTH) + 1,
		y: parseInt(this.player.sprite.y / this.gameConfig.TILE_HEIGHT) + 1
	};
};
