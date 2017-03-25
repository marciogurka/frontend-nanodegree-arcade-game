/**
 * Generates a new random number
 * @param  {int} min the minimal number
 * @param  {int} max the maximum number
 * @return {int}     the random number between the min and max
 */
 function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Entity Class
 * @param {int} x     Initial horizontal position
 * @param {int} y     Initial vertical position
 * @param {int} speed Initial Speed
 * @param {url} image Image Char url
 */

var Entity = function(x, y, speed, image) {
    this.x = x;
    this.y = y;
    //this.sprite = 'images/enemy-bug.png';
    this.sprite = image;
    this.speed = speed;
};

/**
 *  Update the Entity's position
 * @param  {int} dt the delta value
 */
Entity.prototype.update = function(dt) {
    this.x += (Math.random() * 60 * dt);
    this.reset();
};

/**
 * Draws the Entity on the screen
 */
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Reset Entity position to the start of the canvas
 */
Entity.prototype.reset = function() {
    if (this.x >= 500) {
        this.x = -101;
        this.speed = randomNumber(250, 450);
    }
};

var Enemy = function(x, y, speed, image){
    var obj = new Entity(x, y, speed, image);
    Enemy.prototype = Object.create(Entity.prototype);
    Enemy.prototype.constructor = Enemy;
    return obj;
};

var Player = function(x, y, speed, image){
    var obj = new Entity(x, y, speed, image);
    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Enemy;
    return obj;
};

/**
 * Check if the player collided with an enemy,
 * if the player collided, he`ll return to the start
 */
 Enemy.prototype.checkCollisions = function() { 
    allEnemies.forEach(function(enemy){
        if ((enemy.x) <= player.x + 30 &&
            (enemy.x + 30) >= (player.x) &&
            (enemy.y) <= player.y + 30 &&
            (enemy.y + 30) >= (player.y)) {

            var t = confirm("You lose. Do you want to restart?");
            if(t){
                player.reset();
                allEnemies.forEach(function(enemy) {
                    enemy.reset()
                });
            } else {
                player.reset();
            }
        }
    })
};

/**
 * Implementation of the player`s movement
 * @param  {string} direction the key name that is clicked
 */
 Player.prototype.handleInputAndCheckBoundary = function(direction) {
    switch(direction){
        case "up":
        this.y = this.y - 80;
        break;
        case "down":
        this.y = this.y + 80;
        break;
        case "left":
        this.x = this.x - 100;
        break;
        case "right":
        this.x = this.x + 100;
        break;
    }

    this.checkBoundary(this);
};

 Player.prototype.checkBoundary = function(){
    // if the player try to get out the canvas, they will continue on the last valid position
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }

    if (this.y < 0) {
        this.reset();
    } else if (this.y > 400) {
        this.y = 400;
        this.reset();
    }

}

/**
 * Reset the player`s position
 */
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 390;
};


/**
 * First Enemy
 * @type {Enemy}
 */
 var enemy1 = new Enemy(-101, 55, randomNumber(150, 450), 'images/mutant-enemy-bug.png');
/**
 * Second Enemy
 * @type {Enemy}
 */
 var enemy2 = new Enemy(-101, 140, randomNumber(50, 450), 'images/enemy-bug.png');
/**
 * Third Enemy
 * @type {Enemy}
 */
 var enemy3 = new Enemy(-101, 225, randomNumber(75, 450), 'images/mutant-enemy-bug.png');
/**
 * Array of the enemies
 * @type {Array}
 */
 var allEnemies = [];
 allEnemies.push(enemy1);
 allEnemies.push(enemy2);
 allEnemies.push(enemy3);

/**
 * Player char
 * @type {Player}
 */
 var player = new Player(202, 390, 'images/char-boy.png');


/**
 * Method to check what key was pressed
 * @param  {string} e  The key that was pressed
 */
 document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInputAndCheckBoundary(allowedKeys[e.keyCode]);
});