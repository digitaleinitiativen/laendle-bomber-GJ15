///<reference path="Observer.ts"/>

class SocketClient implements Observer {

    update(type:string, arg:any) {
        switch (type) {
            case "bomb":
                console.log("Bomb placed", arg);
                break;
        }
    }

}