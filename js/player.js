var PLAYER = function(ctx, block) {
    
    this.pos = {
        x: 0,
        y: 0
    }
    this.vel = {
        x: 0,
        y: 0
    }
    this.size = {
        x: 20,
        y: 40
    }

    this.control = {
        left: -1,
        right: -1,
        jump: -1,
        duck: -1,
        fire: -1
    }

    this.ctx = ctx;
    this.d = new Draw(this.ctx);

    this.block_size = block;
}

PLAYER.prototype.move = function(delta) {
    this.pos.x += this.vel.x * delta * 60 / 1000;
    this.pos.y += this.vel.y * delta * 60 / 1000;
}

PLAYER.prototype.draw = function() {
    this.d.rectangle(this.pos.x, this.pos.y, this.size.x, this.size.y, 'green');
}

PLAYER.prototype.set_size = function(x, y) {
    this.size.x = x * this.block_size;
    this.size.y = y * this.block_size;
}

PLAYER.prototype.set_pos = function(x, y) {
    this.pos.x = x;
    this.pos.y = y;
}

PLAYER.prototype.set_vel = function(x, y) {
    this.vel.x = x;
    this.vel.y = y
}

PLAYER.prototype.set_controls = function(l, r , j, d, f) {
    this.control.left = l;
    this.control.right = r;
    this.control.jump = j;
    this.control.duck = d;
    this.control.fire = f;
}