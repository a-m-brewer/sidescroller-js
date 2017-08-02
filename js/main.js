const BLOCK_SIZE = 40;

var GAME = function() {
    this.now = 0;
    this.prev = this.timestamp();
    this.delta = 1000/60;

    this.canvas = document.getElementById("gamecanvas");
    this.context = this.canvas.getContext('2d');

    this.drawshape = new Draw(this.context);
    this.player = new PLAYER(this.context, BLOCK_SIZE);

    this.map = new MAP(this.canvas, BLOCK_SIZE, this.context);

    this.camera = new CAMERA(this.canvas, this.context, this.map);
}

GAME.prototype.move = function(dt) {
    this.player.move(dt);
    this.camera.follow(dt, this.player);
}

GAME.prototype.draw = function() {

    this.drawshape.rectangle(0,0,this.canvas.width,this.canvas.height);

    this.context.save();
    this.context.translate(-this.camera.pos.x, -this.camera.pos.y);

    this.map.drawgrid();

    this.player.draw();

    this.context.restore();
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
    g.player.set_vel(2, 0); 
    g.camera.set_speed(2, 0);
    g.map.blank_map();
    requestAnimationFrame(gameloop);
}

/*
    Glitches

    - tab away and char falls out of map
*/
