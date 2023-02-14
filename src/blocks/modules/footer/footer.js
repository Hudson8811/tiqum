(function ($) {

  if (typeof Drupal !== 'undefined') {
    (function ($, Drupal) {
      Drupal.behaviors.tiqumFooter = {
        attach(context) {
            $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').once('focus').focus(function () {
                $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area")
            });
            $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').once('blur').blur(function () {
                if (validInput(this)){
                    $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
                    $(this).closest('.form-wewillfind-footer__item');
                    $('.form-wewillfind-footer input[type=submit].webform-button--submit').prop('disabled', false);
                } else {
                    $(this).closest('.form-wewillfind-footer__item').addClass("js-error").removeClass("js-active-area");
                    $(this).closest('.form-wewillfind-footer__item');
                }
            });
            $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').once('paste keyup').on('paste keyup',function () {
                if ( $(this).closest('.form-wewillfind-footer__item').hasClass('js-error')){
                    if (validInput(this)){
                        $('.form-wewillfind-footer input[type=submit].webform-button--submit').prop('disabled', false);
                        $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
                    }
                }
            });

            $('.form-wewillfind-footer button[type=submit], .form-wewillfind-footer input[type=submit].webform-button--submit').once('hover').hover(function (event){
                let valid = true;
                $(this).closest('form').find('input:not([type=file]), textarea').each(function (){
                    if (validInput(this)){
                        $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
                    } else {
                        $(this).closest('.form-wewillfind-footer__item').addClass("js-error").removeClass("js-active-area");
                        valid = false;
                    }
                });
                if (valid) {
                    //submit code here
                    $(this).prop('disabled', false);
                }
                else {
                  $(this).prop('disabled', true);
                  return false;
                }
            });
        },
      };
    })(jQuery, Drupal);

  }
  else {

    $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').focus(function () {
      $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area")
    });
    $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').blur(function () {
      if (validInput(this)){
          $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
          $(this).closest('.form-wewillfind-footer__item');
      } else {
          $(this).closest('.form-wewillfind-footer__item').addClass("js-error").removeClass("js-active-area");
          $(this).closest('.form-wewillfind-footer__item');
      }
    });
    $('.form-wewillfind-footer__item input, .form-wewillfind-footer__item textarea').on('paste keyup',function () {
        if ( $(this).closest('.form-wewillfind-footer__item').hasClass('js-error')){
            if (validInput(this)){
                $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
            }
        }
    });

    $(document).on('click','.form-wewillfind-footer button[type=submit]',function (){
        event.preventDefault();
        let valid = true;
        $(this).closest('form').find('input:not([type=file]), textarea').each(function (){
            if (validInput(this)){
                $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
            } else {
                $(this).closest('.form-wewillfind-footer__item').addClass("js-error").removeClass("js-active-area");
                valid = false;
            }
        });
        if (valid) {
            //$(this).closest('form').submit();
            //submit code here
            $(this).closest('form').addClass('submited');
        }
    });

  }

  function validInput(elem){
      let type = $(elem).attr('type');
      let name = $(elem).attr('name');
      let value = $(elem).val();
      let required = $(elem).attr('required');
      let trimmed, pattern;
      if (required || value.trim() !== ''){
          switch (type) {
              case 'tel':
                  trimmed = value.trim().replace(/[\s().-]+/g, '');
                  pattern = /^\+?[7-8]\d{8,12}$/;
                  return pattern.test(trimmed);
              case 'email':
                  trimmed = value.trim();
                  pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                  return pattern.test(trimmed);
                  break;
              case 'text':
                switch (name) {
                  case 'phone':
                    trimmed = value.trim().replace(/[\s().-]+/g, '');
                    pattern = /^\+?[7-8]\d{8,12}$/;
                    return pattern.test(trimmed);
                }
              default:
                  return value.trim() !== '';
          }
      } else {
          return true;
      }
  }
})(jQuery);