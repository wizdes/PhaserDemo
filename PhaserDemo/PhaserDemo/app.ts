module Namespace {
    export class Game extends Phaser.Game {

        constructor() {
            super({
                width: 600,
                height: 420,
                renderer: Phaser.AUTO
            });

            this.state.add('game', State.Game);
            this.state.add('mainmenu', State.MainMenu);
            this.state.add('preloader', State.Preloader, true);
        }
    }
}

// export Game to window
var Game = Namespace.Game;
var loadGame = new Game();