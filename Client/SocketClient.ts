///<reference path="Observer.ts"/>

class SocketClient implements Observer {

    onObservedEvent(type:string, arg:any) {
        switch (type) {
            case "bomb":
                console.log("Bomb placed", arg);
                break;
        }
    }

}