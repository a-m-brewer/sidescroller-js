var Draw = function(context) {
	this.context = context;
}

Draw.prototype.bitmap_center_rotation = function(bitmap, x, y, angle) {
	this.context.save();
	this.context.translate(atX, atY);
	this.context.rotate(withAng);
	this.context.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	this.context.restore();		
}

Draw.prototype.rectangle = function(top_left, top_right, width, height, colour) {
	this.context.fillStyle = colour;
	this.context.fillRect(top_left, top_right, width, height);
}

Draw.prototype.rectangle_with_border = function(top_left, top_right, width, height, main_colour, border_color, border_width) {
	this.context.fillStyle = border_color;
	this.context.fillRect(top_left, top_right, width, height);
	this.context.fillStyle = main_colour;
	this.context.fillRect(top_left - border_width, top_right - border_width, width - (border_width*2), height - (border_width*2));
}

Draw.prototype.square = function(top_left, top_right, size, colour) {
	this.context.fillStyle = colour;
	this.context.fillRect(top_left, top_right, size, size);
}

Draw.prototype.square_with_border = function(top_left, top_right, size, main_colour, border_color, border_width) {
	this.context.fillStyle = border_color;
	this.context.fillRect(top_left, top_right, size, size);
	this.context.fillStyle = main_colour;
	this.context.fillRect(top_left - border_width, top_right - border_width, size - (border_width*2), size - (border_width*2));
}

Draw.prototype.circle = function(center_x, center_y, radius, colour) {
	this.context.fillStyle = colour;
	this.context.beginPath();
	this.context.arc(center_x, center_y, 10, 0, Math.PI*2, true);
	this.fill();
}

Draw.prototype.show_text = function(text_x, text_y, text_content, colour) {
	this.context.fillStyle = colour;
	this.context.fillText(text_content, text_x, text_y);
}