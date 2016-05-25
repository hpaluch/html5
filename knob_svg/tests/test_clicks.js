
// see http://stackoverflow.com/questions/23468626/casperjs-jenkins-when-a-test-fails-how-to-retrieve-all-information-on-this etc...
casper.test.on("fail",function(failure){
	var errorImage = 'error.png';
        casper.capture(errorImage);
	casper.echo("Screenshot saved to '"+errorImage+"'");
	casper.exit(1);
});

/*
// uncomment this if you want to see browser console.log output...
// see: http://stackoverflow.com/questions/11864373/console-log-doesnt-work-in-casperjs-evaluate-with-settimout
casper.on('remote.message', function(msg) {
    casper.echo('Remote CONSOLE: ' + msg);
})
*/


casper.test.begin('KnobSVG', 11, function suite(test) {

	casper.start('http://localhost/html5/knob_svg/',function(){

		test.assertEquals(this.getTitle(),'Knob using SVG');
		test.assertSelectorHasText('h1','Knob using HTML5 SVG');
	});

	casper.waitWhileVisible('#loading',function(){
		test.assertInvisible('#loading');
	});

	var text0 = 'Angle: 0.00 [rad], 0 [Deg]';

	casper.waitForText(text0,function(){
		test.assertSelectorHasText('#value1',text0);
	});

	// note these are initialized at begining...
	var xCenter = 150/2;
	var yCenter = 100/2;
	var angleStep = 45;
	var angleDeg = 0;

	casper.repeat(360/angleStep-1, function (){
		angleDeg = angleDeg + angleStep;
		var angle    = angleDeg * Math.PI / 180;
		var x = 42 * Math.cos( angle ) + xCenter;
		var y = -42 * Math.sin( angle ) + yCenter;
		// casper.echo("angleDeg: "+angleDeg+" angle: "+angle+" x:"+x+" y:"+y);
		casper.click('#svg1',x,y);

		casper.waitFor(function(){

			// this executes in browser
			return casper.evaluate( function( angleDeg,angle ){
				// our page includes jQuery, so...
				var value1 = $('#value1').text();
				// console.log("value1: "+value1);
				var items = value1.split(/\s+/);
				var gotRad = items[1];
				var gotDeg = items[3];
				// avoid some runding error (2 Deg, 0.02 rad)
				// console.log('degE: '+Math.abs( gotDeg - angleDeg )+" radE: "+Math.abs( gotRad - angle ));
				return  Math.abs( gotDeg - angleDeg ) < 4 
					&& Math.abs( gotRad - angle ) < 0.04;
			},angleDeg, angle);
		}, function then(){
			test.pass("Check for angle Deg = "+angleDeg);
		}); // casper.waitFor
	}); // casper.repeat

	casper.run(function() {
		test.done();
	});

}); // casper.test.begin()
