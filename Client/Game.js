///<reference path="phaser/phaser.d.ts"/>
///<reference path="Bomb.ts"/>
///<reference path="Observer.ts"/>
class Game {
    /**
     * Returns the position of the tile
     * @param map
     * @param x The pixel position
     * @param y The pixel position
     * @returns {{x: number, y: number}}
     */
    static calculateTilePosition(map, x, y) {
        return { x: Math.floor(x / map.tileWidth), y: Math.floor(y / map.tileHeight) };
    }
    /**
     * Returns the position of the tile in pixels
     * @param map
     * @param x The x position of the tile
     * @param y The y position of the tile
     * @returns {{x: number, y: number}}
     */
    static calculatePixelPosition(map, x, y) {
        return { x: x * map.tileWidth, y: y * map.tileHeight };
    }
    addBomb(owner, x, y, time) {
        var tileCenter = Game.calculatePixelPosition(this.map, x, y);
        var bomb = new Bomb(this.phaser.add.sprite(tileCenter.x + 8, tileCenter.y + 8, "bomb"), time, owner);
        bomb.sprite.animations.add("stand", [1, 2, 3], 1, true);
        bomb.sprite.animations.play("stand");
        console.log(bomb);
    }
    onObservedEvent(type, arg) {
        switch (type) {
            case "bomb":
                this.addBomb(arg.id, arg.x, arg.y, arg.time);
                break;
        }
    }
}
//# sourceMappingURL=Game.js.map