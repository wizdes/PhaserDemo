var Namespace;
(function (Namespace) {
    var Entity;
    (function (Entity) {
        var PreloadBar = (function () {
            function PreloadBar(game) {
                this.game = game;
                this.width = game.width * 0.5;
                this.height = 40;
                var centreX = this.width / 2;
                this.progressBar = new Phaser.BitmapData(game, 'preload-bar', this.width, this.height);
                this.loaderImg = game.add.sprite(game.world.centerX - centreX, (game.height * 0.9) - this.height, this.progressBar);
            }
            PreloadBar.prototype.setFillPercent = function (percent) {
                var ctx = this.progressBar.ctx;
                this.progressBar.clear();
                ctx.fillStyle = '#000';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.fillRect(0, 0, this.width, this.height);
                ctx.strokeRect(0.5, 0.5, this.width - 1, this.height - 1);
                ctx.fillStyle = 'green';
                ctx.fillRect(1, 1, (this.width * (percent / 100)) - 2, this.height - 2);
            };
            return PreloadBar;
        })();
        Entity.PreloadBar = PreloadBar;
    })(Entity = Namespace.Entity || (Namespace.Entity = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=preload-bar.js.map