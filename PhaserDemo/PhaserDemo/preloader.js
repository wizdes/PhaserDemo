var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Namespace;
(function (Namespace) {
    var State;
    (function (State) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
                this.loadingBar = new Namespace.Entity.PreloadBar(this.game);
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
                this.load.image('jumpu', 'assets/images/jumping_su.png');
                this.load.image('jumpd', 'assets/images/jumping_sd.png');
                this.load.image('dead', 'assets/images/dead.png');
            };
            Preloader.prototype.create = function () {
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
            };
            Preloader.prototype.startGame = function () {
                this.game.state.start('mainmenu', true);
            };
            Preloader.prototype.loadUpdate = function () {
                this.loadingBar.setFillPercent(this.load.progress);
            };
            return Preloader;
        })(Phaser.State);
        State.Preloader = Preloader;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=preloader.js.map