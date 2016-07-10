$('.cars .play').one('click', function() {
	$.ajax({								// AJAX call to build the cars carousel
		url: 'js/cars.json',
		type: 'GET',
		dataType: 'JSON',
		beforeSend: function() {
			$('#wankel').show();
		},
		success: function(data) {
			$('.cars.slideshow').empty();
			$('.music-thumbs').show();
			$(data.cars).each(function(index, pic) {				// Car big images
				$('.cars').append('<div class="slide"><img class="lightbox-img" src="' + pic + '" href="' + pic + '"/></div>');
			});
			$(data.thumbs).each(function(index, thumb) {			// Car thumbnails
				$('.cars-thumbs').append('<div><img src="' + thumb + '"/></div>');
			});
			$(data.desc).each(function(index, blurb) {			// Slide descriptions
				$('.cars .slide').eq(index).append('<div></div>');
				$('.cars .slide:nth-of-type(' + (index + 1) + ') div').html(blurb);
			});
			$('.cars').slick({					// Initializes the main Slick carousel
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
			$('.cars-thumbs').slick({			// Initializes the thumbnail slider
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
		},
		complete: function() {
			$('#wankel').hide();
		}
	});
});
$('.music .play').one('click', function() {
	$.ajax({								// AJAX call to build the music carousel
		url: 'js/music.json',
		type: 'GET',
		dataType: 'JSON',
		beforeSend: function() {
			$('#wankel').show();
		},
		success: function(data) {
			$('.music.slideshow').empty();
			$(data.music).each(function(index, pic) {				// Big music images
				$('.music').append('<div class="slide"><img class="lightbox-img" src="' + pic + '" href="' + pic + '"/></div>');
			});
			$(data.thumbs).each(function(index, thumb) {			// Music thumbnails
				$('.music-thumbs').append('<div><img src="' + thumb + '"/></div>');
			});
			$(data.desc).each(function(index, blurb) {			// Slide descriptions
				$('.music .slide').eq(index).append('<div></div>');
				$('.music .slide:nth-of-type(' + (index + 1) + ') div').html(blurb);
			});
			$('.music').slick({					// Initializes the main music carousel
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
			$('.music-thumbs').slick({				// Initializes the thumbnail slider
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
		},
		complete: function() {
			$('#wankel').hide();
		}
	});
});
