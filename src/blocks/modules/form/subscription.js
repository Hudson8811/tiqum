'use strict';

(function ($) {

  if (typeof Drupal === 'undefined') {
    return;
  }

  (function (Drupal) {
    Drupal.behaviors.tiqumsubScription = {
      attach(context) {

        if (typeof Drupal === 'undefined') {
          return;
        }

        let $form = $('form.page__subscription');
        if (!$form.length) {
          return;
        }

        let $mail = $form.find('[name="email"]');

        $mail.once('focus').focus(function () {
          $(this).parent().addClass("js-active-area")
        });
        $mail.once('blur').blur(function () {
          if (validInput(this)) {
            $(this).parent().addClass("js-active-area").removeClass("js-error");
            $form.find('input[type=submit].webform-button--submit').prop('disabled', false);
          } else {
            $(this).parent().addClass("js-error").removeClass("js-active-area");
          }
        });
        $mail.once('paste keyup').on('paste keyup', function () {
          if ($(this).parent().hasClass('js-error')) {
            if (validInput(this)) {
              $form.find('input[type=submit].webform-button--submit').prop('disabled', false);
              $(this).parent().addClass("js-active-area").removeClass("js-error");
            }
          }
        });

        $form.find('button[type=submit]').once('click').on('click', function (e) {
          e.preventDefault();
          let valid = true;
          $mail.each(function () {
            if (validInput(this)) {
              $(this).parent().addClass("js-active-area").removeClass("js-error");
            } else {
              $(this).parent().addClass("js-error").removeClass("js-active-area");
              valid = false;
            }
          });
          if (valid) {
            //submit code here
            let $button = $form.find('input[type=submit].webform-button--submit');
            if (!$button.hasClass('processed')) {
              $button.addClass('processed').mousedown().click();
            }
          }
        });
      },
    };
  })(Drupal);


  function validInput(elem) {
    let type = $(elem).attr('type');
    let name = $(elem).attr('name');
    let value = $(elem).val();
    let required = $(elem).attr('required');
    let trimmed, pattern;
    if (required || value.trim() !== '') {
      switch (type) {
        case 'tel':
          trimmed = value.trim().replace(/[\s().-]+/g, '');
          pattern = /^\+?[7-8]\d{8,12}$/;
          return pattern.test(trimmed);
        case 'email':
          trimmed = value.trim();
          pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))+$/;
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