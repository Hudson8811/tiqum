/**
 * @file
 */
'use strict';

(($, Drupal, drupalSettings) => {
  Drupal.behaviors.ginMessagesDismiss = {
    attach: function(context) {
      $('.messages .button--dismiss', context).once('messages-dismiss').click(function(event) {
        event.preventDefault();
        const $elem = $(this).parents('.messages-list__item');

        $elem.css('opacity', 0);
        $elem.bind('transitionend', function() {
          $(this).addClass('visually-hidden');
          $(this).css('opacity', 1);
        })
      });
    }
  }
})(jQuery, Drupal, drupalSettings);

(function ($, Drupal) {

  /**
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.tiqum = {
    attach(context) {
      let count = parseInt($('#views-count-result-source').text()) || 0;
      if (count) {
        $('#views-count-result-target').once('views-count-result-target').each(function () {
          $(this).text('(+' + count + ')')
        });

        $('#views-count-result-target--no-staples').once('views-count-result-target--no-staples').each(function () {
            $(this).text('+' + count)
        });
      }

      // Яндекс Метрика. Цель MainFormLead.
      let $ymTarget = $('.wewillfind-footer__title.general-title.success:not(.ym)');
      if (typeof ym !== "undefined" && $ymTarget.length) {
        $ymTarget.addClass('ym');
        ym(7762549,'reachGoal','MainFormLead');
      }

      // Авто-нумерация.
      $('#auto-number > li').once().each(function(index) {
        let number = (index + 1).toString().padStart(2, '0');
        $(this).prepend(number);
      });

      let $contactForm = $('.page.contact-page form.wewillfind-footer__form');
      if ($contactForm.length) {
        let $button = $contactForm.find('[type="submit"].form-wewillfind-footer__btn');
        $contactForm.find('[name="terms"]').once().change(function() {
          if (!$(this).is(':checked')) {
            $button.attr('disabled', true);
          }
          else {
            $button.removeAttr('disabled');
          }
        });

        let $label = $contactForm.find('.item__file label');
        if ($contactForm.find('[name="file[fids]"]').val()) {
          $label.hide();
        }
        else  {
          $label.show();
        }

        $('.form-wewillfind-footer button[type=submit]').once().click(function (event){
          // $(document).on('click','form.wewillfind-footer__form button[type=submit][name="op"]',function (){
          event.preventDefault();
          let valid = true;
          $(this).closest('form').find('input[name="phone"], input[name="phone"], textarea, select').each(function (){
            if (validInput(this)){
              $(this).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
            } else {
              $(this).closest('.form-wewillfind-footer__item').addClass("js-error").removeClass("js-active-area");
              valid = false;
            }
          });
          if (valid) {
            //submit code here
            let $button = $('.form-wewillfind-footer input[type=submit].webform-button--submit');
            if (!$button.hasClass('processed')) {
              $button.addClass('processed').mousedown().click();
            }
          }
        });
      }

    },
  };

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

})(jQuery, Drupal);
