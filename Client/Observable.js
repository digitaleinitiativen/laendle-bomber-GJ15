///<reference path="Observer.ts"/>
class ConcreteObservable {
    constructor() {
        this.observers = [];
    }
    registerObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }
    notifyObservers(type, arg) {
        this.observers.forEach((observer) => {
            observer.onObservedEvent(type, arg);
        });
    }
}
//# sourceMappingURL=Observable.js.map