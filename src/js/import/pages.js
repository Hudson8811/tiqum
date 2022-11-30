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

		$('<li><a href="#b'+ h2_id +'" class="click link link'+ h2_id +'">'+ h2_cont +'</a></a></li>').appendTo('.content ul');
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


	$(".project-portfolio__item-img").each(function() {
		const portfolio__item_img = $(this).find("img")
		if (portfolio__item_img.length == 1) {
			$(this).find("img").css("width", "100%");
		} else 
		if (portfolio__item_img.length == 2) {
			$(this).find("img").css("width", "49%");
		} else 
		if (portfolio__item_img.length == 3) {
			$(this).find("img").css("width", "32%");
		} else 
		if (portfolio__item_img.length == 4) {
			$(this).find("img").css("width", "23.5%");
		} else 
		if (portfolio__item_img.length == 5) {
			$(this).find("img").css("width", "18.4%");
		}
	})
});