///<reference path="phaser/phaser.d.ts"/>
///<reference path="GameObject.ts"/>

class Bomb implements GameObject {


    id: string;
    sprite:Phaser.Sprite;
    time:number;
    owner:string;

    private remove : boolean = false;

    constructor(id:string, sprite:Phaser.Sprite, time:number, owner:string) {
        this.id = id;
        this.sprite = sprite;
        this.time = time;
        this.owner = owner;

        this.sprite.animations.add("stand", [0, 1, 2, 3], 10, true);
        this.sprite.animations.add("explode", [46, 38, 30], 10, false).killOnComplete = true;
        this.sprite.animations.play("stand");
    }

    onUpdate() : void {
        this.time--;

        if(this.time <= 0) {
            // Explode
            this.sprite.animations.play("explode");
            this.remove = true;
        }
    }

    isDecayed():boolean {
        return this.remove;
    }

    delete():void {
        this.sprite.destroy();
    }
}