///<reference path="phaser/phaser.d.ts"/>
///<reference path="GameObject.ts"/>

class Bomb implements GameObject {

    game: LaendleBomber;
    id: string;
    sprite:Phaser.Sprite;
    time:number;
    owner:string;

    private remove : boolean = false;

    constructor(game: LaendleBomber, id:string, sprite:Phaser.Sprite, time:number, owner:string) {
        this.id = id;
        this.sprite = sprite;
        this.time = time;
        this.owner = owner;
        this.game = game;

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

            var s = this.game.game.add.sprite(this.sprite.x - 32, this.sprite.y, "bomb")
            s.animations.add("explode", [46, 38, 30], 10, false).killOnComplete = true;
            s.animations.play("explode");

            s = this.game.game.add.sprite(this.sprite.x + 32, this.sprite.y, "bomb")
            s.animations.add("explode", [46, 38, 30], 10, false).killOnComplete = true;
            s.animations.play("explode");

            s = this.game.game.add.sprite(this.sprite.x , this.sprite.y - 32, "bomb")
            s.animations.add("explode", [46, 38, 30], 10, false).killOnComplete = true;
            s.animations.play("explode");

            s = this.game.game.add.sprite(this.sprite.x, this.sprite.y + 32, "bomb")
            s.animations.add("explode", [46, 38, 30], 10, false).killOnComplete = true;
            s.animations.play("explode");
            //this.game.game1.layerBlocks.getTileXY(sprite.x, sprite.y);
            //this.game.game1.layerBlocks.getTileXY(sprite.x, sprite.y);
        }
    }

    isDecayed():boolean {
        return this.remove;
    }

    delete():void {
        this.sprite.destroy();
    }


    updatePosition(position: any) {
    }
}