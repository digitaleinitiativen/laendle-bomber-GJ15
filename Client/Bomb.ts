///<reference path="phaser/phaser.d.ts"/>
///<reference path="app.ts"/>

class Bomb {
    sprite:Phaser.Sprite;
    time:number;
    owner:string;

    constructor(sprite:Phaser.Sprite, time:number, owner:string) {
        this.sprite = sprite;
        this.time = time;
        this.owner = owner;
    }
}