module Namespace.State {
    export class MainMenu extends Phaser.State {

        preload() {
        }

        create() {
            //loading screen will have a white background
            this.game.stage.backgroundColor = '#000';

            var playButton = this.game.add.button(this.game.width / 2, this.game.height / 2, "play", this.playGame);
            playButton.anchor.set(0.5);
        }

        playGame() {
            this.game.state.start('game', true);

        }
    }
}
