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
gsap.utils.toArray(".trend__hero").forEach((panel, i) => {
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

		$('<li><a href="#b'+ h2_id +'" class="click">'+ h2_cont +'</a></a></li>').appendTo('.content ul');

		h2_id++;
	})
	var Hheader = document.getElementByClass('.header').offsetHeight;
	$('.click').on('click', function() {
		let href = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(href).offset().top - Hheader
		}, {
			duration: 700,
			easing: "linear"
		});

		return false;
	});
});