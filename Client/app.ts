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

    game:Phaser.Game;
    layerWalls:Phaser.TilemapLayer;
    layerBlocks:Phaser.TilemapLayer;
    layerFloor:Phaser.TilemapLayer;
    cursors:Phaser.CursorKeys;
    spacebar:Phaser.Key;

    game2:Game;


    preload() {
        console.log(this.game);
        this.game.load.image('player', '/game/Client/assets/player.png');
        this.game.load.spritesheet('bomb', '/game/Client/assets/bomb.png', 32, 32);
        this.game.load.tilemap('map', '/game/Client/assets/maps/BombMap1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '/game/Client/assets/maps/BombMap1.png');
    }

    create() {
        this.game2 = new Game();
        this.game2.phaser = this.game;

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
    }

    update() {
        this.game2.onUpdate();

        if (this.game2.player != undefined && this.game2.player != null) {

            this.game2.phaser.physics.arcade.collide(this.game2.player.sprite, this.layerWalls);
            this.game2.phaser.physics.arcade.collide(this.game2.player.sprite, this.layerBlocks);

            if (this.cursors.left.isDown) {
                this.game2.player.sprite.body.velocity.x = -100;
                this.game2.player.sprite.body.velocity.y = 0;
            }
            else if (this.cursors.right.isDown) {
                this.game2.player.sprite.body.velocity.x = 100;
                this.game2.player.sprite.body.velocity.y = 0;
            } else if (this.cursors.up.isDown) {
                this.game2.player.sprite.body.velocity.y = -100;
                this.game2.player.sprite.body.velocity.x = 0;
            } else if (this.cursors.down.isDown) {
                this.game2.player.sprite.body.velocity.y = 100;
                this.game2.player.sprite.body.velocity.x = 0;
            }

            this.game2.socketClient.onObservedEvent('move', this.game2.player.getPosition());
        }

    }

    render() {

    }
}


window.onload = () => {

    var game = new LaendleBomber();

};