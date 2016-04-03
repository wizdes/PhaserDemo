var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Namespace;
(function (Namespace) {
    var State;
    (function (State) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                _super.apply(this, arguments);
                this.levelSpeed = -250;
                this.tileSize = 70;
                this.probCliff = 0.3;
                this.probVertical = 0.4;
                this.probMoreVertical = 0.5;
                this.probCoin = 0.1;
            }
            Game.prototype.preload = function () {
                this.game.time.advancedTiming = true;
            };
            Game.prototype.create = function () {
                var newItem;
                //initiate groups, we'll recycle elements
                this.floors = this.game.add.group();
                this.floors.enableBody = true;
                //loading screen will have a white background
                this.game.stage.backgroundColor = '#fff';
                for (var i = 0; i < 12; i++) {
                    newItem = this.floors.create(i * this.tileSize, this.game.world.height - this.tileSize, 'floor');
                    newItem.body.immovable = true;
                    newItem.body.velocity.x = this.levelSpeed;
                }
                //keep track of the last floor
                this.lastFloor = newItem;
                //keep track of the last element
                this.lastCliff = false;
                this.lastVertical = false;
                this.verticalObstacles = this.game.add.group();
                this.verticalObstacles.enableBody = true;
                this.verticalObstacles.createMultiple(20, 'yellowBlock');
                this.verticalObstacles.setAll('immovable', true);
                this.verticalObstacles.setAll('outOfBoundsKill', true);
                this.coins = this.game.add.group();
                this.coins.enableBody = true;
                this.coins.createMultiple(20, 'goldCoin');
                this.coins.setAll('immovable', true);
                //create player
                this.player = this.game.add.sprite(250, 320, 'playerRun');
                var walk = this.player.animations.add('walk');
                this.player.play('walk', 10, true);
                //enable physics on the player
                this.game.physics.arcade.enable(this.player);
                //player gravity
                this.player.body.gravity.y = 1500;
                //properties when the player is ducked and standing, so we can use in update()
                var playerDuckImg = this.game.cache.getImage('playerDuck');
                this.player['duckedDimensions'] = { width: playerDuckImg.width, height: playerDuckImg.height };
                this.player['standDimensions'] = { width: this.player.width, height: this.player.height };
                this.player.anchor.setTo(0.5, 1);
                //the camera will follow the player in the world
                this.game.camera.follow(this.player);
                //move player with cursor keys
                this.cursors = this.game.input.keyboard.createCursorKeys();
            };
            Game.prototype.update = function () {
                //collision
                this.game.physics.arcade.collide(this.player, this.floors, this.playerHit, null, this);
                this.game.physics.arcade.collide(this.player, this.verticalObstacles, this.playerHit, null, this);
                this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);
                //only respond to keys and keep the speed if the player is alive
                if (this.player.alive) {
                    if (this.player.body.touching.down) {
                        this.player.body.velocity.x = -this.levelSpeed;
                    }
                    else {
                        this.player.body.velocity.x = 0;
                    }
                    if (this.cursors.up.isDown) {
                        this.playerJump();
                    }
                    else if (this.cursors.down.isDown) {
                        this.playerDuck();
                    }
                    if (!this.cursors.down.isDown && this.player.isDucked && !this.pressingDown) {
                        //change image and update the body size for the physics engine
                        //this.player.loadTexture('player');
                        this.player.loadTexture('playerRun');
                        this.player.play('walk', 10, true);
                        this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
                        this.player.isDucked = false;
                    }
                    //restart the game if reaching the edge
                    if (this.player.x <= -this.tileSize) {
                        this.game.state.start('Game');
                    }
                    if (this.player.y >= this.game.world.height + this.tileSize) {
                        this.game.state.start('Game');
                    }
                }
                //generate further terrain
                this.generateTerrain();
            };
            Game.prototype.generateTerrain = function () {
                var i, delta = 0, block;
                for (i = 0; i < this.floors.length; i++) {
                    if (this.floors.getAt(i).body.x <= -this.tileSize) {
                        if (Math.random() < this.probCliff && !this.lastCliff && !this.lastVertical) {
                            delta = 1;
                            this.lastCliff = true;
                            this.lastVertical = false;
                        }
                        else if (Math.random() < this.probVertical && !this.lastCliff) {
                            this.lastCliff = false;
                            this.lastVertical = true;
                            block = this.verticalObstacles.getFirstExists(false);
                            if (!block) {
                                block = this.verticalObstacles.getFirstExists(true);
                                if (block.x > this.lastFloor.body.x - this.game.world.width * 2) {
                                    block = null;
                                }
                            }
                            if (block) {
                                block.reset(this.lastFloor.body.x + this.tileSize, this.game.world.height - 3 * this.tileSize);
                                block.body.velocity.x = this.levelSpeed;
                                block.body.immovable = true;
                            }
                            if (Math.random() < this.probMoreVertical) {
                                block = this.verticalObstacles.getFirstExists(false);
                                if (!block) {
                                    block = this.verticalObstacles.getFirstExists(true);
                                    if (block.x > this.lastFloor.body.x - this.game.world.width * 2) {
                                        block = null;
                                    }
                                }
                                if (block) {
                                    block.reset(this.lastFloor.body.x + this.tileSize, this.game.world.height - 4 * this.tileSize);
                                    block.body.velocity.x = this.levelSpeed;
                                    block.body.immovable = true;
                                }
                            }
                            if (Math.random() < this.probCoin) {
                                var coin = this.coins.getFirstExists(false);
                                if (!coin) {
                                    coin = this.coins.getFirstExists(true);
                                    if (coin.x > this.lastFloor.body.x - this.game.world.width * 2) {
                                        coin = null;
                                    }
                                }
                                if (coin) {
                                    coin.reset(this.lastFloor.body.x + this.tileSize, this.game.world.height - 5 * this.tileSize);
                                    coin.body.velocity.x = this.levelSpeed;
                                    coin.body.immovable = true;
                                }
                            }
                        }
                        else {
                            this.lastCliff = false;
                            this.lastVertical = false;
                        }
                        this.floors.getAt(i).body.x = this.lastFloor.body.x + this.tileSize + delta * this.tileSize * 1.5;
                        this.lastFloor = this.floors.getAt(i);
                        break;
                    }
                }
            };
            Game.prototype.playerHit = function (player, blockedLayer) {
                //if hits on the right side, die
                if (player.body.touching.right) {
                    //set to dead (this doesn't affect rendering)
                    this.player.alive = false;
                    //stop moving to the right
                    this.player.body.velocity.x = 0;
                    //change sprite image
                    this.player.loadTexture('playerDead');
                    //go to gameover after a few miliseconds
                    this.game.time.events.add(1500, this.gameOver, this);
                }
            };
            Game.prototype.collect = function (player, collectable) {
                //remove sprite
                collectable.destroy();
            };
            Game.prototype.gameOver = function () {
                this.game.state.start('mainmenu', true);
            };
            Game.prototype.playerJump = function () {
                if (this.player.body.touching.down) {
                    this.player.body.velocity.y -= 700;
                }
            };
            Game.prototype.playerDuck = function () {
                //change image and update the body size for the physics engine
                this.player.loadTexture('playerDuck');
                this.player.body.setSize(this.player.duckedDimensions.width, this.player.duckedDimensions.height);
                //we use this to keep track whether it's ducked or not
                this.player.isDucked = true;
            };
            Game.prototype.render = function () {
            };
            return Game;
        })(Phaser.State);
        State.Game = Game;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=game.js.map