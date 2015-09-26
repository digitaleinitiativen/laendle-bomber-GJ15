///<reference path="Observer.ts"/>
///<reference path="Observable.ts"/>
///<reference path="phaser/phaser.d.ts"/>

class Player extends Phaser.Sprite implements Observable {

    id : string;
    observer : ConcreteObservable;

    registerObserver(observer:Observer):void {
        this.observer.registerObserver(observer);
    }

    removeObserver(observer:Observer):void {
        this.observer.removeObserver(observer);
    }

    notifyObservers(type:string, arg:any):void {
        this.observer.notifyObservers(type, arg);
    }

    putBomb(x, y) {
        this.notifyObservers("bomb", [this.id, x, y]);
    }
}