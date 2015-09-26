///<reference path="phaser/phaser.d.ts"/>

class Game {

    constructor() {
    }

    static calculateTilePosition(map : Phaser.Tilemap, x : number, y : number) {
       return {x: Math.floor(x / map.tileWidth), y: Math.floor(y / map.tileHeight)};
    }
}