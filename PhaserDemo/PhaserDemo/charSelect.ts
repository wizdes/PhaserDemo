module Namespace.State {
    export class charSelect extends Phaser.State {
        speedMult = 0.7;
        friction = 0.99;
        scrollingMap;
        colors = ["0xac81bd", "0xff5050", "0xdab5ff", "0xb5ffda", "0xfffdd0", "0xcc0000", "0x54748b", "0x4b0082", "0x80ab2f", "0xff784e", "0xe500db", "0x223c4a", "0x223c4a", "0xf1290e", "0x648080", "0xbbc1c4", "0x6f98a2", "0x71717e"];

        preload() {
        }

        create() {
            this.game.stage.backgroundColor = "#000000";
            this.game.add.text(this.game.width / 2, 50, "Select your fish", { font: "18px Arial", fill: "#ffffff" }).anchor.set(0.5);
            this.scrollingMap = this.game.add.tileSprite(0, 0, this.game.width / 2 + 5 * 90 + 64, this.game.height, "transp");
            this.scrollingMap.inputEnabled = true;
            this.scrollingMap.input.enableDrag(false);
            this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
            this.scrollingMap.isBeingDragged = false;
            this.scrollingMap.movingSpeed = 0;
            this.scrollingMap.input.allowVerticalDrag = false;
            this.scrollingMap.input.boundsRect = new Phaser.Rectangle(this.game.width - this.scrollingMap.width, this.game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - this.game.width, this.scrollingMap.height * 2 - this.game.height);
            var fish = this.game.add.image(this.game.width / 2 + 0, this.game.height / 2, "player");
            fish.anchor.set(0.5);
            this.scrollingMap.addChild(fish);
            fish = this.game.add.image(this.game.width / 2 + 90, this.game.height / 2, "player2");
            fish.anchor.set(0.5);
            this.scrollingMap.addChild(fish);

            this.scrollingMap.events.onDragStart.add(function() {
                this.scrollingMap.isBeingDragged = true;
                this.scrollingMap.movingSpeed = 0;
            }, this);
            this.scrollingMap.events.onDragStop.add(function() {
                this.scrollingMap.isBeingDragged = false;
            }, this);
        }

        update() {
            var zoomed = false;
            for (var i = 0; i < this.scrollingMap.children.length; i++) {
                if (Math.abs(this.scrollingMap.children[i].world.x - this.game.width / 2) < 46 && !zoomed) {
                    this.scrollingMap.getChildAt(i).scale.setTo(1.5);
                    zoomed = true;
                } else {
                    this.scrollingMap.getChildAt(i).scale.setTo(1);
                }
            }
            if (this.scrollingMap.isBeingDragged) {
                this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
            } else {
                if (this.scrollingMap.movingSpeed > 1) {
                    this.scrollingMap.x += this.scrollingMap.movingSpeed * Math.cos(this.scrollingMap.movingangle);
                    if (this.scrollingMap.x < this.game.width - this.scrollingMap.width) {
                        this.scrollingMap.x = this.game.width - this.scrollingMap.width;
                        this.scrollingMap.movingSpeed *= 0.5;
                        this.scrollingMap.movingangle += Math.PI;

                    }
                    if (this.scrollingMap.x > 0) {
                        this.scrollingMap.x = 0;
                        this.scrollingMap.movingSpeed *= 0.5;
                        this.scrollingMap.movingangle += Math.PI;
                    }
                    this.scrollingMap.movingSpeed *= this.friction;
                    this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
                } else {
                    var distance = this.scrollingMap.savedPosition.distance(this.scrollingMap.position);
                    var angle = this.scrollingMap.savedPosition.angle(this.scrollingMap.position);
                    if (distance > 4) {
                        this.scrollingMap.movingSpeed = distance * this.speedMult;
                        this.scrollingMap.movingangle = angle;
                    }
                }
            }
        }
    }
}
