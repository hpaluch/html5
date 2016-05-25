
// see http://stackoverflow.com/questions/23468626/casperjs-jenkins-when-a-test-fails-how-to-retrieve-all-information-on-this etc...
casper.test.on("fail",function(failure){
	var errorImage = 'error.png';
        casper.capture(errorImage);
	casper.echo("Screenshot saved to '"+errorImage+"'");
	casper.exit(1);
});

casper.test.begin('KnobSVG', 4, function suite(test) {

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

	casper.run(function() {
		test.done();
	});

}); // casper.test.begin()
