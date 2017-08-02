var CAMERA = function(canvas, context, map) {

    this.canvas = canvas;
    this.context = context;
    this.map = map;

    this.speed = {
        x: 0,
        y: 0
    }

    this.pos = {
        x: 0.0,
        y: 0.0
    }

    this.max_dist_from_cen = {
        x: this.canvas.width / 8,
        y: this.canvas.height / 8
    }
}

CAMERA.prototype.follow = function(delta, p) {

    this.camera_cen = {
        x: this.pos.x + this.canvas.width/2,
        y: this.pos.y + this.canvas.height/2
    }

    this.player_dist_from_center = {
        x: Math.abs(p.pos.x - this.camera_cen.x),
        y: Math.abs(p.pos.y - this.camera_cen.y)
    }

    if (this.player_dist_from_center.x > this.max_dist_from_cen.x) {
        if (this.camera_cen.x < p.pos.x) {
            this.pos.x += this.speed.x * delta * 60 / 1000;
        } else {
            this.pos.x -= this.speed.x * delta * 60 / 1000;
        }
    }

    if (this.player_dist_from_center.y > this.max_dist_from_cen.y) {
        if (this.camera_cen.y < p.pos.y) {
            this.pos.y += this.speed.y * delta * 60 / 1000;
        } else {
            this.pos.y -= this.speed.y * delta * 60 / 1000;
        }
    }
    
    if (this.pos.x < 0) {
        this.pos.x = 0;
    }
    if (this.pos.y < 0) {
        this.pos.y = 0;
    }
    this.past_viewpoint = {
        x: this.map.dim.x - this.canvas.width, 
        y: this.map.dim.y - this.canvas.height
    }
    if (this.pos.x > this.past_viewpoint.x) {
        this.pos.x = this.past_viewpoint.x;
    }
    if (this.pos.y > this.past_viewpoint.y) {
        this.pos.y = this.past_viewpoint.y;
    }
    
}

CAMERA.prototype.set_speed = function(x, y) {
    this.speed.x = x;
    this.speed.y = y;
}