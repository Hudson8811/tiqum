$('.js-media__item').hover(function () {
  $(this).siblings('.js-media__item').addClass('opacity');
}, function () {
  $('.js-media__item').removeClass('opacity');
}); // First we get the viewport height and we multiple it by 1% to get a value for a vh unit