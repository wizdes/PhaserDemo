module Namespace.State {
    export class Game extends Phaser.State {

        preload() {
            this.game.time.advancedTiming = true;
        }

        create() {
            var newItem;

            //game params
            var levelSpeed = -250;
            var tileSize = 70;
            var probCliff = 0.4;
            var probVertical = 0.4;
            var probMoreVertical = 0.5;

            //initiate groups, we'll recycle elements
            var floors = this.game.add.group();
            floors.enableBody = true;


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
            this.verticalObstacles.createMultiple(12, 'yellowBlock');
            this.verticalObstacles.setAll('checkWorldBounds', true);
            this.verticalObstacles.setAll('outOfBoundsKill', true);

            this.coins = this.game.add.group();
            this.coins.enableBody = true;
       
            //create player
            this.player = this.game.add.sprite(250, 320, 'player');
            // /this.player.scale.setTo(0.8);

            //enable physics on the player
            this.game.physics.arcade.enable(this.player);

            //player gravity
            this.player.body.gravity.y = 1000;

            //properties when the player is ducked and standing, so we can use in update()
            var playerDuckImg = this.game.cache.getImage('playerDuck');
            this.player.duckedDimensions = { width: playerDuckImg.width, height: playerDuckImg.height };
            this.player.standDimensions = { width: this.player.width, height: this.player.height };
            this.player.anchor.setTo(0.5, 1);
    
            //the camera will follow the player in the world
            this.game.camera.follow(this.player);

            //move player with cursor keys
            this.cursors = this.game.input.keyboard.createCursorKeys();

            //init game controller
            this.initGameController();

        }
    }
}
