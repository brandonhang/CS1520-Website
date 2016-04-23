$(document).ready(function() {
	$(document).on('click', '#footer a:last-of-type', function(event) {
		if ($('#site-info').length > 0) {
			$('#site-info').show();						// Shows the site info if it exists
		}
		else {
			$.ajax({										// Otherwise, makes an AJAX call to build the site information
				url: 'misc/site_info.txt',
				type: 'GET',
				dataType: 'text',
				success: function(about) {
					build_about(about);
				},
				error: function() {							// Error message if the file could not be read
					var about = "<p>This site is awesome, but something broke so I can't show you the full credits&#8320</p>";
					build_about(about);
				}
			});
		}
	});
	$(document).on('click', '#site-info', function() {				// Hides the site info when clicking anywhere
		$('#site-info').stop().hide();
	});
	$(document).keyup(function(e) {					// Hides the site info when ESC is pressed
		if (e.keyCode == 27) {
			$('#site-info').stop().hide();
		}
	});
});

function build_about(credits) {					// Builds the site info using whatever parameter is passed
	var info =
		'<div id="site-info" class="underlay-dim">' +
			'<p>Click to close</p>' +
			'<div>' +
				'<h1>About</h1>' +
			'</div>' +
		'</div>';
	$('body').append(info);
	$('#site-info h1').append(credits);
	$('#site-info').stop().show();
}