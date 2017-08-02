var MAP = function(canvas, block_size, context) {
    this.dim = {
        x: canvas.width * 4,
        y: canvas.height 
    }
    this.cr = {
        col: this.dim.x / block_size,
        row: this.dim.y / block_size
    }
    this.level = []
    this.l_len = this.cr.col * this.cr.row;

    this.b = {
        backdrop: new BLOCK(0, "Backdrop", '#545454', '#505050', block_size, block_size)
    }

    this.block_size = block_size;

    this.d = new Draw(context);
}

MAP.prototype.tile_coordinates_at_tile = function(col, row) {
    return {
        x: (this.block_size * col),
        y: (this.block_size * row)
    };
};

MAP.prototype.array_index_of_tile = function(col, row) {
    return col + this.cr.col * row;
};

MAP.prototype.blank_map = function() {
    for (var i = 0; i < this.l_len; i++) {
        this.level[i] = this.b.backdrop.id;
    }
}

MAP.prototype.drawgrid = function() {
    for (var row = 0; row < this.cr.row; row++) {
        for (var col = 0; col < this.cr.col; col++) {
            this.ccr = this.array_index_of_tile(col, row);
            this.ccord = this.tile_coordinates_at_tile(col, row);
            switch(this.level[this.ccr]) {
                case this.b.backdrop.id: 
                    this.d.square_with_border(this.ccord.x, this.ccord.y, this.block_size, 
                                                this.b.backdrop.fg, this.b.backdrop.bg, 2);
                    break;
            }
        }
    }    
}