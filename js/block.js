var BLOCK = function(id, name, fg, bg, sizex, sizey) {
    this.id = id;
    this.name = name;
    this.fg = fg;
    this.bg = bg;
    this.size = {
        x: sizex,
        y: sizey
    }
}

BLOCK.prototype.set_id = function(id) {
    this.id = id;
}

BLOCK.prototype.set_name = function(name) {
    this.name = name;
}

BLOCK.prototype.set_colours = function(fg, bg) {
    this.fg =fg;
    this.bg = bg;
}

BLOCK.prototype.set_size = function(x, y) {
    this.size.x = x;
    this.size.y = y;
}

