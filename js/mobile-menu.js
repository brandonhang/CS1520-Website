$(document).ready(function() {
	$(document).on('click', '#menu-button', function() {
		$(this).toggleClass('menu-open');
		$('#links li').toggleClass('show-menu');
	});
});
