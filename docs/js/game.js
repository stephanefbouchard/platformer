var Game = Game || {};

Game.Game = function(levels, config) {
	this.levels = levels;
	this.config = config;
	this.stage = new Container();
	this.renderer = autoDetectRenderer(this.config.VIEW_WIDTH, this.config.VIEW_HEIGHT);

	this.gameState = {
		gravity: true,
		controls: {
			rightOn: false,
			leftOn: false
		},
		currentLevel: 0,
		done: false
	};

	this.player;
	this.level;
	this.gameScene;
	this.gameOverScene;
	this.winScene;
	this.controls;
	this.stage;
	this.statusBar;
};

Game.Game.prototype.setup = function() {
	document.body.appendChild(this.renderer.view);

	this.loadBackground();

	//Loading Sound
	this.sound = new Game.Sound();
	this.sound.themeSong();

	//Loading Status bar
	this.statusBar = new Game.StatusBar(this.sound, this.config);
	this.stage.addChild(this.statusBar.load());

	//End Scene
	this.gameOverScene = new Game.GameOverScene(this.config);
	this.stage.addChild(this.gameOverScene.load());

	//Win Scene
	this.winScene = new Game.WinScene(this.config);
	this.stage.addChild(this.winScene.load());

	//Loading Player
	this.player = new Game.Player(this.gameState, this.config);

	this.loadCurrentLevel();

	//Controls
	this.controls = new Game.KeyControls(this.sound, this.gameState, this.player);
	this.controls.init();

	//Set the game state
	this.state = this.play.bind(this);

	//Start the game loop
	this.gameLoop();
};

Game.Game.prototype.loadCurrentLevel = function() {
	//GameScene
	if (this.gameScene) {
		this.gameScene.destroy();
	}
	this.gameScene = new Container();
	this.stage.addChild(this.gameScene);

	//Loading terrain
	this.level = new Game.Level(this.getCurrentLevel().map, this.player, this.statusBar, this.gameScene, this.gameState, this.config);
	this.level.loadTerrain(this.gameScene);

	this.gameScene.addChild(this.player.load());
};

Game.Game.prototype.gameLoop = function(){
	if (!this.gameState.done) {
		//Loop this function 60 times per second
		requestAnimationFrame(this.gameLoop.bind(this));

		//Update the current game state
		this.state();

		//Render the stage
		this.renderer.render(this.stage);
	}
};


Game.Game.prototype.play = function() {
	this.player.move(this.gameScene, this.level);

	if (this.level.checkForFinish()) {
		this.nextLevel();
	}
	if (this.level.checkForEndGame()) {
		this.done();
		this.end();
	}
};

Game.Game.prototype.nextLevel = function() {
	this.gameState.currentLevel++;
	if (this.gameState.currentLevel === this.levels.length) {
		this.done();
		this.win();
	} else {
		this.sound.nextLevel();
		this.loadCurrentLevel();
	}
};

Game.Game.prototype.end = function() {
	this.sound.gameOver();
	this.gameScene.visible = false;
	this.gameOverScene.show();
};

Game.Game.prototype.win = function() {
	this.sound.won();
	this.gameScene.visible = false;
	this.winScene.show();
};

Game.Game.prototype.getCurrentLevel = function() {
	return this.levels[this.gameState.currentLevel];
};

Game.Game.prototype.loadBackground = function() {
	var texture = PIXI.Texture.fromImage('images/bg.png');

	var bg = new PIXI.extras.TilingSprite(texture, this.config.VIEW_WIDTH, this.config.VIEW_HEIGHT);
	this.stage.addChild(bg);
};

Game.Game.prototype.done = function() {
	this.gameState.done = true;
};
