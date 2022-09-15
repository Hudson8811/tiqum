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



