var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('hero', 'assets/hero.png', 40, 52);

}

var platforms;

var cursors;
var jump;
var slide;
var left;
var right;

var stars;
var score = 0;
var scoreText;

var sliding = 0;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 10000, 1200);

    //  A simple background for our game
    var bg = game.add.sprite(0, 0, 'sky');
    bg.fixedToCamera = true;

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
    
    hero = new Hero(game);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.

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

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(hero.sprite, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(hero.sprite, stars, collectStar, null, this);

    if (left.isDown) hero.run(-1);
    else if (right.isDown) hero.run(1);
    else hero.run(0);

    if (slide.isDown) hero.slide(true);
    else hero.slide(false);

    if (!hero.sprite.body.touching.down) hero.midair();
}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}

