(function($) {
	$('.project').flip({
		trigger: 'manual'
	});
	
	$(document).on('click', '.project', function() {
		$(this).flip('toggle');
	});
})(jQuery);