"use strict";

function init() {
};

var Animation = Homey.manager('ledring').Animation;

//-------------------White Sleep Animation Start ---------------------------------------------------
var frames_white_sleep = [];
var frame_white_sleep = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel < 1) {
		frame_white_sleep.push({
			r: 255,	g: 255,	b: 255
		});
	} else {
		frame_white_sleep.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_white_sleep.push(frame_white_sleep);

var animation_white_sleep = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 16,	// rotations per minute
    },
    frames    : frames_white_sleep
})

animation_white_sleep.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('white_sleep', animation_white_sleep)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------White Sleep Animation Stop ---------------------------------------------------
//-------------------White Slow Sleep Animation Start ---------------------------------------------------
var frames_white_slow_sleep = [];
var frame_white_slow_sleep = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel < 1) {
		frame_white_slow_sleep.push({
			r: 255,	g: 255,	b: 255
		});
	} else {
		frame_white_slow_sleep.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_white_slow_sleep.push(frame_white_slow_sleep);

var animation_white_slow_sleep = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 1,	// rotations per minute
    },
    frames    : frames_white_slow_sleep
})

animation_white_slow_sleep.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('white_slow_sleep', animation_white_slow_sleep)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------White Slow Sleep Animation Stop ---------------------------------------------------
//-------------------TIFF Animation Start ---------------------------------------------------
var frames_TIFF = [];
var frame_TIFF = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel == 8) {
		frame_TIFF.push({
			r: 255,	g: 0,	b: 0
		});
	} else if( pixel < 8 ) {
		if ( pixel > 4 ) {
			frame_TIFF.push({
				r: 255/4*(pixel-4),	g: 0,	b: 0
			});
		}
		else {
			frame_TIFF.push({
				r: 0, g: 0, b: 0
			});
		}
	} else if( pixel > 8 ) {
		if ( pixel < 12) {
			frame_TIFF.push({
				r: 255/4*(12-pixel), g: 0,	b: 0
			});
		}
		else {
			frame_TIFF.push({
				r: 0, g: 0, b: 0
			});
		}
	} else {
		frame_TIFF.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_TIFF.push(frame_TIFF);

var animation_TIFF = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 20,	// rotations per minute
    },
    frames    : frames_TIFF
})

animation_TIFF.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('TIFF', animation_TIFF)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------TIFF Animation Stop ---------------------------------------------------
//-------------------Faint Rainbow Start ---------------------------------------------------
var frames_faint_rainbow = [];
var frame_faint_rainbow = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {

    var hue = (pixel/(24)) * 360;
    var color = hsvToRgbLow( hue, 100, 100 )

    frame_faint_rainbow.push({
        r: color[0], // 0 - 255
        g: color[1], // 0 - 255
        b: color[2]  // 0 - 255
    });
}

function hsvToRgbLow(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [Math.round(r * 25), Math.round(g * 25), Math.round(b * 25)];
}

frames_faint_rainbow.push(frame_faint_rainbow);

var animation_faint_rainbow = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 12,	// rotations per minute
    },
    frames    : frames_faint_rainbow
})

animation_faint_rainbow.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('faint_rainbow', animation_faint_rainbow)
	if( err ) return Homey.error(err);
	animation_white_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_white_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------Faint Rainbow Animation Stop ---------------------------------------------------

//-------------------red Sleep Animation Start ---------------------------------------------------
var frames_red_sleep = [];
var frame_red_sleep = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel < 1) {
		frame_red_sleep.push({
			r: 25,	g: 0,	b: 0
		});
	} else {
		frame_red_sleep.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_red_sleep.push(frame_red_sleep);

var animation_red_sleep = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 16,	// rotations per minute
    },
    frames    : frames_red_sleep
})

animation_red_sleep.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('red_sleep', animation_red_sleep)
	if( err ) return Homey.error(err);
	animation_red_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_red_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------red Sleep Animation Stop ---------------------------------------------------
//-------------------red Slow Sleep Animation Start ---------------------------------------------------
var frames_red_slow_sleep = [];
var frame_red_slow_sleep = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {
	if( pixel < 1) {
		frame_red_slow_sleep.push({
			r: 25,	g: 0,	b: 0
		});
	} else {
		frame_red_slow_sleep.push({
			r: 0, g: 0, b: 0
		})
	}
}
frames_red_slow_sleep.push(frame_red_slow_sleep);

var animation_red_slow_sleep = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 1,	// rotations per minute
    },
    frames    : frames_red_slow_sleep
})

animation_red_slow_sleep.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('red_slow_sleep', animation_red_slow_sleep)
	if( err ) return Homey.error(err);
	animation_red_sleep.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_red_sleep.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------red Slow Sleep Animation Stop ---------------------------------------------------
//------------------- Raining Animation Start ---------------------------------------------------
var frames_raining = [];
var frame_raining = [];
var randomNumbers = [];

// for every pixel...
for (var pixel = 0; pixel < 24; pixel++) {
    for (var i = 0; i < 8; i++) {
        randomNumbers[i] = randomPixel(0,23);
    }
	if (isInArray(pixel, randomNumbers)) {
		frame_raining.push({
			r: 0, g: 0,	b: 255
		});
    } else {
		frame_raining.push({
			r: 0, g: 0, b: 0
		})
	}
}

function randomPixel (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

frames_raining.push(frame_raining);

var animation_raining = new Animation({
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 12, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 24,	// rotations per minute
    },
    frames    : frames_raining
})

animation_raining.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('raining', animation_raining)
	if( err ) return Homey.error(err);
	animation_raining.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_raining.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//------------------- Rain Animation Stop ---------------------------------------------------
//-------------------Full White Animation Start ---------------------------------------------------
var frames_full_white = [];
var frame_full_white = [];

// for every pixel...
for( var pixel = 0; pixel < 24; pixel++ ) {	
		{
		frame_full_white.push({
			r: 10, g: 10, b: 10
		})
	}
}
frames_full_white.push(frame_full_white);

var animation_full_white = new Animation({
	
    options: {
        fps     : 1, 	// real frames per second
        tfps    : 60, 	// target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 0,	// rotations per minute
    },
    frames    : frames_full_white
})

animation_full_white.register(function(err, result){
	Homey.manager('ledring').registerScreensaver('full_white', animation_full_white)
	if( err ) return Homey.error(err);
	animation_full_white.on('screensaver_start', function( screensaver_id ){
		Homey.log('Screensaver started')
	})
	animation_full_white.on('screensaver_stop', function( screensaver_id ){
		Homey.log('Screensaver stopped')
	})
})
//-------------------Full White Animation Stop ---------------------------------------------------