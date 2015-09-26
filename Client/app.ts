class LaendleBomber {

    constructor() {
        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }

    game: Phaser.Game;
    cursors: Phaser.CursorKeys;
    player: Player;

    preload() {
        this.game.load.image('player', 'assets/player.png');
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.game.world.setBounds(0, 0, 800, 800);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.player = this.game.add.sprite(0, 0, 'player');

        this.game.physics.enable(this.player);
        this.player.body.gravity.x = 1;
        this.player.body.gravity.y = 1;
    }

    update() {
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

    }
}

window.onload = () => {

    var game = new LaendleBomber();

};