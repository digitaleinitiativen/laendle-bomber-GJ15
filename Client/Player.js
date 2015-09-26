///<reference path="Observer.ts"/>
///<reference path="Observable.ts"/>
///<reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(sprite) {
        _super.call(this);
        this.sprite = sprite;
    }
    Player.prototype.getXCentral = function () {
        return this.sprite.x + this.sprite.width / 2;
    };
    Player.prototype.getYCentral = function () {
        return this.sprite.y + this.sprite.height / 2;
    };
    Player.prototype.putBomb = function (x, y) {
        this.notifyObservers("bomb", { id: this.id, x: x, y: y, time: 10 });
    };
    return Player;
})(ConcreteObservable);
//# sourceMappingURL=Player.js.map