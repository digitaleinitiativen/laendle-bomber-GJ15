///<reference path="Observer.ts"/>
var SocketClient = (function () {
    function SocketClient() {
        this.socket = io('', { path: 'api/game', transports: ['polling'] });
        this.socket.on('connect', function () {
            console.log('connected');
        });
        this.socket.on('event', function (data) { });
        this.socket.on('disconnect', function () { });
    }
    SocketClient.prototype.onObservedEvent = function (type, arg) {
        switch (type) {
            case "bomb":
                console.log("Bomb placed", arg);
                break;
        }
    };
    return SocketClient;
})();
//# sourceMappingURL=SocketClient.js.map