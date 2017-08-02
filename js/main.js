const BLOCK_SIZE = 20;

var GAME = function() {
    this.now = 0;
    this.prev = this.timestamp();
    this.delta = 1000/60;

    this.canvas = document.getElementById("gamecanvas");
    this.context = this.canvas.getContext('2d');

    this.drawshape = new Draw(this.context);
    this.player = new PLAYER(this.context, BLOCK_SIZE);

    this.camera_speed = {
        x: 2,
        y: 3
    }

    this.offset_x = 0;
    this.offset_y = 0;

    this.camera = {
        x: 0.0,
        y: 0.0
    }

    this.max_dist_from_cen = {
        x: this.canvas.width / 8,
        y: this.canvas.height / 8
    }

    this.map = {
        width: this.canvas.width * 4,
        height: this.canvas.height * 4
    }

}

GAME.prototype.move = function(dt) {
    this.player.move(dt);
    this.camera_follow(dt);
    if (this.player.x <= 0 || this.player.x >= this.map.width - this.player.x_size) {this.player.x_vel *= -1};
    if (this.player.y <= 0 || this.player.y >= this.map.height- this.player.y_size) {this.player.y_vel *= -1};
}

GAME.prototype.draw = function() {
    this.drawshape.rectangle(0,0,this.canvas.width,this.canvas.height);

    this.context.save();
    this.context.translate(-this.camera.x, -this.camera.y);

    this.drawshape.rectangle(0, 0, this.map.width, this.map.height, "red");

    this.player.draw();

    this.context.restore();
}

GAME.prototype.camera_follow = function(delta) {
    //this.camera.x = this.player.x - this.canvas.width / 2;
    //this.camera.y = this.player.y - this.canvas.height / 2;
    
    this.camera_cen = {
        x: this.camera.x + this.canvas.width/2,
        y: this.camera.y + this.canvas.height/2
    }

    this.player_dist_from_center = {
        x: Math.abs(this.player.x - this.camera_cen.x),
        y: Math.abs(this.player.y - this.camera_cen.y)
    }

    if (this.player_dist_from_center.x > this.max_dist_from_cen.x) {
        if (this.camera_cen.x < this.player.x) {
            this.camera.x += this.camera_speed.x * delta * 60 / 1000;
        } else {
            this.camera.x -= this.camera_speed.x * delta * 60 / 1000;
        }
    }

    if (this.player_dist_from_center.y > this.max_dist_from_cen.y) {
        if (this.camera_cen.y < this.player.y) {
            this.camera.y += this.camera_speed.y * delta * 60 / 1000;
        } else {
            this.camera.y -= this.camera_speed.y * delta * 60 / 1000;
        }
    }
    
    if (this.camera.x < 0) {
        this.camera.x = 0;
    }
    if (this.camera.y < 0) {
        this.camera.y = 0;
    }
    this.past_viewpoint = {
        x: this.map.width - this.canvas.width, 
        y: this.map.height - this.canvas.height
    }
    if (this.camera.x > this.past_viewpoint.x) {
        this.camera.x = this.past_viewpoint.x;
    }
    if (this.camera.y > this.past_viewpoint.y) {
        this.camera.y = this.past_viewpoint.y;
    }
    
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
