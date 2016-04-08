module Namespace.State {
    export class MainMenu extends Phaser.State {

        preload() {
        }

        create() {
            //loading screen will have a white background
            this.game.stage.backgroundColor = '#333';

            var playButton = this.game.add.button(this.game.width / 2, this.game.height / 2, "play", this.playGame);
            playButton.anchor.set(0.5);
            var charButton = this.game.add.button(0, this.game.height / 2, "charSelectImg", this.charSel);
            charButton.anchor.set(0.5);


            if (localStorage.getItem('highscore') != null) {
                var score_label = this.game.add.text(0, 0, localStorage.getItem('highscore'), { font: '24px Arial', fill: '#000' });
            } else {
                var score_label = this.game.add.text(0, 0, 0 + "", { font: '24px Arial', fill: '#000' });
            }

        }

        playGame() {
            this.game.state.start('game', true);
        }

        charSel() {
            this.game.state.start('charSelect', true);
        }
    }
}
