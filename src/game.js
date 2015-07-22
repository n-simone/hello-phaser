var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('tiles', 'assets/tileset.png');
    game.load.spritesheet('hero', 'assets/hero.png', 40, 52);

}

var platforms;

var cursors;
var jump;
var slide;
var left;
var right;
var sliding = 0;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    //var bg = game.add.sprite(0, 0, 'sky');
    // bg.fixedToCamera = true;
    game.stage.backgroundColor = '#aaaaaa';

    // tilemap
    map = game.add.tilemap();
    map.addTilesetImage('tiles');

    fg = map.create('fg', 250, 30, 32, 32);
    fg.resizeWorld();

    map.setCollision(0, true, fg);

    generateMap(map, fg);

    hero = new Hero(game);

    map.setTileIndexCallback([1, 2, 3, 4], function ()
    {
        hero.kill()
    }, this, fg);

    // Controls //

    jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    jump.onDown.add(function ()
    {
        hero.jump(true)
    }, this);

    jump.onUp.add(function ()
    {
        hero.jump(false)
    }, this);

    slide = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function update() {
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(hero.sprite, fg);

    if (right.isDown) hero.run(1);
    else if (left.isDown) hero.run(-1);
    else hero.run(0);

    if (slide.isDown) hero.slide(true);
    else hero.slide(false);

    if (!hero.sprite.body.blocked.down) hero.midair();

    if (hero.sprite.body.y > game.world.height) hero.kill();
}

