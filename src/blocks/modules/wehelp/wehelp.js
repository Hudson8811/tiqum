(function ($) {
  var swiper = new Swiper(".wehelp__swiper", {
    loop: true,
    speed: 3000,
    slidesPerView: "1.9",
    autoplay: {
      delay: 0,
    },
    breakpoints: {
      768: {
        slidesPerView: "3",
      },
      1024: {
        slidesPerView: "3.8",
      },
    }
  });


})(jQuery);