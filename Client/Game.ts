﻿///<reference path="phaser/phaser.d.ts"/>
///<reference path="Bomb.ts"/>
///<reference path="Observer.ts"/>
///<reference path="GameObject.ts"/>
///<reference path="Player.ts"/>
///<reference path="SocketClient.ts"/>

class Game implements Observer, GameObject {

    phaser:Phaser.Game;
    map:Phaser.Tilemap;
    player:Player;
    socketClient:SocketClient;

    objects:{[id: string] : GameObject; } = {};


    constructor() {
        this.socketClient = new SocketClient(this);
        this.socketClient.init();
    }

    /**
     * Returns the position of the tile
     * @param map
     * @param x The pixel position
     * @param y The pixel position
     * @returns {{x: number, y: number}}
     */
    static calculateTilePosition(map:Phaser.Tilemap, x:number, y:number) {
        return {x: Math.floor(x / map.tileWidth), y: Math.floor(y / map.tileHeight)};
    }

    /**
     * Returns the position of the tile in pixels
     * @param map
     * @param x The x position of the tile
     * @param y The y position of the tile
     * @returns {{x: number, y: number}}
     */
    static calculatePixelPosition(map:Phaser.Tilemap, x:number, y:number) {
        return {x: x * map.tileWidth, y: y * map.tileHeight};
    }

    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    createSelf(id:string) {
        this.player = new Player(id, this.phaser.add.sprite(33, 33, 'player'));

        this.phaser.physics.enable(this.player.sprite);
        this.phaser.camera.follow(this.player.sprite);

        this.player.sprite.body.bounce.set(0.0);
        this.player.sprite.body.tilePadding.set(32);
        this.player.sprite.body.collideWorldBounds = true;

        this.player.registerObserver(this.socketClient);
        this.player.registerObserver(this);

        this.phaser.input.keyboard.onDownCallback = (e:KeyboardEvent) => {
            if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
                var tilePos = Game.calculateTilePosition(this.map, this.player.getXCentral(), this.player.getYCentral());
                this.player.putBomb(tilePos.x, tilePos.y);
            }
        }
    }

    createPlayer(id:string) {
        var player = new Player(id, this.phaser.add.sprite(33, 33, 'player'));
        this.phaser.physics.enable(player.sprite);

        player.sprite.body.bounce.set(0.0);
        player.sprite.body.tilePadding.set(32);
        player.sprite.body.collideWorldBounds = true;

        this.objects[player.id] = player;

    }

    deletePlayer(id:string) {
        this.objects[id].delete();
        delete(this.objects[id]);
    }

    setPosition(id:string, position:any) {
        this.objects[id].updatePosition(position);
    }

    addBomb(owner:string, x:number, y:number, time:number) {
        var tileCenter = Game.calculatePixelPosition(this.map, x, y);
        var bomb = new Bomb(Game.guid(), this.phaser.add.sprite(tileCenter.x, tileCenter.y, "bomb"), time, owner);

        this.objects[bomb.id] = bomb;
    }

    onObservedEvent(type:string, arg:any) {
        switch (type) {
            case "bomb":
                this.addBomb(arg.id, arg.x, arg.y, arg.time);
                break;
        }
    }

    onUpdate():void {

        for (var key in this.objects) {
            var object = this.objects[key];

            object.onUpdate();

            if(object.isDecayed()) {
                delete(this.objects[key]);
            }
        }

    }

    isDecayed():boolean {
        return false;
    }

    delete():void {
    }

}