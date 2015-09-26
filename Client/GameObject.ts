interface GameObject {
    onUpdate() : void;
    isDecayed() : boolean;
    delete(): void;
    updatePosition(position:any): void;
    getPosition(): any;
    getSprite(): Phaser.Sprite;
    burned() : void;
}