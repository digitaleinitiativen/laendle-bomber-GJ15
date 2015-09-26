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


    putBomb(x, y) {
        this.notifyObservers("bomb", [this.id, x, y]);
    }
}
