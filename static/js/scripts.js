$(window).load(function() {
	
	var user_agent = navigator.userAgent.toLowerCase(); // detect the user agent
	var ios_devices = user_agent.match(/(iphone|ipod|ipad)/)  ? "touchstart" : "click"; //check if the devices are ios devices
	
	// init
	$('.home').height($(window).height());
	$('.home .animation').height($(window).height() * 1 / 2).width($('.home .animation img').innerWidth());
	
	// resize functions
	var resizePiece = function() {
		if(piece == 1) {
			$('.home .animation.b').height($(window).height() * 1 / 2).width($('.home .animation.b img').innerWidth());
		} else if(piece == 2) {
			$('.home .animation.c').height($(window).height() * 1 / 2).width($('.home .animation.c img').innerWidth());
		} else if(piece == 3) {
			$('.home .animation.d').height($(window).height() * 1 / 2).width($('.home .animation.d img').innerWidth());
		} else if (piece == 4) {
			$('.home .animation.e').height($(window).height() * 1 / 2).width($('.home .animation.e img').innerWidth());
		}
	}
	$(window).resize(function() {
		$('.home').height($(window).height());
		$('.home .animation').height($(window).height() * 1 / 2).width($('.home .animation img').innerWidth());
		setTimeout(function() {
			// fit
			var width = 0;
			$('.slider-holder .slide').each(function(index, element) {
				$(element).width($(element).find('img').width());
				$(element).find('img').css('width', 'auto');
				width += $(element).innerWidth();
				if(index == $('.slider-holder .slide').length - 1) {
					$('.slider-holder').width(width + 228).css('margin-top', $(window).height() / 4);
				}
			});
		}, 30);
		resizePiece();
		if($(window).innerWidth() >= 768) $('.slider .centre-piece .slide img').height($(window).height() * 9 / 20);
		else $('.slider .centre-piece .slide img').height($(window).height() / 3);
		$('.slider .centre-piece').each(function(index, element) {
            $(element).find('.slide').width($(element).find('.slide').find('img').innerWidth());
        });
	});
	
	// variables
	var fade = 500;
	var lapse = 360;
	var pause = 1500;
	
	// logo click
	$('.logo-bottom .logo').bind(ios_devices, function() {
		$('.home .appointment, .home .campaign, .home .passion, .home .slider, .slider .centre-piece').stop().clearQueue().animate({'opacity': 0}, lapse, function() {
			$(this).css('visibility', 'hidden');
		});
		if(!$(this).hasClass('anim')) {
			$('.home .animation').css('visibility', 'visible');
			pieceOne();
			addAnimationClick();
		}
		$(this).addClass('anim');
		ga('send', 'event', 'clickLink', 'play', 'Start Animation');
	});
	
	// header click
	$('.timeless').click(function(e) {
		e.preventDefault();
		$('.home .appointment, .home .passion, .overlay, .home .animation, .slider .centre-piece').stop().clearQueue().animate({'opacity': 0}, lapse, function() {
			$(this).css('visibility', 'hidden');
			$('.burger').css('visibility', 'visible');
			$('.home .slider, .slider .slider-holder').css('visibility', 'visible').clearQueue().animate({'opacity': 1}, lapse);
			startCreation();
			$('.logo-bottom a').removeClass('anim');
		});
		ga('send', 'event', 'clickLink', 'collections', 'View all Pieces');
	});
	$('.our-passion').click(function(e) {
		e.preventDefault();
		$('.home .appointment, .home .slider, .overlay, .home .animation, .slider .centre-piece').stop().clearQueue().animate({'opacity': 0}, lapse, function() {
			$(this).css('visibility', 'hidden');
			$('.burger').css('visibility', 'visible');
			$('.home .passion').css('visibility', 'visible').delay(lapse).animate({'opacity': 1}, lapse);
			$('.logo-bottom a').removeClass('anim');
			resetPieces();
			$('body:not(a)').unbind('click');
		});
		ga('send', 'event', 'clickLink', 'passion', 'View Our Passion');
	});
	$('.campaign').click(function(e) {
		e.preventDefault();
		$('.home .appointment, .home .animation, .home .slider, .overlay, .home .passion, .slider .centre-piece').stop().clearQueue().animate({'opacity': 0}, lapse, function() {
			$(this).css('visibility', 'hidden');
			$('.burger').css('visibility', 'visible');
			$('.logo-bottom a').removeClass('anim');
			resetPieces();
			$('body:not(a)').unbind('click');
		});
		ga('send', 'event', 'clickLink', 'campaign', 'View Campaign');
	});
	$('.by-appointment').click(function(e) {
		e.preventDefault();
		$('.home .animation, .home .slider, .overlay, .home .passion, .slider .centre-piece').stop().clearQueue().animate({'opacity': 0}, lapse, function() {
			$(this).css('visibility', 'hidden');
			$('.burger').css('visibility', 'visible');
			$('.home .appointment').css('visibility', 'visible').delay(lapse).animate({'opacity': 1}, lapse);
			$('.logo-bottom a').removeClass('anim');
			resetPieces();
		});
		ga('send', 'event', 'clickLink', 'appointment', 'View by Appointment');
	});
	
	// overlay menu creation steps
	$('.overlay .our-creation').click(function(e) {
		e.preventDefault();
		$('.overlay .holder.first').animate({'opacity': 0}, fade, function() {
			$('.overlay .holder.second').css('visibility', 'visible').animate({'opacity': 1}, fade);
			$('.overlay .o-collections').click(function() {
				$('.overlay .holder.second').animate({'opacity': 0}, fade, function() {
					$(this).css('visibility', 'hidden');
					$('.overlay .holder.third').css('visibility', 'visible').animate({'opacity': 1}, fade, function() {
						$('.overlay .o-timeless-classics').click(function() {
							$('.timeless').click();
							// reset menu
							$('.overlay .holder').css({'opacity': 1});
							$('.overlay .holder.second, .overlay .holder.third').css({'visibility': 'hidden', 'opacity': 0});
							$('.overlay .o-collections, .o-timeless-classics').unbind('click');
						});
					});
				});
			});
		});
	});
	
	/*$('.audio a').click(function() {
		if($(this).hasClass('active')) $(this).removeClass('active').find('img').attr('src', 'static/images/audio_off.gif');
		else $(this).addClass('active').find('img').attr('src', 'static/images/audio.gif');
	});*/
	
	// initial fade in
	$('.burger').animate({'opacity': 1}, fade);
	$('.header').animate({'opacity': 1}, fade);
	$('.home').animate({'opacity': 1}, fade, function() {
	
		// logo
		$('.home .logo-bottom').animate({'opacity': 1}, fade);
		
		// burger
		$('.burger').click(function() {
			$('.overlay').css('visibility', 'visible').animate({'opacity': 1}, 300);
			$(this).css('visibility', 'hidden');
		});
		$('.overlay .close').click(function() {
			$('.overlay').animate({'opacity': 0}, 300, function() {
				$(this).css('visibility', 'hidden');
				// reset menu
				$('.overlay .holder').css({'opacity': 1});
				$('.overlay .holder.second, .overlay .holder.third').css({'visibility': 'hidden', 'opacity': 0});
			});
			$('.burger').css('visibility', 'visible');
		});
	});
	
	// reset animations
	var resetPieces = function() {
		$('.home .animation').each(function(index, element) {
			clearTimeout($(element).data('timer'));
			$(element).clearQueue();
			$(element).css('opacity', 0).removeClass('done');
			$(element).find('img').each(function(_index, _element) {
				clearTimeout($(_element).data('timer'));
				$(_element).clearQueue();
				$(_element).css('opacity', 0);
			});
		});
		resizePiece();
	}
	
	// our creation
	var infiniteScroll = function() {
		function scrollSlider() {
			var speed;
			if (WURFL.is_mobile && WURFL.form_factor != 'Tablet') speed = ($('.slider-holder').width() - $('.slider').scrollLeft()) * 15;
			else speed = ($('.slider-holder').width() - $('.slider').scrollLeft()) * 12;
			$('.slider').animate({scrollLeft: $('.slider-holder').width() - $(window).innerWidth() + 120 + 'px'}, speed, 'linear', function() {
				$('.slider').scrollLeft($('.slider-holder').width() / 2 - $(window).innerWidth() + 110);
				scrollSlider();
			});
		}
		scrollSlider();
	}
	
	var startCreation = function() {
		$('.home .animation').clearQueue().animate({'opacity': 0}, lapse, function() {
			$(this).css('visibility', 'hidden');
		});
		$('.home .slider').clearQueue().css('visibility', 'visible').scrollLeft(0).delay(lapse).animate({'opacity': 1}, lapse);
		$('body:not(a)').unbind('click');
		$('.logo-bottom a').removeClass('anim');
		infiniteScroll();
	}
	
	// pieces
	var pieceOne = function() {
		
		// first animation
		piece = 1;
		resetPieces();
		$('.home .animation.b').css('opacity', 1);
		if (WURFL.is_mobile && WURFL.form_factor != 'Tablet') {
			$('.home .animation.b img:not(:last)').remove();
			$('.home .animation.b img').animate({'opacity': 1}, fade, 'easeInSine', function() {
				$('.home .animation.b img').delay(pause).animate({'opacity': 0}, fade, 'easeInSine', function() {
					pieceTwo();
				});
			});
		} else {
			$('.home .animation.b img').delay(lapse).each(function(index, element) {
				$(element).data('timer', setTimeout(function() {
					$(element).animate({'opacity': 1}, fade, 'easeInSine', function() {
						if(index == $('.home .animation.b img').length - 1 && !$('.home .animation.b').hasClass('done')) {
							$('.home .animation.b').delay(pause).animate({'opacity': 0}, fade, 'easeOutSine', function() { pieceTwo(); });
						}
					});
				}, lapse * index));
			});
		}
		
		if (WURFL.is_mobile && WURFL.form_factor != 'Tablet') {} else {
			
			// second animation -- preload
			if ($('.animation.c img').length == 1 ) $('.animation.c').prepend('<img src="static/images/frames_c/1.png" /> <img src="static/images/frames_c/2.png" /> <img src="static/images/frames_c/3.png" /> <img src="static/images/frames_c/4.png" /> <img src="static/images/frames_c/5.png" /> <img src="static/images/frames_c/6.png" /> <img src="static/images/frames_c/7.png" /> <img src="static/images/frames_c/8.png" /> <img src="static/images/frames_c/9.png" /> <img src="static/images/frames_c/10.png" /> <img src="static/images/frames_c/11.png" /> <img src="static/images/frames_c/12.png" /> <img src="static/images/frames_c/13.png" /> <img src="static/images/frames_c/14.png" /> <img src="static/images/frames_c/15.png" /> <img src="static/images/frames_c/16.png" /> <img src="static/images/frames_c/17.png" /> <img src="static/images/frames_c/18.png" /> <img src="static/images/frames_c/19.png" /> <img src="static/images/frames_c/20.png" /> <img src="static/images/frames_c/21.png" /> <img src="static/images/frames_c/22.png" /> <img src="static/images/frames_c/23.png" /> <img src="static/images/frames_c/24.png" /> <img src="static/images/frames_c/25.png" /> <img src="static/images/frames_c/26.png" /> <img src="static/images/frames_c/27.png" /> <img src="static/images/frames_c/28.png" /> <img src="static/images/frames_c/29.png" /> <img src="static/images/frames_c/30.png" /> <img src="static/images/frames_c/31.png" /> <img src="static/images/frames_c/32.png" /> <img src="static/images/frames_c/33.png" /> <img src="static/images/frames_c/34.png" /> <img src="static/images/frames_c/35.png" /> <img src="static/images/frames_c/36.png" /> <img src="static/images/frames_c/37.png" /> <img src="static/images/frames_c/38.png" /> <img src="static/images/frames_c/39.png" /> <img src="static/images/frames_c/40.png" /> <img src="static/images/frames_c/41.png" /> <img src="static/images/frames_c/42.png" /> <img src="static/images/frames_c/43.png" /> <img src="static/images/frames_c/44.png" /> <img src="static/images/frames_c/45.png" /> <img src="static/images/frames_c/46.png" /> <img src="static/images/frames_c/47.png" /> <img src="static/images/frames_c/48.png" /> <img src="static/images/frames_c/49.png" /> <img src="static/images/frames_c/50.png" />');
			
			// third animation -- preload
			if ($('.animation.e img').length == 1 ) $('.animation.d').prepend('<img src="static/images/frames_b/1.png" /> <img src="static/images/frames_b/2.png" /> <img src="static/images/frames_b/3.png" /> <img src="static/images/frames_b/4.png" /> <img src="static/images/frames_b/5.png" /> <img src="static/images/frames_b/6.png" /> <img src="static/images/frames_b/7.png" /> <img src="static/images/frames_b/8.png" /> <img src="static/images/frames_b/9.png" /> <img src="static/images/frames_b/10.png" /> <img src="static/images/frames_b/11.png" /> <img src="static/images/frames_b/12.png" /> <img src="static/images/frames_b/13.png" /> <img src="static/images/frames_b/14.png" /> <img src="static/images/frames_b/15.png" /> <img src="static/images/frames_b/16.png" /> <img src="static/images/frames_b/17.png" /> <img src="static/images/frames_b/18.png" /> <img src="static/images/frames_b/19.png" /> <img src="static/images/frames_b/20.png" /> <img src="static/images/frames_b/21.png" /> <img src="static/images/frames_b/22.png" /> <img src="static/images/frames_b/23.png" /> <img src="static/images/frames_b/24.png" /> <img src="static/images/frames_b/25.png" /> <img src="static/images/frames_b/26.png" /> <img src="static/images/frames_b/27.png" /> <img src="static/images/frames_b/28.png" /> <img src="static/images/frames_b/29.png" /> <img src="static/images/frames_b/30.png" /> <img src="static/images/frames_b/31.png" /> <img src="static/images/frames_b/32.png" /> <img src="static/images/frames_b/33.png" /> <img src="static/images/frames_b/34.png" /> <img src="static/images/frames_b/35.png" /> <img src="static/images/frames_b/36.png" /> <img src="static/images/frames_b/37.png" /> <img src="static/images/frames_b/38.png" /> <img src="static/images/frames_b/39.png" /> <img src="static/images/frames_b/40.png" /> <img src="static/images/frames_b/41.png" /> <img src="static/images/frames_b/42.png" /> <img src="static/images/frames_b/43.png" /> <img src="static/images/frames_b/44.png" /> <img src="static/images/frames_b/45.png" /> <img src="static/images/frames_b/46.png" />');
			
			// fourth animation -- preload
			if ($('.animation.e img').length == 1 ) $('.animation.e').prepend('<img src="static/images/frames_d/9.png" /> <img src="static/images/frames_d/10.png" /> <img src="static/images/frames_d/11.png" /> <img src="static/images/frames_d/12.png" /> <img src="static/images/frames_d/13.png" /> <img src="static/images/frames_d/14.png" /> <img src="static/images/frames_d/15.png" /> <img src="static/images/frames_d/16.png" /> <img src="static/images/frames_d/17.png" /> <img src="static/images/frames_d/18.png" /> <img src="static/images/frames_d/19.png" /> <img src="static/images/frames_d/20.png" /> <img src="static/images/frames_d/21.png" /> <img src="static/images/frames_d/22.png" /> <img src="static/images/frames_d/23.png" /> <img src="static/images/frames_d/24.png" /> <img src="static/images/frames_d/25.png" /> <img src="static/images/frames_d/26.png" /> <img src="static/images/frames_d/27.png" /> <img src="static/images/frames_d/28.png" /> <img src="static/images/frames_d/29.png" /> <img src="static/images/frames_d/30.png" /> <img src="static/images/frames_d/31.png" /> <img src="static/images/frames_d/32.png" /> <img src="static/images/frames_d/33.png" /> <img src="static/images/frames_d/34.png" /> <img src="static/images/frames_d/35.png" /> <img src="static/images/frames_d/36.png" /> <img src="static/images/frames_d/37.png" /> <img src="static/images/frames_d/38.png" /> <img src="static/images/frames_d/39.png" /> <img src="static/images/frames_d/40.png" /> <img src="static/images/frames_d/41.png" /> <img src="static/images/frames_d/42.png" /> <img src="static/images/frames_d/43.png" /> <img src="static/images/frames_d/44.png" /> <img src="static/images/frames_d/45.png" /> <img src="static/images/frames_d/46.png" /> <img src="static/images/frames_d/47.png" /> <img src="static/images/frames_d/48.png" /> <img src="static/images/frames_d/49.png" /> <img src="static/images/frames_d/50.png" /> <img src="static/images/frames_d/51.png" /> <img src="static/images/frames_d/52.png" /> <img src="static/images/frames_d/53.png" /> <img src="static/images/frames_d/54.png" />');
		}
	}
	
	var pieceTwo = function() {
		
		// second animation
		piece = 2;
		resetPieces();
		$('.home .animation.c').css('opacity', 1);
		if (WURFL.is_mobile && WURFL.form_factor != 'Tablet') {
			$('.home .animation.c img').animate({'opacity': 1}, fade, 'easeInSine', function() {
				$('.home .animation.c img').delay(pause).animate({'opacity': 0}, fade, 'easeInSine', function() {
					pieceThree();
				});
			});
		} else {
			$('.home .animation.c img').delay(lapse).each(function(index, element) {
				$(element).data('timer', setTimeout(function() {
					$(element).animate({'opacity': 1}, fade, 'easeInSine', function() {
						if(index == $('.home .animation.c img').length - 1 && !$('.home .animation.c').hasClass('done')) {
							$('.home .animation.c').delay(pause).animate({'opacity': 0}, fade, 'easeOutSine', function() { pieceThree(); });
						}
					});
				}, lapse * index));
			});
		}
	}
	
	var pieceThree = function() {
		
		// third animation
		piece = 3;
		resetPieces();
		$('.home .animation.d').css('opacity', 1);
		if (WURFL.is_mobile && WURFL.form_factor != 'Tablet') {
			$('.home .animation.d img').animate({'opacity': 1}, fade, 'easeInSine', function() {
				$('.home .animation.d img').delay(pause).animate({'opacity': 0}, fade, 'easeInSine', function() {
					pieceFour();
				});
			});
		} else {
			$('.home .animation.d img').delay(lapse).each(function(index, element) {
				$(element).data('timer', setTimeout(function() {
					$(element).animate({'opacity': 1}, fade, 'easeInSine', function() {
						//if(index <= 8) $(element).animate({'opacity': 0}, fade * 6);
						if(index == $('.home .animation.d img').length - 1 && !$('.home .animation.d').hasClass('done')) {
							$('.home .animation.d').delay(pause).animate({'opacity': 0}, fade, 'easeOutSine', function() { pieceFour(); });
						}
					});
				}, lapse * index));
			});
		}
	}
	
	var pieceFour = function() {
		
		// fourth animation
		piece = 4;
		resetPieces();
		$('.home .animation.e').css('opacity', 1);
		if (WURFL.is_mobile && WURFL.form_factor != 'Tablet') {
			$('.home .animation.e img').animate({'opacity': 1}, fade, 'easeInSine', function() {
				$('.home .animation.e img').delay(pause).animate({'opacity': 0}, fade, 'easeInSine', function() {
					pieceOne();
				});
			});
		} else {
			$('.home .animation.e img').delay(lapse).each(function(index, element) {
				$(element).data('timer', setTimeout(function() {
					$(element).animate({'opacity': 1}, fade, 'easeInSine', function() {
						if(index == $('.home .animation.e img').length - 1 && !$('.home .animation.e').hasClass('done')) {
							$('.home .animation.e').delay(pause).animate({'opacity': 0}, fade, 'easeOutSine', function() { pieceOne(); });
						}
					});
				}, lapse * index));
			});
		}
		
		// fifth animation -- preload
	}
	pieceOne();
	
	// click proceed
	var addAnimationClick = function() {
		$('body').click(function(e) {
			if (!$(e.target).is('a')) {
				if(piece == 1) {
					if($('.home .animation.b').hasClass('done')) {
						$('.home .animation.b').animate({'opacity': 0}, fade, function() {
							pieceTwo();
						});
					} else {
						$('.home .animation.b img:not(:last)').clearQueue().animate({'opacity': 0}, fade);
						$('.home .animation.b img:last').clearQueue().animate({'opacity': 1}, fade);
						$('.home .animation.b').addClass('done');
					}
				} else if(piece == 2) {
					if($('.home .animation.c').hasClass('done')) {
						$('.home .animation.c').animate({'opacity': 0}, fade, function() {
							pieceThree();
						});
					} else {
						$('.home .animation.c img:not(:last)').clearQueue().animate({'opacity': 0}, fade);
						$('.home .animation.c img:last').clearQueue().animate({'opacity': 1}, fade);
						$('.home .animation.c').addClass('done');
					}
				} else if(piece == 3) {
					if($('.home .animation.d').hasClass('done')) {
						$('.home .animation.d').animate({'opacity': 0}, fade, function() {
							pieceFour();
						});
					} else {
						$('.home .animation.d img:not(:last)').clearQueue().animate({'opacity': 0}, fade);
						$('.home .animation.d img:last').clearQueue().animate({'opacity': 1}, fade);
						$('.home .animation.d').addClass('done');
					}
				} else if (piece == 4) {
					if($('.home .animation.e').hasClass('done')) {
						$('.home .animation.e').animate({'opacity': 0}, fade, function() {
							pieceOne();
						});
					} else {
						$('.home .animation.e img:not(:last)').clearQueue().animate({'opacity': 0}, fade);
						$('.home .animation.e img:last').clearQueue().animate({'opacity': 1}, fade);
						$('.home .animation.e').addClass('done');
					}
				}
			}
		});
	}
	addAnimationClick();
	
	// fit our creation
	setTimeout(function() {
		// fit
		var width = 0;
		$('.slider-holder .slide').each(function(index, element) {
			$(element).find('img').css('height', '100%');
			width += $(element).innerWidth();
			if(index == $('.slider-holder .slide').length - 1) {
				$('.slider-holder').width(width + 228).css('margin-top', $(window).height() / 4);
			}
		});
	}, 30);
	
	// click function
	if($(window).innerWidth() >= 768) $('.slider .centre-piece .slide img').height($(window).height() * 9 / 20);
	else $('.slider .centre-piece .slide img').height($(window).height() / 3);
	$('.slider .centre-piece').each(function(index, element) {
		$(element).find('.slide').width($(element).find('img').innerWidth());
	});
	$('.slider-holder .single-piece').bind(ios_devices, function() {
		var single = $(this).index();
		if (single > 3) single = single - 4;
		$('.slider').stop().clearQueue();
		$('.slider-holder').animate({'opacity': 0}, fade, function() {
			$(this).css('visibility', 'hidden');
			var source = $('.slider .centre-piece').eq(single).find('.write').attr('src') + '?x=' + Math.random();
			$('.slider .centre-piece').eq(single).find('.write').replaceWith('<img src="' + source + '" class="write" />');
			$('.slider .centre-piece').eq(single).css('visibility', 'visible').animate({'opacity': 1}, fade);
			$('.slider .centre-piece').eq(single).bind(ios_devices, function() {
				infiniteScroll();
				$(this).unbind('click');
				$(this).animate({'opacity': 0}, fade, function() {
					$('.slider-holder').css('visibility', 'visible').animate({'opacity': 1}, fade);
					$(this).css('visibility', 'hidden');
				});
			});
		});
	});
	
});

// Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-67476859-1', 'auto');
ga('send', 'pageview');