$(document).ready(function() {
	$(document).on('click', '#menu-links a', function() {
		var $section = $(this);
		$('html, body').stop().animate({
			scrollTop: $($section.attr('href')).offset().top
		}, 1608, 'easeInOutQuint');
		event.preventDefault();
	});
});