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