(function($) {
	$('#lightbulb').on('click', function() {			// Activate secret mode...
		$('#contact').toggleClass('lights');
	});
})(jQuery);				// I used an IIFE here to try things out