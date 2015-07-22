var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('tiles', 'assets/src/ground_1x1.png');
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
/*
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.fixedToCamera = true;

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create many ledges
    var x = 0;
    var y = game.world.height / 2;
    var dx;
    var ledge;

    while (x < game.world.width)
    {
        dx = Math.random() + 1;

        ledge = platforms.create(x, y, 'ground');
        ledge.scale.setTo(dx, 1);

        ledge.body.immovable = true;
       
        if (dx * 400 > 500 && Math.random() > .75)
        {
            ledge = platforms.create(x + 175 * dx, y - 200, 'ground');
            ledge.scale.setTo(.3, 5);

            ledge.body.immovable = true;
        }

        x += 400 * dx + 250;
        y += Math.random() * 200 - 100;
    }
    */

    generateMap(map, fg);

    hero = new Hero(game);

    map.setTileIndexCallback(1, function ()
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

