CatCatcher.arcadeState = function(game) {

}

var player;
//var facing = 'left';
var jumpTimer = 0;
var cursors;
var ballButton;
var jumpCount;
var jumpCount2;
var ball;
var layer;
var balls;
var balls2;
var ballTime = 0;
var ballTime2 = 0;
var slowTime = 0;
var slowTime2 = 0;

POWER=0;
PROGRESS=0;

// Funciones necesarias para implementar el doble salto
function jump1() {
    player.body.velocity.y = -500;
    jumpCount++;
}

function jump2() {
    if (jumpCount === 1) {
        player.body.velocity.y = -500;
        jumpCount++;
    }
}

function jump() {
    if (player.body.onFloor()) {
        jump1();
    }
    if (!player.body.onFloor()) {
        jump2();
    }
}
//doble salto jugador 2

function p2jump1() {
    player2.body.velocity.y = -500;
    jumpCount2++;
}

function p2jump2() {
    if (jumpCount2 === 1) {
        player2.body.velocity.y = -500;
        jumpCount2++;
    }
}

function p2jump() {
    if (player2.body.onFloor()) {
        p2jump1();
    }
    if (!player2.body.onFloor()) {
        p2jump2();
    }
}

function collisionHandler(ball, layer) {
    ball.kill();
}

function p1vsp2() {
    player2.slow = true;
    ball.kill();
}

function p2vsp1() {
    player.slow = true;
    ball2.kill();
}

function ballvsball() {
    ball2.kill();
    ball.kill();
}

function fireball(p) {
    if (game.time.now > ballTime) {
        ball = balls.getFirstExists(false);

        if (ball) {
            if (p.frame == 0 || p.facing == 'left') {
                ball.reset(p.x - 30, p.y);
                ball.body.velocity.x = -400;   
            } else {
                ball.reset(p.x + 30, p.y);
                ball.body.velocity.x = 400;
            }
            ball.body.gravity.y = 0;
            ball.body.maxVelocity.y = 0;
            ballTime = game.time.now + 600;
        }
    }
}

function fireball2(p) {
    if (game.time.now > ballTime2) {
        ball2 = balls2.getFirstExists(false);

        if (ball2) {
            if (p.frame == 0 || p.facing == 'left') {
                ball2.reset(p.x - 30, p.y);
                ball2.body.velocity.x = -400;
            } else {
                ball2.reset(p.x + 30, p.y);
                ball2.body.velocity.x = 400;
            }
            ball2.body.gravity.y = 0;
            ball2.body.maxVelocity.y = 0;
            ballTime2 = game.time.now + 600;
        }
    }
}

function removeSprite(sprite) {
    sprite.destroy();
}

function slowFalse() {
    player.slow = false;
}


function slowFalse2() {
    player2.slow = false;
}

CatCatcher.arcadeState.prototype = {

   
    preload: function () {

    },

    create: function () {

                //music

                music.stop();

                music = game.add.audio('lvl');
        
                music.loop=true;
                
                music.play();

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    layer = map.createLayer('World1');

    timer = new Phaser.Timer(game)

    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
    map.setCollision(40);

    layer.resizeWorld();

        layer.wrap = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.physics.arcade.gravity.y = 300;

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.ARCADE;
        balls.createMultiple(30, 'fireball');
        balls.setAll('outOfBoundsKill', true);
        balls.setAll('checkWorldBounds', true);

        balls2 = game.add.group();
        balls2.enableBody = true;
        balls2.physicsBodyType = Phaser.Physics.ARCADE;
        balls2.createMultiple(30, 'fireball');
        balls2.setAll('outOfBoundsKill', true);
        balls2.setAll('checkWorldBounds', true);


        //JUGADOR 1
        player = game.add.sprite(32, 320, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        //JUGADOR 2
        player2 = game.add.sprite(60, 320, 'dude');
        game.physics.enable(player2, Phaser.Physics.ARCADE);

        //ball = game.add.sprite(9999, 9999, 'fireball');
        //game.physics.enable(ball, Phaser.Physics.ARCADE);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.body.setSize(20, 32, 5, 16);

        player2.body.collideWorldBounds = true;
        player2.body.gravity.y = 1000;
        player2.body.maxVelocity.y = 500;
        player2.body.setSize(20, 32, 5, 16);


        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player2.animations.add('left', [0, 1, 2, 3], 10, true);
        player2.animations.add('turn', [4], 20, true);
        player2.animations.add('right', [5, 6, 7, 8], 10, true);

        cursors = game.input.keyboard.createCursorKeys();
        ballButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        ballButton2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //CONTROLES DEL JUGADOR 2
        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        player.jumpCount = 0;
        player2.jumpCount = 0;

        player.facing = 'left';
        player2.facing = 'left';

        player.slow = false;
        player2.slow = false;

          ///////bars

    



// BARRA DE PODER

var bmd2 = game.add.bitmapData(200,40);
bmd2.ctx.beginPath();
bmd2.ctx.rect(0,0,192,20);
bmd2.ctx.fillStyle = '#000000';
bmd2.ctx.fill();

healthBar2 = game.add.sprite(60,30,bmd2);

healthBar2.fixedToCamera = true;

var bmd = game.add.bitmapData(200,40);
bmd.ctx.beginPath();
bmd.ctx.rect(0,0,192,20);
bmd.ctx.fillStyle = '#00685e';
bmd.ctx.fill();

healthBar = game.add.sprite(60,30,bmd);

healthBar.fixedToCamera = true;


    //lifebar/////////////////
    
    var lifebar = game.add.sprite(12,12,'3');
    lifebar.scale.setTo(.1,.1);
    lifebar.fixedToCamera = true;

///////////////////////////

// BARRA DE PODER

var bmd3 = game.add.bitmapData(200,40);
bmd3.ctx.beginPath();
bmd3.ctx.rect(0,0,190,7);
bmd3.ctx.fillStyle = '#000000';
bmd3.ctx.fill();

pout = game.add.sprite(300,550,bmd3);

pout.fixedToCamera = true;

var bmd4 = game.add.bitmapData(200,40);
bmd4.ctx.beginPath();
bmd4.ctx.rect(0,0,175,7);
bmd4.ctx.fillStyle = '#0AF2DF';
bmd4.ctx.fill();

pin = game.add.sprite(300,550,bmd4);

pin.fixedToCamera = true;

///////////////////////////

// ITEMS //////////


var box = game.add.sprite(710,15,'box');
box.scale.setTo(.1,.1);
box.fixedToCamera = true;

/////////////////////////
},

    update: function () {

        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(player2, layer);

        //game.physics.arcade.collide(ball, layer);

        //barWidth = healthBar.width;
        //healthBar.width = barWidth - barWidth/POWER;
   


        player.body.velocity.x = 0;
        player2.body.velocity.x = 0;


        if (cursors.left.isDown) {
            if (player.slow == false) {
                player.body.velocity.x = -150;
            } else {
                game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse, this);
                player.body.velocity.x = -75;
            }

            if (player.facing != 'left') {
                player.animations.play('left');
                player.facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            if (player.slow == false) {
                player.body.velocity.x = 150;
            } else {
                game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse2, this);
                player.body.velocity.x = 75;
            }

            if (player.facing != 'right') {
                player.animations.play('right');
                player.facing = 'right';
            }
        }
        else {
            if (player.facing != 'idle') {
                player.animations.stop();

                if (player.facing == 'left') {
                    player.frame = 0;
                }
                else {
                    player.frame = 5;
                }

                player.facing = 'idle';
            }
        }



        if (a.isDown) {
            if (player2.slow == false) {
                player2.body.velocity.x = -150;
            } else {
                game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse2, this);
                player2.body.velocity.x = -75;
            }

            if (player2.facing != 'left') {
                player2.animations.play('left');
                player2.facing = 'left';
            }
        }
        else if (d.isDown) {
            if (player2.slow == false) {
                player2.body.velocity.x = 150;
            } else {
                game.time.events.add(Phaser.Timer.SECOND * 2, slowFalse2, this);
                player2.body.velocity.x = 75;
            }

            if (player2.facing != 'right') {
                player2.animations.play('right');
                player2.facing = 'right';
            }
        }
        else {
            if (player2.facing != 'idle') {
                player2.animations.stop();

                if (player2.facing == 'left') {
                    player2.frame = 0;
                }
                else {
                    player2.frame = 5;
                }

                player2.facing = 'idle';
            }
        }

        if (ballButton.isDown) {
            fireball(player);
        }

        if (ballButton2.isDown) {
            fireball2(player2);
        }


        game.physics.arcade.collide(balls, layer, collisionHandler, null, this);
        game.physics.arcade.collide(balls2, layer, collisionHandler, null, this);

        game.physics.arcade.collide(player2, balls, p1vsp2, null, this);
        game.physics.arcade.collide(player, balls2, p2vsp1, null, this);

        game.physics.arcade.collide(balls, balls2, ballvsball, null, this);


        if (player.body.onFloor()) {
            jumpCount = 0;
        }

        if (player2.body.onFloor()) {
            jumpCount2 = 0;
        }

        if (player2.body.onFloor()) {
            player2.jumpCount = 0;
        }


        cursors.up.onDown.add(jump);
        w.onDown.add(p2jump);

}


}