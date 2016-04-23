$(document).ready(function() {
	$(document).on('click', '.nav-container a', function(event) {			// Jumps to the section when the link is clicked
		var section = $(this);
		$('html, body').stop().animate({
			scrollTop: $(section.attr('href')).offset().top
		}, 1608, 'easeInOutQuint');
		event.preventDefault();
	});
	
	$(window).scroll(function() {									// Adds a blue background to the nav bar after 50 pixels are scrolled
		if ($('.nav-container').offset().top > 50) {
			$('.blue-menu').fadeIn("slow");
		}
		else {
			$('.blue-menu').fadeOut("slow");
		}
	});
});