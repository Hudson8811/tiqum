$(document).ready(function(){
	if ($(".wrapper").hasClass("main-page")) {
		$('.header').addClass("js-header-white");
	}
});

$(document).scroll(function() {
	if ($(document).scrollTop() > 10) {
		$('.header').addClass("js-header-fixed");
	} else if ($(document).scrollTop() < 10) {
		$('.header').removeClass("js-header-fixed");
	}
})