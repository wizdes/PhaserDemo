module Namespace.State {
    export class Preloader extends Phaser.State {
        loadingBar: Entity.PreloadBar;

        preload() {
            this.loadingBar = new Entity.PreloadBar(this.game);
            this.load.image('phaser-logo', 'phaser-logo-small.png');
            this.load.image('player', 'assets/images/player.png');
            this.load.image('playerDuck', 'assets/images/player_duck.png');
            this.load.image('playerDead', 'assets/images/player_dead.png');
            this.load.image('goldCoin', 'assets/images/goldCoin.png');
            this.load.image('floor', 'assets/images/floor.png');
            this.load.image('yellowBlock', 'assets/images/yellow-block.png');
            this.load.image('play', 'assets/images/playbutton.png');
            this.load.spritesheet('playerRun', 'assets/images/alienWalking.png', 70, 96);
            this.load.image('black', 'assets/images/black.png');
            this.load.image('player2', 'assets/images/player.png');
            this.load.image('charSelectImg', 'assets/images/makefg.png');
            this.load.image('transp', 'assets/images/transp.png');
            this.load.spritesheet('running', 'assets/images/running_s.png', 70, 95);
            this.load.spritesheet('jump', 'assets/images/jumping_s.png', 76, 96);
            this.load.image('slide', 'assets/images/slide_s.png');
        }

        create() {
            this.loadingBar.setFillPercent(100);
            var tween = this.game.add.tween(this.loadingBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

            // loading screen will have a white background
            this.game.stage.backgroundColor = '#fff';

            // scaling options
            // this makes it scale to the screen
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
            //have the game centered horizontally
            //this.scale.pageAlignHorizontally = true;
            //this.scale.pageAlignVertically = true;

            //physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('mainmenu', true);
        }

        loadUpdate() {
            this.loadingBar.setFillPercent(this.load.progress);
        }
    }
}
