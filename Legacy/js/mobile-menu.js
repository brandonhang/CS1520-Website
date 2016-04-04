$(document).ready(function() {
	$(document).on('click', '#mobile-menu', function() {
		$('#mobile-menu').stop().toggleClass('menu-open');
		$('#mobile-menu').stop().toggleClass('menu-close');
		$('#menu-links li').stop().toggle(250);
	});
	
	$(document).on('click', '#menu-links li', function() {
		$('#mobile-menu').stop().toggleClass('menu-open');
		$('#mobile-menu').stop().toggleClass('menu-close');
		$('#menu-links li').stop().toggle(250);
	});
});