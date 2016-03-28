/// <reference path="dep/phaser.d.ts"/>
var SideScroller = (function () {
    function SideScroller() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    SideScroller.prototype.preload = function () {
        this.game.load.image('logo', 'phaser-logo-small.png');
    };
    SideScroller.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    };
    return SideScroller;
})();
//# sourceMappingURL=SideScroller.js.map