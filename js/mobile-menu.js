$(document).on('click', function(event) {
	if (event.toElement.getAttribute('id') == 'menu-button') {
		$('#menu-button').toggleClass('menu-open');
		$('#links li').toggleClass('show-menu');
	}
	else {
		if ($('.menu-open').length > 0) {
			$('#menu-button').removeClass('menu-open');
			$('#links li').removeClass('show-menu');
		}
	}
});