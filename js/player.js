var PLAYER = function(ctx, block) {
    this.x = 0;
    this.y = 0;
    this.x_vel = 0;
    this.y_vel = 0;

    this.x_size = 20;
    this.y_size = 40;

    this.ctx = ctx;
    this.d = new Draw(this.ctx);

    this.block_size = block;
}

PLAYER.prototype.move = function(delta) {
    this.x += this.x_vel * delta * 60 / 1000;
    this.y += this.y_vel * delta * 60 / 1000;
}

PLAYER.prototype.draw = function() {
    this.d.rectangle(this.x, this.y, this.x_size, this.y_size, 'green');
}

PLAYER.prototype.set_size = function(x, y) {
    this.x_size = x * this.block_size;
    this.y_size = y * this.block_size;
}

PLAYER.prototype.set_pos = function(x, y) {
    this.x = x;
    this.y = y;
}

PLAYER.prototype.set_vel = function(x, y) {
    this.x_vel = x;
    this.y_vel = y
}