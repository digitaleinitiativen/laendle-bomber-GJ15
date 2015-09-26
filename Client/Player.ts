///<reference path="Observer.ts"/>
///<reference path="Observable.ts"/>
///<reference path="phaser/phaser.d.ts"/>

class Player extends ConcreteObservable {

    sprite:Phaser.Sprite;
    id:string;

    constructor(sprite:Phaser.Sprite) {
        super();
        this.sprite = sprite;
    }

    getXCentral() : number {
        return this.sprite.x + this.sprite.width / 2;
    }

    getYCentral() : number {
        return this.sprite.y + this.sprite.height / 2;
    }

    putBomb(x, y) {
        this.notifyObservers("bomb", {id: this.id, x : x, y : y, time: 100});
    }
}
