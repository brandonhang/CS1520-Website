function changeStyle(window_width) {
	$width = parseInt(window_width);
	if ($width > 999) {
		$("#css").attr("href", "style/bhang-wide.css");
		resetMenu();
	}
	else if ($width < 721) {
		$("#css").attr("href", "style/bhang-narrow.css");
		if ($('.menu-open').length === 0) {
			var $menu =
				"<div id='mobile-menu' class='menu-open'></div>";
			$('body').append($menu);
		}
		if ($('#narrow-menu').length === 0) {
			var $mobile = "<script id='narrow-menu' src='js/mobile-menu.js'></script>";
			$('body').append($mobile);
		}
		$('#mobile-menu').stop().show();
		$('#menu-links li').stop().hide();
	}
	else {
		$("#css").attr("href", "style/bhang-medium.css");
		resetMenu();
	}
};

function resetMenu() {
	if ($('.menu-close').length > 0) {
		$('#mobile-menu').stop().toggleClass('menu-open');
		$('#mobile-menu').stop().toggleClass('menu-close');
	}
	$('#mobile-menu').stop().hide;
	$('#mobile-menu').stop().hide;
	$('#menu-links li').stop().show();
};

$(function() {
	changeStyle($(this).width());
	$(window).resize(function() {
		changeStyle($(this).width());
	});
});