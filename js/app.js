// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    
    // Starting positions for enemies  
    this.x = this.startX();
    this.y = this.startY();
    
    // Random speed for enemy
    this.speed = Math.floor((Math.random() * 300) + 100);
};

// Random enemy start position(x)
Enemy.prototype.startX = function(){
    var startX = -(Math.floor(Math.random()*500));
    return startX;
};

// Random enemy start position(y)
Enemy.prototype.startY = function(){
    var positions = [60, 145, 230];
    var startY = positions[Math.floor(Math.random() * positions.length)];
    return startY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Assign random speed to enemies and multiply by dt
    this.x += this.speed * dt;
            
    // When enemies go off screen restart positions
    if(this.x > 550){
        this.x = this.startX();
        this.y = this.startY();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';//Defines Players sprite
    this.x = 200; //starting x position
    this.y = 400;//starting y position
    this.speed = Math.floor((Math.random() * 300) + 100);
};

// Update the Player's position
Player.prototype.update = function(){
    if(this.x < 0 || this.y < 60 || this.x > 400 || this.y > 400) {
        this.reset();
    }   
};

// Draw the player on the screen, required method for game
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Movement of player with the arrow keys
Player.prototype.handleInput = function(direction){
    if(direction === 'left'){
        this.x -= 100;
    }else if(direction === 'up'){
        this.y -= 85;
    }else if(direction === 'right'){
        this.x += 100;
    }else if(direction === 'down'){
        this.y += 85;
    }
};

// Reset player 
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

// Place all enemy objects in an array called allEnemies
// Define 3 enemies and insert them into an array
    var enemy = 3; // Declare number of enemies
    var allEnemies = [];
    for(i=0; i < enemy; i++){
        allEnemies.push(new Enemy()); // Add 3 enemy objects to array.
    }

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});