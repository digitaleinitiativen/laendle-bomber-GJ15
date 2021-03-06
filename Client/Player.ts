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

    updatePosition(position: any) {
        if (this.sprite.x < position.x) {
            this.sprite.body.velocity.x = +100;
            this.sprite.body.velocity.y = 0;
        } else if(this.sprite.x > position.x) {
            this.sprite.body.velocity.x = -100;
            this.sprite.body.velocity.y = 0;
        }

        if (this.sprite.y < position.y) {
            this.sprite.body.velocity.y = 100;
            this.sprite.body.velocity.x = 0;
        } else if(this.sprite.y > position.y) {
            this.sprite.body.velocity.y = -100;
            this.sprite.body.velocity.x = 0;
        }

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

    delete(): void {
        this.sprite.destroy();
    }

    die():void {
        this.dead = true;
        this.sprite.tint = 0xff0000;
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
    }

    burned():void {
        this.die();
    }
    getSprite() {
        return this.sprite;
    }
}
