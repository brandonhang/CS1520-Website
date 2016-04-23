$(document).ready(function() {
	$.ajax({
		url: 'js/cars.json',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			$(data.cars).each(function(index, pic) {
				$('.cars').append('<div class="slide"><img class="lightbox-img" src="' + pic + '" href="' + pic + '"/></div>');
			});
			$(data.thumbs).each(function(index, thumb) {
				$('.cars-thumbs').append('<div><img src="' + thumb + '"/></div>');
			});
			$(data.desc).each(function(index, blurb) {
				$('.cars .slide').eq(index).append('<div></div>');
				$('.cars .slide:nth-of-type(' + (index + 1) + ') div').html(blurb);
			});
			$('.cars').slick({
				infinite: true,
				speed: 500,
				fade: true,
				lazyLoad: 'ondemand',
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				asNavFor: '.cars-thumbs',
				nextArrow: '<img class="slick-next" src="img/icons/nav_right_64px.png"/>',
				prevArrow: '<img class="slick-prev" src="img/icons/nav_left_64px.png"/>'
			});
			$('.cars-thumbs').slick({
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 1,
				asNavFor: '.cars',
				arrows: false,
				centerMode: true,
				focusOnSelect: true,
				responsive: [
					{
						breakpoint: 1250,
						settings: {
							slidesToShow: 6
						}
					},
					{
						breakpoint: 1058,
						settings: {
							slidesToShow: 5
						}
					},
					{
						breakpoint: 800,
						settings: {
							slidesToShow: 4
						}
					}
				]
			});
		}
	});
	$.ajax({
		url: 'js/music.json',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			$(data.music).each(function(index, pic) {
				$('.music').append('<div class="slide"><img class="lightbox-img" src="' + pic + '" href="' + pic + '"/></div>');
			});
			$(data.thumbs).each(function(index, thumb) {
				$('.music-thumbs').append('<div><img src="' + thumb + '"/></div>');
			});
			$(data.desc).each(function(index, blurb) {
				$('.music .slide').eq(index).append('<div></div>');
				$('.music .slide:nth-of-type(' + (index + 1) + ') div').html(blurb);
			});
			$('.music').slick({
				infinite: true,
				speed: 500,
				fade: true,
				lazyLoad: 'ondemand',
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				asNavFor: '.music-thumbs',
				nextArrow: '<img class="slick-next" src="img/icons/nav_right_64px.png"/>',
				prevArrow: '<img class="slick-prev" src="img/icons/nav_left_64px.png"/>'
			});
			$('.music-thumbs').slick({
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 1,
				asNavFor: '.music',
				arrows: false,
				centerMode: true,
				focusOnSelect: true,
				responsive: [
					{
						breakpoint: 1250,
						settings: {
							slidesToShow: 6
						}
					},
					{
						breakpoint: 1058,
						settings: {
							slidesToShow: 5
						}
					},
					{
						breakpoint: 800,
						settings: {
							slidesToShow: 4
						}
					}
				]
			});
		}
	});
});
