var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Namespace;
(function (Namespace) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                width: 600,
                height: 420,
                renderer: Phaser.AUTO
            });
            this.state.add('game', Namespace.State.Game);
            this.state.add('mainmenu', Namespace.State.MainMenu);
            this.state.add('preloader', Namespace.State.Preloader, true);
        }
        return Game;
    })(Phaser.Game);
    Namespace.Game = Game;
})(Namespace || (Namespace = {}));
// export Game to window
var Game = Namespace.Game;
var loadGame = new Game();
//# sourceMappingURL=app.js.map