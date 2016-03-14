$(document).ready(function() {
	$(document).on('click', '.lightbox-img', function() {
		event.preventDefault();
		var $img = $(this).attr("href");
		if ($('#lightbox').length > 0) {
			$('#big-image').html('<img src="' + $img + '"/>');
		}
		else {
			var $lightbox = 
				'<div id="lightbox" class="underlay-dim">' +
					'<p>Click to close</p>' +
					'<div id="big-image">' +
						'<img src="' + $img + '"/>' +
					'</div>' +
				'</div>';
			$('body').append($lightbox);
		}
		$('#lightbox').stop().show();
	});
	$(document).on('click', '#lightbox', function() {
		$('#lightbox').stop().hide();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#lightbox').stop().hide();
		}
	});
});