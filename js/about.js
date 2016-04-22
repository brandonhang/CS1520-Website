$(document).ready(function() {
	$(document).on('click', '#footer a', function(event) {
		event.preventDefault();
		
		if ($('#site-info').length > 0) {
			$('#site-info').show();
		}
		else {
			$.ajax({
				url: 'misc/site_info.txt',
				type: 'GET',
				dataType: 'text',
				success: function(about) {
					build_about(about);
				},
				error: function() {
					var about = "This site is awesome, but something broke so I can't show you the full credits&#8320";
					build_about(about);
				}
			});
		}
	});
	$(document).on('click', '#site-info', function() {
		$('#site-info').stop().hide();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#site-info').stop().hide();
		}
	});
});

function build_about(credits) {
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