﻿///<reference path="phaser/phaser.d.ts"/>
///<reference path="Player.ts"/>

class LaendleBomber {

    constructor() {
        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }

    game: Phaser.Game;
    map: Phaser.Tilemap;
    layerWalls: Phaser.TilemapLayer;
    layerBlocks: Phaser.TilemapLayer;
    layerFloor: Phaser.TilemapLayer;
    cursors: Phaser.CursorKeys;
    player: Player;

    preload() {
        this.game.load.image('player', 'assets/player.png');
        this.game.load.tilemap('map', 'assets/maps/BombMap1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/maps/BombMap1.png');
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 800, 800);

        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles');

        this.map.setCollisionBetween(0, 30);
        this.map.setCollisionBetween(0, 10);
        this.map.setCollisionBetween(0, 34);
        this.map.setCollision(10);

        this.layerFloor = this.map.createLayer('floor');
        this.layerFloor.resizeWorld();

        this.layerWalls = this.map.createLayer('walls');
        this.layerWalls.resizeWorld();

        this.layerBlocks = this.map.createLayer('blocks');
        this.layerBlocks.resizeWorld();
       
        

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.player = this.game.add.sprite(32, 32, 'player');

        this.game.physics.enable(this.player);
        //this.player.body.gravity.x = 1;
        //this.player.body.gravity.y = 1;
        this.game.camera.follow(this.player);

        this.player.body.bounce.set(0.0);
        //this.player.body.tilePadding.set(32);
        this.player.body.bounce.y = 0.2;
        this.player.body.linearDamping = 1;
        this.player.body.collideWorldBounds = true;
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.layerWalls);
        //this.game.physics.arcade.collide(this.player, this.layerBlocks);

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -100;
            this.player.body.velocity.y = 0;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 100;
            this.player.body.velocity.y = 0;
        } else if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -100;
            this.player.body.velocity.x = 0;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 100;
            this.player.body.velocity.x = 0;
        }
    }

    render() {
        this.game.debug.bodyInfo(this.player, 10, 530);
    }
}

window.onload = () => {

    var game = new LaendleBomber();

};
