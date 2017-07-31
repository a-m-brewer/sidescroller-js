const BLOCK_SIZE = 20;

var GAME = function() {
    this.now = 0;
    this.prev = this.timestamp();
    this.delta = 1000/60;
    this.acc = 0;

    this.canvas = document.getElementById("gamecanvas");
    this.context = this.canvas.getContext('2d');
    this.drawshape = new Draw(this.context);

    this.x = 0;
    this.y = 0;
    this.speed_x = 2;
    this.speed_y = 2;
}

GAME.prototype.move = function(dt) {
    this.x += this.speed_x * dt * 60 / 1000;
    this.y += this.speed_y * dt * 60 / 1000;

    if (this.x < 0 || this.x >= this.canvas.width - BLOCK_SIZE) {this.speed_x *= -1};
    if (this.y < 0 || this.y >= this.canvas.height - BLOCK_SIZE) {this.speed_y *= -1};
}

GAME.prototype.draw = function() {
    this.drawshape.rectangle(0, 0, this.canvas.width, this.canvas.height, "red");
    this.drawshape.square(this.x, this.y, BLOCK_SIZE, 'green');
}

GAME.prototype.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// GAME START

var g = new GAME();

function gameloop() {
    requestAnimationFrame(gameloop);

    g.now = g.timestamp();
    g.delta = g.now - g.prev;
    g.prev = g.now;
    g.acc += g.delta;

    g.move(g.delta);
    g.draw();
}

window.onload = function() { 
    requestAnimationFrame(gameloop);
}
