$(document).ready(function() {
	$(document).on('click', '#menu-button', function() {			// Toggles a class to open and close the menu
		$(this).toggleClass('menu-open');
		$('#links li').toggleClass('show-menu');
	});
});
