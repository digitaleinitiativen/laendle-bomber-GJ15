///<reference path="phaser/phaser.d.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
///<reference path="SocketClient.ts"/>
///<reference path="Observer.ts"/>
///<reference path="Bomb.ts"/>

class LaendleBomber {

    constructor() {
        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }

    game : Phaser.Game;
    layerWalls:Phaser.TilemapLayer;
    layerBlocks:Phaser.TilemapLayer;
    layerFloor:Phaser.TilemapLayer;
    cursors:Phaser.CursorKeys;
    spacebar:Phaser.Key;
    player:Player;
    game2:Game;
    socketClient:SocketClient;

    preload() {
        console.log(this.game);
        this.game.load.image('player', 'assets/player.png');
        this.game.load.spritesheet('bomb', 'assets/bomb.png', 17, 17);
        this.game.load.tilemap('map', 'assets/maps/BombMap1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/maps/BombMap1.png');
    }

    create() {
        this.game2 = new Game();
        this.game2.phaser = this.game;
        this.socketClient = new SocketClient();
        this.socketClient.init();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 528, 528);

        this.game2.map = this.game.add.tilemap('map');
        this.game2.map.addTilesetImage('tiles');

        this.layerFloor = this.game2.map.createLayer('floor');
        this.layerFloor.resizeWorld();

        this.layerWalls = this.game2.map.createLayer('walls');
        this.layerWalls.resizeWorld();

        this.layerBlocks = this.game2.map.createLayer('blocks');
        this.layerBlocks.resizeWorld();

        this.game2.map.setCollision(10, true, this.layerWalls);
        this.game2.map.setCollision(34, true, this.layerBlocks);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.player = new Player(this.game.add.sprite(33, 33, 'player'));
        this.player.id = guid();

        this.game.physics.enable(this.player.sprite);
        this.game.camera.follow(this.player.sprite);

        this.player.sprite.body.bounce.set(0.0);
        this.player.sprite.body.tilePadding.set(32);
        this.player.sprite.body.collideWorldBounds = true;

        this.player.registerObserver(this.socketClient);
        this.player.registerObserver(this.game2);

        var callee = this;
        this.game.input.keyboard.onDownCallback = function (e:KeyboardEvent) {
            if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
                var tilePos = Game.calculateTilePosition(callee.game2.map, callee.player.getXCentral(), callee.player.getYCentral());
                callee.player.putBomb(tilePos.x, tilePos.y);
            }
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player.sprite, this.layerWalls);
        this.game.physics.arcade.collide(this.player.sprite, this.layerBlocks);

        if (this.cursors.left.isDown) {
            this.player.sprite.body.velocity.x = -100;
            this.player.sprite.body.velocity.y = 0;
        }
        else if (this.cursors.right.isDown) {
            this.player.sprite.body.velocity.x = 100;
            this.player.sprite.body.velocity.y = 0;
        } else if (this.cursors.up.isDown) {
            this.player.sprite.body.velocity.y = -100;
            this.player.sprite.body.velocity.x = 0;
        }
        else if (this.cursors.down.isDown) {
            this.player.sprite.body.velocity.y = 100;
            this.player.sprite.body.velocity.x = 0;
        }
    }

    render() {

    }
}


window.onload = () => {

    var game = new LaendleBomber();

};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
