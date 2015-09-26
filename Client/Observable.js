///<reference path="Observer.ts"/>
var ConcreteObservable = (function () {
    function ConcreteObservable() {
        this.observers = [];
    }
    ConcreteObservable.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    ConcreteObservable.prototype.removeObserver = function (observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
    };
    ConcreteObservable.prototype.notifyObservers = function (type, arg) {
        this.observers.forEach(function (observer) {
            observer.onObservedEvent(type, arg);
        });
    };
    return ConcreteObservable;
})();
//# sourceMappingURL=Observable.js.map