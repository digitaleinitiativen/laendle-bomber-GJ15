interface GameObject {
    onUpdate() : void;
    isDecayed() : boolean;
    delete(): void;
    updatePosition(position: any): void;
    getPosition(): any;
}