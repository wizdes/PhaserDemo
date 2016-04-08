var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Namespace;
(function (Namespace) {
    var State;
    (function (State) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.apply(this, arguments);
            }
            MainMenu.prototype.preload = function () {
            };
            MainMenu.prototype.create = function () {
                //loading screen will have a white background
                this.game.stage.backgroundColor = '#333';
                var playButton = this.game.add.button(this.game.width / 2, this.game.height / 2, "play", this.playGame);
                playButton.anchor.set(0.5);
                var charButton = this.game.add.button(0, this.game.height / 2, "charSelectImg", this.charSel);
                charButton.anchor.set(0.5);
                if (localStorage.getItem('highscore') != null) {
                    var score_label = this.game.add.text(0, 0, localStorage.getItem('highscore'), { font: '24px Arial', fill: '#000' });
                }
                else {
                    var score_label = this.game.add.text(0, 0, 0 + "", { font: '24px Arial', fill: '#000' });
                }
            };
            MainMenu.prototype.playGame = function () {
                this.game.state.start('game', true);
            };
            MainMenu.prototype.charSel = function () {
                this.game.state.start('charSelect', true);
            };
            return MainMenu;
        })(Phaser.State);
        State.MainMenu = MainMenu;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=mainmenu.js.map