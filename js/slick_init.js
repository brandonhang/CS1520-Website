(function($) {
	var specs, engineDispl, enginePow;
	var carIndex = 0;

	$.ajax({
		url: 'js/specs.json',
		type: 'GET',
		dataType: 'JSON',
		success: function(jData) {
			specs = jData;
			var car = specs[carIndex];
			var carName = formatCar(car.year, car.make, car.model);
			var engine = formatEngine(car.engine, car.cylinders);
			
			$.each(specs, function(index, vroom) {
				$('.car-img').append('<div><a target="_blank" href="' + vroom.link + '"><img data-lazy="' + vroom.image + '"/></a></div>');
				$('.car-thumbs').append('<div><img src="' + vroom.thumb + '"/></div>');
			});
			$('.car-img div').eq(14).after('<div><img class="lightbox-img" data-lazy="img/cars/201407261039_c.jpg" ' +
				'href="img/cars/201407261039_h.jpg"/></div>');
			$('.car-thumbs div').eq(14).after('<div><img src="img/cars/201407261039_q.jpg"/></div>');
			
			specs.splice(15, 0, {
				"year": 2003,
				"make": "Saleen",
				"model": "S7",
				"engine": "V",
				"cylinders": 8,
				"induction": "Naturally Aspirated",
				"displacement": 7008,
				"horsepower": 550,
				"torque": 525,
				"description": '<p>This is a 2003 Saleen S7.  A favorite supercar of my younger brother, this particular Saleen ' +
					'boasts a naturally-aspirated 7.0L V8 that can rocket the car to 60 miles per hour in 3.3 seconds and to 100 in 7.1 seconds!  ' +
					'Personally signed by Steve Saleen, this supercar represents just 1 of the 40 naturally-aspirated versions ever produced.</p><p>Photo credit: Byron</p>'
			});
			
			$('.car-title').append('<h4>' + carName + '</h4>');
			$('.car-asp').append('<img src="img/logo/' + car.induction + '.png"/>')
				.append('<h6>' + car.induction + '</h6>');
			$('.car-engine').append('<img src="img/logo/' + engine + '.png"/>')
				.append('<h6>' + engine + '</h6>');
			$('.car-desc').append(car.description);
			
			engineDispl = c3.generate({
				bindto: '#displ-chart',
				size: {
					width: 200,
					height: 120
				},
				padding: {
					top: 5, right: 5, bottom: 5, left: 5
				},
				data: {
					columns: [
						['Displacement', 0]
					],
					type: 'gauge'
				},
				gauge: {
					label: {
						format: function(value, ratio) {
							return value + " cm³";
						}
					},
					min: 0,
					max: 12000,
					width: 30,
				},
				tooltip: {
					show: false
				}
			});
			enginePow = c3.generate({
				bindto: '#power-chart',
				size: {
					width: 200,
					height: 120
				},
				padding: {
					top: 5, right: 10, bottom: 5, left: 5
				},
				data: {
					columns: [
						['Horsepower', 0],
						['Torque (lb-ft)', 0]
					],
					type: 'bar'
				},
				axis: {
					rotated: true,
					x: {
						show: false,
						label: ''
					},
					y: {
						min: 0,
						max: 850,
						padding: {
							top: 0,
							bottom: 0
						}
					}
				},
				tooltip: {
					format: {
						title: function(x) {
							return '';
						}
					}
				},
				bar: {
					width: 25
				}
			});
			setTimeout(function() {
				engineDispl.load({
					columns: [
						['Displacement', car.displacement]
					]
				});
				enginePow.load({
					columns: [
						['Horsepower', car.horsepower],
						['Torque (lb-ft)', car.torque]
					]
				});
			}, 250);
			
			$('.car-img').slick({
				infinite: true,
				speed: 500,
				fade: true,
				lazyLoad: 'ondemand',
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				asNavFor: '.car-thumbs',
				nextArrow: '<img class="slick-next" src="img/icons/nav_right_64px.png"/>',
				prevArrow: '<img class="slick-prev" src="img/icons/nav_left_64px.png"/>',
				accessibility: false
			});
			$('.car-thumbs').slick({
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 1,
				asNavFor: '.car-img',
				arrows: false,
				centerMode: true,
				focusOnSelect: true,
				draggable: false,
				accessibility: false,
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
	
	$(document).on('click', '.car-img .slick-next, .car-img .slick-prev', function() {
		var index = $('.car-img .slick-current').attr("data-slick-index");
		changeCar(parseInt(index, 10));
	});
	
	$(document).on('click', '.car-thumbs div', function() {
		var index = $('.car-thumbs .slick-current').attr("data-slick-index");
		console.log(index);
		changeCar(parseInt(index, 10));
	});
	
	$(document).on('swipe', '.car-img', function() {
		var index = $('.car-img .slick-current').attr("data-slick-index");
		changeCar(parseInt(index, 10));
	});

	function changeCar(index) {
		var car = specs[index];
		var carName = formatCar(car.year, car.make, car.model);
		var engine = formatEngine(car.engine, car.cylinders);
		
		$('.car-title h4').text(carName);
		$('.car-asp img').attr("src", "img/logo/" + car.induction + ".png");
		$('.car-asp h6').text(car.induction);
		$('.car-engine img').attr("src", "img/logo/" + engine + ".png");
		$('.car-engine h6').text(engine);
		$('.car-desc').html(car.description);
		
		engineDispl.load({
			columns: [
				['Displacement', car.displacement]
			]
		});
		enginePow.load({
			columns: [
				['Horsepower', car.horsepower],
				['Torque (lb-ft)', car.torque]
			]
		});
	}

	$.ajax({								// AJAX call to build the music carousel
		url: 'js/music.json',
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			$('.music.slideshow').empty();
			$(data.music).each(function(index, pic) {				// Big music images
				$('.music').append('<div class="slide"><img class="lightbox-img" data-lazy="' + pic + '" href="' + pic + '"/></div>');
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
				prevArrow: '<img class="slick-prev" src="img/icons/nav_left_64px.png"/>',
				accessibility: false
			});
			$('.music-thumbs').slick({				// Initializes the thumbnail slider
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 1,
				asNavFor: '.music',
				arrows: false,
				centerMode: true,
				focusOnSelect: true,
				draggable: false,
				accessibility: false,
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

	function formatCar(year, make, model) {
		return (year == undefined || year == "") ? (make + " " + model) : (year + " " + make + " " + model);
	}

	function formatEngine(arrangement, cylinders) {
		return (cylinders == undefined || cylinders == "") ? (arrangement) : (arrangement + cylinders);
	}
})(jQuery);