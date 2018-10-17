CatCatcher.platformState = function(game) {

}

var sprite;

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var yAxis = p2.vec2.fromValues(0, 1);
var jumpCount;

POWER=100;
PROGRESS=0;


var checkIfCanJump = function () {
    var c, d, i, result, yAxis;
    yAxis = p2.vec2.fromValues(0, 1);
    result = false;
    i = 0;
    while (i < game.physics.p2.world.narrowphase.contactEquations.length) {
        c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
            d = p2.vec2.dot(c.normalA, yAxis);
            if (c.bodyA === player.body.data) {
                d *= -1;
            }
            if (d > 0.5) {
                result = true;
            }
        }
        i++;
    }
    return result;
};

function jump1() {
    player.body.moveUp(300);
    jumpCount++;
}

function jump2() {
    if (jumpCount < 1) {
        player.body.moveUp(300);
        jumpCount++;
    }
}

function jump() {
    if (checkIfCanJump()) {
        jump1();
    }
    if (!checkIfCanJump()) {
        jump2();
    }
}

var rec;

CatCatcher.platformState.prototype = {

   
    preload: function () {

    },

    create: function() {

    bg = game.add.tileSprite(0, 0, 800, 600, 'back');

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 600;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

    //  Add a sprite
    player = game.add.sprite(200, 200, 'dude');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(player);

    player.body.fixedRotation = true;
    player.body.damping = 0.5;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  A stack of boxes - you'll stick to these
    for (var i = 1; i < 4; i++) {
        var box = game.add.sprite(300, 645 - (95 * i), 'atari');
        game.physics.p2.enable(box);
        box.body.mass = 6;
        // box.body.static = true;
        box.body.setMaterial(boxMaterial);
    }

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.

    var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { friction: 0.0 });
    var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });

    //  Here are some more options you can set:

    // contactMaterial.friction = 0.0;     // Friction to use in the contact of these two materials.
    // contactMaterial.restitution = 0.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    // contactMaterial.stiffness = 1e3;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    // contactMaterial.relaxation = 0;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    // contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    // contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    // contactMaterial.surfaceVelocity = 0.0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

    text = game.add.text(20, 20, 'move with arrow, space to jump', { fill: '#ffffff' });

    //lifebar/////////////////

    var t = game.add.text(20, 20, '# POWER #', { fill: '#ffffff' });
    t.fixedToCamera = true;
    
    var lifebar = game.add.sprite(12,35,'3');
    lifebar.fixedToCamera = true;


// BARRA DE PODER

var bmd2 = game.add.bitmapData(200,40);
bmd2.ctx.beginPath();
bmd2.ctx.rect(0,0,190,7);
bmd2.ctx.fillStyle = '#000000';
bmd2.ctx.fill();

healthBar2 = game.add.sprite(33,88,bmd2);

healthBar2.fixedToCamera = true;

var bmd = game.add.bitmapData(200,40);
bmd.ctx.beginPath();
bmd.ctx.rect(0,0,175,7);
bmd.ctx.fillStyle = '#00685e';
bmd.ctx.fill();

healthBar = game.add.sprite(33,88,bmd);

healthBar.fixedToCamera = true;

///////////////////////////

//BARRA DE PROGRESO /////

var bmd3 = game.add.bitmapData(200,40);
bmd3.ctx.beginPath();
bmd3.ctx.rect(0,0,190,7);
bmd3.ctx.fillStyle = '#000000';
bmd3.ctx.fill();

bar = game.add.sprite(game.world.centerX-bmd3.width/2,game.world.bottom-50,bmd3);

bar.fixedToCamera = true;


var pro = game.add.bitmapData(200,40);
pro.ctx.beginPath();
pro.ctx.rect(0,0,190,7);
pro.ctx.fillStyle = '#99FFFF';
pro.ctx.fill();

progress = game.add.sprite(game.world.centerX-bmd3.width/2,game.world.bottom-50,pro);

progress.fixedToCamera = true;

///////////////////////

    ///////////////////////////

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

},

render:function(){


        game.debug.geom(rec, 'rgba(200,0,0,0.5)');
 
    
       
    
    
},

    update: function() {


     barWidth = healthBar.width;
     healthBar.width = barWidth - barWidth/POWER;



    if (cursors.left.isDown) {
        player.body.moveLeft(200);

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown) {
        player.body.moveRight(200);

        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else {
        player.body.velocity.x = 0;

        if (facing != 'idle') {
            player.animations.stop();

            if (facing == 'left') {
                player.frame = 0;
            }
            else {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }




     if (checkIfCanJump()) {
            jumpCount = 0;
     }

        cursors.up.onDown.add(jump);
}


}