const BLOCK_SIZE = 20;

var GAME = function() {
    this.now = 0;
    this.prev = this.timestamp();
    this.delta = 1000/60;

    this.canvas = document.getElementById("gamecanvas");
    this.context = this.canvas.getContext('2d');

    this.drawshape = new Draw(this.context);
    this.player = new PLAYER(this.context, BLOCK_SIZE);
}

GAME.prototype.move = function(dt) {
    this.player.move(dt);

    if (this.player.x <= 0 || this.player.x >= this.canvas.width - this.player.x_size) {this.player.x_vel *= -1};
    if (this.player.y <= 0 || this.player.y >= this.canvas.height - this.player.y_size) {this.player.y_vel *= -1};
}

GAME.prototype.draw = function() {
    this.drawshape.rectangle(0, 0, this.canvas.width, this.canvas.height, "red");
    this.player.draw();
}

GAME.prototype.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

GAME.prototype.update_time = function() {
    this.now = this.timestamp();
    this.delta = this.now - this.prev;
    this.prev = this.now; 
}

// GAME START

var g = new GAME();

function gameloop() {
    requestAnimationFrame(gameloop);

    g.update_time();
    g.move(g.delta);
    g.draw();
}

window.onload = function() {
    g.player.set_size(1,2);
    g.player.set_pos(90, 90);
    g.player.set_vel(2, 3); 
    requestAnimationFrame(gameloop);
}

/*
    Glitches

    - tab away and char falls out of map
*/
