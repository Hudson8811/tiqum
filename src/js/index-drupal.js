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

    },
  };

})(jQuery, Drupal);
