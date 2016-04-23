$(document).ready(function() {
	$(document).on('click', '.lightbox-img', function(event) {
		event.preventDefault();
		var img = $(this).attr("href");
		if ($('#lightbox').length > 0) {
			$('#big-image').html('<img src="' + img + '"/>');			// Changes the image if the lightbox exists
		}
		else {
			var lightbox = 
				'<div id="lightbox" class="underlay-dim">' +			// Otherwise, builds a new lightbox
					'<p>Click to close</p>' +
					'<div id="big-image">' +
						'<img src="' + img + '"/>' +
					'</div>' +
				'</div>';
			$('body').append(lightbox);
		}
		$('#lightbox').stop().show();
	});
	$(document).on('click', '#lightbox', function() {			// Hides on click
		$('#lightbox').stop().hide();
	});
	$(document).keyup(function(e) {					// Hides on ESC button press
		if (e.keyCode == 27) {
			$('#lightbox').stop().hide();
		}
	});
});