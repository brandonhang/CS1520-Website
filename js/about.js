$(document).ready(function() {
	$(document).on('click', '#footer a', function() {
		event.preventDefault();
		
		if ($('#site-info').length > 0) {
			$('#site-info').show();
		}
		else {
			var $info =
				'<div id="site-info" class="underlay-dim">' +
					'<p>Click to close</p>' +
					'<div id="info-text">' +
						'<h1>About</h1>' +
						'<p>' +
							'This website was made as the primary project for the University of ' +
							'Pittsburgh course CS 1520, <i>Programming Languages for Web ' +
							'Applications.</i>  Unless otherwise noted below, all assets were ' +
							'created by me.' +
						'</p>' +
						'<p>' +
							'The flying kick and jazz combo photographs were taken by Shana Fowler ' +
							'Crouse.' +
						'</p>' +
						'<p>The solo trombone photograph was taken by Lucas Felak.</p>' +
						'<p>' +
							'All other photographs that I appear in were taken by a member of my ' +
							'awesome family.' +
						'</p>' +
						'<p>' +
							'Icons were taken from the <b>Material Icons</b> set by Google Design and ' +
							'used under the CC-BY License.' +
						'</p>' +
						'<p>' +
							'The <b>Montserrat</b> font family was created by Julieta Ulanovsky and ' +
							'used under the SIL Open Font License.' +
						'</p>' +
						'<p>' +
							'The <b>Sorts Mill Goudy</b> and <b>Linden Hill</b> font families were ' +
							'created by Barry Schwartz and used under the SIL Open Font License.' +
						'</p>' +
						'<p>' +
							'The <b>jQuery Easing Plugin</b> was created by George McGinley Smith using ' +
							'equations by Robert Penner.  Both are used under the BSD license.' +
						'</p>' +
						'<p>Special thanks to Matt Bowytz for teaching the course.</p>' +
					'</div>' +
				'</div>';
			$('body').append($info);
			$('#site-info').stop().show();
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