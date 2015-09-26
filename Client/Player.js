///<reference path="Observer.ts"/>
///<reference path="Observable.ts"/>
///<reference path="phaser/phaser.d.ts"/>
class Player extends ConcreteObservable {
    constructor(sprite) {
        super();
        this.sprite = sprite;
    }
    getXCentral() {
        return this.sprite.x + this.sprite.width / 2;
    }
    getYCentral() {
        return this.sprite.y + this.sprite.height / 2;
    }
    putBomb(x, y) {
        this.notifyObservers("bomb", { id: this.id, x: x, y: y, time: 10 });
    }
}
//# sourceMappingURL=Player.js.map