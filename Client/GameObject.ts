interface GameObject {
    onUpdate() : void;
    isDecayed() : boolean;
    delete() : void;
}