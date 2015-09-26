///<reference path="Observer.ts"/>
class SocketClient {
    constructor() {
    }
    init() {
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
    }
    onObservedEvent(type, arg) {
        switch (type) {
            case "bomb":
                console.log("Bomb placed", arg);
                break;
        }
    }
}
//# sourceMappingURL=SocketClient.js.map