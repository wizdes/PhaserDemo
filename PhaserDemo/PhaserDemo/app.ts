module Namespace {
    export class Game extends Phaser.Game {

        constructor() {
            super({
                width: 760,
                height: 420,
                renderer: Phaser.AUTO
            });

            this.state.add('preloader', State.Preloader, true);
            this.state.add('game', State.Game);
        }
    }
}

// export Game to window
var Game = Namespace.Game;
var loadGame = new Game();