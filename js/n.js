(function($) {
	$(window).konami();
	$(window).on('konami', function() {			// Shows the game when the Konami code is entered
		if ($('#n').is(':hidden')) {
			$('#n').append('<embed width="700" height="530"' +
					'type="application/x-shockwave-flash"' +
					'src="misc/ngame.swf"' +
					'name="ngame" id="ngame"' +
					'style="border:0"/>'
			).delay(250).fadeIn("slow");
		}
	});
	
	$(document).on('click', '#n img', function() {		// Removes the game from the DOM when closed
		if ($('#n').is(':visible')) {
			$('#n').fadeOut("fast");
			$('#n iframe').remove();
		}
	});
})(jQuery);
