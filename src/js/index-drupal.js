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

      $('#views-count-result-target').once('views-count-result-target').each(function () {
        if ($('#views-count-result-source').length) {
          $(this).text('(+' + $('#views-count-result-source').text() + ')')
        }
      });
    },
  };

})(jQuery, Drupal);
