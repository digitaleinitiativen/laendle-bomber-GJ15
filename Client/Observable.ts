///<reference path="Observer.ts"/>

interface Observable {

    registerObserver(observer : Observer) : void;
    removeObserver(observer : Observer) : void;
    notifyObservers(type : string, arg: any) : void;

}

class ConcreteObservable implements Observable {
    private observers : Observer [];

    constructor() {
        this.observers = [];
    }

    registerObserver (observer : Observer) : void {
        this.observers.push(observer);
    }

    removeObserver (observer : Observer) : void {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    notifyObservers (type : string, arg : any) : void {

        this.observers.forEach((observer : Observer)=> {
            observer.update(type, arg);
        });
    }
}