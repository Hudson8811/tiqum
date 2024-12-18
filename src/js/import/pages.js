(function ($) {

	//projects
	$(document).ready(function(){
		$('.archive-projects__item').mouseover(function(){
			$('.archive-projects__item').addClass("js-opacity-item");
			$(this).addClass("js-active-item");
		});
		$('.archive-projects__item').mouseout(function(){
			$('.archive-projects__item').removeClass("js-opacity-item");
			$(this).removeClass("js-active-item");
		});
	});

	gsap.registerPlugin(ScrollTrigger);
	gsap.utils.toArray(".projects__header").forEach((panel, i) => {
		ScrollTrigger.create({
			trigger: panel,
			start: 'top top',
			pin: true,
			pinSpacing: false
		});
	});
	gsap.registerPlugin(ScrollTrigger);
	gsap.utils.toArray(".page-header-big").forEach((panel, i) => {
		ScrollTrigger.create({
			trigger: panel,
			start: 'top top',
			pin: true,
			pinSpacing: false
		});
	});

	$(document).ready(function(){
		var h2_id = 1;
		$('.content h2').each(function(){
			$(this).attr("id", "b" + h2_id);

			h2_cont = $(".content h2#b" + h2_id).text();

			$('<li><a href="#b'+ h2_id +'" class="click link link'+ h2_id +'">'+ h2_cont +'</a></a></li>').appendTo('.content .flex-lr__left ul');
			h2_id++;
		})

		$('.click').on('click', function() {
			let href = $(this).attr('href');
			var header = $('header').outerHeight();

			$('html, body').animate({
				scrollTop: $(href).offset().top - header
			}, {
				duration: 700,
				easing: "linear"
			});

			return false;
		});
		$(document).on('scroll', function() {
			var num = 1;
			$('.link').each(function(){
				var wh = $(window).height();
				var wt = $(window).scrollTop();
				var wb = (wh + wt);

				var eh = $('#b'+num+'').outerHeight();
				var et = $('#b'+num+'').offset().top;
				var eb = (eh + et);
				if ((eb >= wt) && (et <= wb)){
					$('.link'+num+'').addClass("link-active");
				} else {
					$('.link'+num+'').removeClass("link-active");
				}
				num++;
			})
		});

	/* 	var $animation_elements = $('.link1');
		var $window = $(window);

		function check_if_in_view() {
			var window_height = $window.height();
			var window_top_position = $window.scrollTop();
			var window_bottom_position = (window_top_position + window_height);

			$.each($animation_elements, function() {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_position = $element.offset().top;
				var element_bottom_position = (element_top_position + element_height);

				//check to see if this current container is within viewport
				if ((element_bottom_position >= window_top_position) &&
					(element_top_position <= window_bottom_position)) {
					$element.addClass('is-visible');
				} else {
					$element.removeClass('is-visible');
				}
			});
		}

		$window.on('scroll resize', check_if_in_view);
		$window.trigger('scroll'); */

	});

    const page__image = gsap.timeline({
        scrollTrigger: {
            trigger: ".new-page__image img",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.utils.toArray(".new-page__image").forEach(layer => {
        const depth = layer.dataset.depth;
        const movement = -(layer.offsetHeight * depth)
        page__image.to(layer, {y: movement, ease: "none"}, 0)
    });

    $(document).ready(function (){
       $(document).on('click','.js-to-form',function (){
           $('body').removeClass('body-overflow');
           $('.menu-mobile').removeClass("menu-mobile_active");
           $('.header').removeClass('header-mobile_active');
           $('.header__burger').removeClass('header__burger-active')
           let offsetTop = $('#contact-form').position().top;
           $('html, body').animate({
               scrollTop: $('#contact-form').offset().top - offsetTop
           }, 1000);
       });

			 function showSubmitButton(){
				if (window.innerWidth > 375){
					showSubmitButtonDesc()
				}else {
					showSubmitButtonMob()

				}
			}
			showSubmitButton()
			function showSubmitButtonDesc() {
				setTimeout(function(){
					$('.calc__link').addClass('active');
				}, 2000);

				$(window).on('scroll', function(){
					let scrollTop = $(window).scrollTop();
					let windowH = $(window).height();
					let windowH2 = $(window).height()/2;
					
					// if (scrollTop > windowH2) {
					// 		$('.calc__link').addClass('active');
					// } else {
					// 		$('.calc__link').removeClass('active');
					// }
					let formTop = $('#contact-form').offset().top;
					if (scrollTop + windowH > formTop) {
							$('.calc__link').addClass('hide');
					} else {
							$('.calc__link').removeClass('hide');
					}
			});
			}

		  function showSubmitButtonMob() {
				$(document).scroll(function () {
					if ($(document).scrollTop() > 10) {
						$('.calc__link').addClass('active');
					} else if ($(document).scrollTop() < 10) {
						$('.calc__link').removeClass('active');
					}
				});
				$(window).on('scroll', function(){
					let scrollTop = $(window).scrollTop();
					let windowH = $(window).height();
					let windowH2 = $(window).height()/2;
					
					// if (scrollTop > windowH2) {
					// 		$('.calc__link').addClass('active');
					// } else {
					// 		$('.calc__link').removeClass('active');
					// }
					let formTop = $('#contact-form').offset().top;
					if (scrollTop + windowH > formTop) {
							$('.calc__link').addClass('hide');
					} else {
							$('.calc__link').removeClass('hide');
					}
			});
			}

    });

		
    $('.js-services__item').hover(function (){
			$(this).siblings('.js-services__item').addClass('opacity');
		},function (){
				$('.js-services__item').removeClass('opacity');
		});


				// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

	})(jQuery);