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

$(document).scroll(function() {
	if ($(document).scrollTop() > $(".hero").outerHeight() - 50) {
		$(".header.js-header-white").addClass("js-header-white-dark")
	} else if ($(document).scrollTop() < $(".hero").outerHeight() - 50) {
		$(".header.js-header-white").removeClass("js-header-white-dark")
	}
})