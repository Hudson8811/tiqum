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


var block_show = null;
function is_fully_shown(target) {
	const scroll = $(document).scrollTop();
	const dark_pos = $(target).offset().top;
	const dark_height = $(target).outerHeight();
	console.log(dark_pos);
	
	if (scroll > dark_pos && scroll < dark_pos + dark_height) {
		return true;
	} else {
		return false;
	}
}

$(window).scroll(function () {
	var test = false;
	$(".white-block").each(function () {
		if (!test) {
			if (is_fully_shown($(this))) {
				$(".header.js-header-white").addClass("js-header-white-dark")
				test = true;
			} else {
				$(".header.js-header-white").removeClass("js-header-white-dark")
			}
		}
	});
});