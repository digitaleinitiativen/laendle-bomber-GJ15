///<reference path="phaser/phaser.d.ts"/>
///<reference path="Bomb.ts"/>

class Game {

    phaser : Phaser.Game;
    map : Phaser.Tilemap;

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
     * Returns the center position of the tile in pixels
     * @param map
     * @param x The x position of the tile
     * @param y The y position of the tile
     * @returns {{x: number, y: number}}
     */
    static calculatePixelPosition(map:Phaser.Tilemap, x:number, y:number) {
        return {x: x * map.tileWidth + map.tileWidth / 2, y: y * map.tileHeight + map.tileHeight / 2};
    }

    addBomb(owner : string, x : number, y : number, time : number) {
        var tileCenter = Game.calculatePixelPosition(this.map, x, y);
        var bomb = new Bomb(this.phaser.add.sprite(tileCenter.x, tileCenter.y), time, owner);
        console.log(bomb);
    }

    onObservedEvent(type:string, arg:any) {
        switch (type) {
            case "bomb":
                this.addBomb(arg.id, arg.x, arg.y, arg.time);
                break;
        }
    }
}