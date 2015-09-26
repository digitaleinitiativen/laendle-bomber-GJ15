///<reference path="Observer.ts"/>
var SocketClient = (function () {
    function SocketClient() {
    }
    SocketClient.prototype.init = function () {
        this.socket = io('', { path: '/api/game', transports: ['polling'] });
        this.socket.on('connect', function () {
            console.log('connected');
        });
        this.socket.on('event', function (data) {
            console.log('connected');
        });
        this.socket.on('disconnect', function () {
            console.log('connected');
        });
        this.socket.on('error', function (data) {
            console.log('connected');
        });
    };
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