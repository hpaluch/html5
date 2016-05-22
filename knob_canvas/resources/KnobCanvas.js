/*
 * KnobCanvas.js - active knob control using HTML5 Canvas
 */

"use strict";


var KnobCanvas = function KnobCanvas($Element,angle){
	if ( typeof jQuery === 'undefined' ){
		throw new Error("jQuery object undefined - probably jquery.min.sjs not included?");
	}
	if (!( $Element instanceof jQuery )){
		throw new Error("Passed Element is not instanceof jQuery ");
	}
if (!( $Element.prop('getContext'))){
		throw new Error("Passed Element has not property getContext (not Canvas?) ");
	}
	this.$Element = $Element;
	// compute inside box of width (minimum)
	this.box = Math.min( $Element.prop('width'), $Element.prop('height'));
	// atempt to be ready for non-box rectangle
	this.width = this.box;
	this.height = this.box;
	this.xCenter = this.width/2;
	this.yCenter = this.height/2;
	this.knobRadius = 0.40*this.box; // radius is half box :-)
                                         // minus small amount for margins
	this.angle =  angle; // angle of knob in radians
};

// static (non-instance methods)
KnobCanvas.fnNormalizeAngle = function (angle){
	var timesOverflow = Math.abs(Math.floor( angle / 2 / Math.PI ));
	if ( timesOverflow >= 1 ){
		angle = angle - timesOverflow * 2 * Math.PI;
	}
	// revert angle if negative
	if ( angle < 0.00 ){
		angle = 2 * Math.PI + angle;
	}
	return angle;
};

// getter and setters
KnobCanvas.prototype = {
	get angle(){
		  return this._angle;
	 },
	set angle(__angle){
		this._angle = KnobCanvas.fnNormalizeAngle( __angle );
	}
}

// instance methods
KnobCanvas.prototype.show = function(){
	// draw rectangle of future border frame (black)
	this.$Element.drawRect({
	  fromCenter: false, // WTF...
	  fillStyle: '#000',
	  x: 0, y: 0,
	  width: this.width,
	  height: this.height
	});
	// draw inside of border (white)
	this.$Element.drawRect({
	  fromCenter: false, // WTF...
	  fillStyle: '#fff',
	  x: 1, y: 1,
	  width:  this.width-2,
	  height: this.height-2 
	});	

	// draw  knob circle
	this.$Element.drawArc({
	  strokeStyle: '#000',
	  fillStyle: '#ddd',
	  strokeWidth: 2,
	  x: this.xCenter, y: this.yCenter,
	  radius: this.knobRadius,
	  closed: true
	});

	// knob mark
        // FIXME: compute coeficient 0.80 with current box...
	var  markX = 0.70*this.knobRadius * Math.cos( this._angle ) + this.xCenter;
	var  markY = -0.70*this.knobRadius * Math.sin( this._angle ) + this.xCenter;

	// draw  knob mark
	this.$Element.drawArc({
	  strokeStyle: '#f00',
	  fillStyle: '#f00',
	  strokeWidth: 2,
	  x: markX, y: markY,
	  radius: 4,
	  closed: true
	});



	console.log("show");
};



