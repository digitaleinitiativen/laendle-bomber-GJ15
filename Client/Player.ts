///<reference path="Observer.ts"/>
///<reference path="Observable.ts"/>
///<reference path="phaser/phaser.d.ts"/>
///<reference path="GameObject.ts"/>

class Player extends ConcreteObservable implements GameObject {

    sprite:Phaser.Sprite;
    id:string;
    dead:boolean = false;

    constructor(id:string, sprite:Phaser.Sprite) {
        super();
        this.id = id;
        this.sprite = sprite;
    }

    getXCentral():number {
        return this.sprite.x + this.sprite.width / 2;
    }

    getYCentral():number {
        return this.sprite.y + this.sprite.height / 2;
    }

    putBomb(x, y) {
        this.notifyObservers("bomb", {id: this.id, x: x, y: y, time: 100});
    }

    updatePosition(position:any) {
        this.sprite.x = position.x;
        this.sprite.y = position.y;
    }

    getPosition():any {
        return {x: this.sprite.x, y: this.sprite.y};
    }

    onUpdate():void {

    }

    isDecayed():boolean {
        return false;
    }

    delete():void {
        this.sprite.destroy();
    }

    die():void {
        this.dead = true;
        this.sprite.tint = 0xff0000;
        this.notifyObservers("die", {id: this});
    }
}
