(function($) {
    if($.fn.select2 !== undefined){
      var Defaults = $.fn.select2.amd.require('select2/defaults');

      $.extend(Defaults.defaults, {
        dropdownPosition: 'auto'
      });

      var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');

      var _positionDropdown = AttachBody.prototype._positionDropdown;

      AttachBody.prototype._positionDropdown = function() {

        var $window = $(window);

        var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
        var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

        var newDirection = null;

        var offset = this.$container.offset();

        offset.bottom = offset.top + this.$container.outerHeight(false);

        var container = {
          height: this.$container.outerHeight(false)
        };

        container.top = offset.top;
        container.bottom = offset.top + container.height;

        var dropdown = {
          height: this.$dropdown.outerHeight(false)
        };

        var viewport = {
          top: $window.scrollTop(),
          bottom: $window.scrollTop() + $window.height()
        };

        var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
        var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

        var css = {
          left: offset.left,
          top: container.bottom
        };

        // Determine what the parent element is to use for calciulating the offset
        var $offsetParent = this.$dropdownParent;

        // For statically positoned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
          $offsetParent = $offsetParent.offsetParent();
        }

        var parentOffset = $offsetParent.offset();

        css.top -= parentOffset.top
        css.left -= parentOffset.left;

        var dropdownPositionOption = this.options.get('dropdownPosition');

        if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
          newDirection = dropdownPositionOption;
        } else {

          if (!isCurrentlyAbove && !isCurrentlyBelow) {
            newDirection = 'below';
          }

          if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
            newDirection = 'above';
          } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
            newDirection = 'below';
          }

        }

        if (newDirection == 'above' ||
          (isCurrentlyAbove && newDirection !== 'below')) {
          css.top = container.top - parentOffset.top - dropdown.height;
        }

        if (newDirection != null) {
          this.$dropdown
            .removeClass('select2-dropdown--below select2-dropdown--above')
            .addClass('select2-dropdown--' + newDirection);
          this.$container
            .removeClass('select2-container--below select2-container--above')
            .addClass('select2-container--' + newDirection);
        }

        this.$dropdownContainer.css(css);

      };
    }

})(window.jQuery);

(function ($) {
	$(".calc__link--circle").click(function(){
		$(".modalFromFooter").addClass("active")
		$("body").addClass("noScroll")
	})
	$(".modalFromFooter--close").click(function(){
		$(".modalFromFooter").removeClass("active")
		$("body").removeClass("noScroll")
	})
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

            $(document).on('click','.form-wewillfind-footer button[type=submit]',function (){
              event.preventDefault();
              let valid = true;
              $(this).closest('form').find('input:not([type=file]), textarea, select').each(function (){
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
        $(this).closest('form').find('input:not([type=file]), textarea, select').each(function (){
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

  if($(".buget-select").length > 0 && typeof $(".buget-select").select2 !== 'undefined'){
      $(".buget-select").select2({
          placeholder: "Бюджет проекта",
          allowClear: false,
          minimumResultsForSearch: Infinity,
          dropdownPosition: 'below'
      });
      $(document).on('change', ".buget-select", function (){
         let select = this;
         if (validInput(select)){
             $(select).closest('.form-wewillfind-footer__item').addClass("js-active-area").removeClass("js-error");
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