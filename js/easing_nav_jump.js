$(document).ready(function() {
	$(document).on('click', '.nav-container a', function(event) {
		var section = $(this);
		$('html, body').stop().animate({
			scrollTop: $(section.attr('href')).offset().top
		}, 1608, 'easeInOutQuint');
		event.preventDefault();
	});
	
	$(window).scroll(function() {
		if ($('.nav-container').offset().top > 50) {
			$('.blue-menu').fadeIn("slow");
		}
		else {
			$('.blue-menu').fadeOut("slow");
		}
	});
});