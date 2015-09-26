///<reference path="Observer.ts"/>
///<reference path="socket.io/socket.io.d.ts"/>
///<reference path="Game.ts"/>

class SocketClient implements Observer {

    socket: any;
    game: Game;
    connected : boolean;

    constructor(game:Game) {
        this.game = game;
    }

    init() {
        this.socket = io('', { path: '/api/game', transports: ['polling'] });
        this.socket.on('connect', () => {
            this.connected = true;
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

        this.socket.on('ehlo', (data) => {
            console.log(data);
            var id = data.id;
            this.game.createSelf(id);

            for(var key in data.players) {
                console.log("PlayerID", data.players[key]);
                this.game.createPlayer(data.players[key]);
            }
        });
        this.socket.on('player-left', (identifier) => {
            this.game.deletePlayer(identifier);
        });
        this.socket.on('new-player', (identifier) => {
            console.log("New Player", identifier);
            this.game.createPlayer(identifier);
        });

        this.socket.on('player-moves', ({identifier, position}) => {
            this.game.setPosition(identifier, position);
        });

        this.socket.on('bomb-placed', ({identifier, x, y, time}) => {
            console.log("Bomb placed", identifier, x, y, time);
            this.game.addBomb(identifier, x, y, time);
        });
    }

    onObservedEvent(type: string, arg: any) {

        if(this.connected) {
            switch (type) {
                case "bomb":
                    this.socket.emit("bomb", {x: arg.x, y: arg.y, time: arg.time});
                    break;
                case "move":
                    this.socket.emit("move", arg);
                    break;
            }
        }

    }

}