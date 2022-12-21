

if (typeof Drupal !== 'undefined') {
  (function ($, Drupal) {
    Drupal.behaviors.tiqumFooter = {
      attach(context) {
        $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').once('focus').focus(function () {
          $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area")
        });
        $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').once('blur').blur(function () {
          if ($(this).val() === '') {
            $(this).closest('.form-wewillfind-footer__item').removeClass("js-active-area")
          }
        });
      },
    };
  })(jQuery, Drupal);

}
else {

  (function ($) {

    $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').focus(function () {
      $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area")
    });
    $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').blur(function () {
      if ($(this).val() === '') {
        $(this).closest('.form-wewillfind-footer__item').removeClass("js-active-area")
      }
    });

  })(jQuery);

}

