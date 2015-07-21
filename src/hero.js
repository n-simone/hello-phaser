function Hero (game)
{
    this.sprite = game.add.sprite(32, 150, 'hero');
    game.camera.follow(this.sprite);

    game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.0;
    this.sprite.body.gravity.y = 5000;
    this.sprite.body.collideWorldBounds = false;

    this.sprite.body.drag.x = 4000;
    this.sprite.body.maxVelocity.x = 600;

    this.sprite.animations.add('run', [0, 1, 2, 3, 4, 5, 6], 40, true);
    this.sprite.anchor.setTo(.5, 1);
}

Hero.prototype.jump = function (state)
{
    if (state)
    {
        if (this.sprite.body.blocked.down)
        {
            this.sprite.body.velocity.y = -1500;
        }
    }
    else
    {
        if (this.sprite.body.velocity.y < 0)
        {
            this.sprite.body.velocity.y = 0;
        }
    }
}

Hero.prototype.run = function (direction)
{
    if (direction === -1 || direction === 1)
    {
        this.sprite.animations.play('run'); 
        this.sprite.body.acceleration.x = direction * 4000;
        this.sprite.scale.x = direction;
    }

    else
    {
        this.sprite.body.acceleration.x = 0;
        this.sprite.animations.stop();

        this.sprite.frame = 7;
    }
}

Hero.prototype.slide = function (state)
{ 
    if (state)
    {
        //  Slide
        this.sprite.body.acceleration.x = 0;
        this.sprite.body.drag.x = 0;

        this.sprite.body.setSize(40, 25, 0, 0);

        this.sprite.frame = 8;
    }
    else
    {
        //  Stop sliding
        this.sprite.body.drag.x = 4000;

        this.sprite.body.setSize(40, 52, 0, 0);
    }
}

Hero.prototype.midair = function ()
{ 
    this.sprite.body.acceleration.x /= 2;
    this.sprite.frame = 6;
}

Hero.prototype.kill = function ()
{
    this.sprite.body.x = 32;
    this.sprite.body.y = 150;
}
