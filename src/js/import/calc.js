(function ($) {

    $('.calc-page__underBlok__input:checkbox').change(function(){
        if($(this).is(":checked")) {
            $(this).parents('.calc-page__underBlok').addClass("active");
        } else {
            $(this).parents('.calc-page__underBlok').removeClass("active");
        }
    });

    function splitNumberIntoGroups(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function replacePlaceholders(str, data) {
        let result = str;
        for (let key in data) {
            result = result.replace(new RegExp('\\{\\$' + key + '\\}', 'g'), data[key]);
        }
        return result;
    }

    function getMonthEnding(count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'месяц';
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return 'месяца';
        } else {
            return 'месяцев';
        }
    }


    let finalBlockHtml = "<div class='finalCost__block'>" +
    "<div class='finalCost__block--left'>" +
    "<div class='finalCost__block--time h2 {$class}'></div>" +
    "</div>" +
    "<div class='finalCost__block--right'>" +
    "<div class='finalCost__block--desc'>{$text}</div>" +
    "</div>" +
    "</div>";


    let serviceSelect = false;
    let selectedService;
    let serviceList = [
        'Запуск MVP',
        'Цифровая трансформация. Консалтинг',
        'Проектирование сервиса',
        'Продуктовая команда'
    ];


    let formTitles = [
        'Срок и стоимость <span><br>запуска вашего MVP</span>',
        'Стоимость',
        'Стоимость',
        'Стоимость'
    ];
    const values = {
        title: 'My Title',
        subtitle: 'My Subtitle',
    };

    let finalBlocks = [
        [
            {
                class: 'js-calc-finalTime',
                text: 'Максимальный срок запуска вашего сервиса/продукта с момента подписания договора',
            },
            {
                class: 'js-calc-finalPrice',
                text: 'Итоговая сумма запуска сервиса/продукта с учетом ваших предпочтений',
            },
        ],
        [],
        [],
        []
    ];



    $('.js-calc-service').hover(function (){
        $(this).siblings('.js-calc-service').addClass('opacity');
    },function (){
        $('.js-calc-service').removeClass('opacity');
    });

    $('.js-calc-service').on('click',function (){
        event.preventDefault();
        serviceSelect = true;
        selectedService = parseInt($(this).data('service'));
        $('.calc-page__left-control').addClass('active');
        $(this).siblings('.js-calc-service').slideUp(400).addClass('collapsed').removeClass('active');

        if (!$(this).hasClass('active')){
            $(this).addClass('active');
            selectService(selectedService);
        }
    });


    function selectService(service){
        let htmlFinal = '';
        finalBlocks[service].forEach(function (elem){
            htmlFinal += replacePlaceholders(finalBlockHtml, elem);
        });
        $('.js-calc-finalBlocks').html(htmlFinal);



        const firstBlockElement = $('.calc-page__serviceBlock.active');
        const secondBlockElement = $('.calc-page__serviceBlock[data-service='+service+']');

        const windowScroll =  $(window).scrollTop()

        if (firstBlockElement.length) {
            firstBlockElement.css({
                display: 'block',
                opacity: 1
            });

            const firstBlockMargin = $(window).height();
            firstBlockElement.animate({
                opacity: 0,
                marginTop: firstBlockMargin
            }, 400, 'easeOutCirc', () => {
                firstBlockElement.removeClass('active');
                firstBlockElement.css({
                    display: 'none'
                });

                const secondBlockMargin = $(window).height() - secondBlockElement.offset().top - windowScroll + 100;
                secondBlockElement.css({
                    display: 'block',
                    opacity: 0,
                    marginTop: secondBlockMargin
                });

                secondBlockElement.animate({
                    opacity: 1,
                    marginTop: 0
                }, 400, 'easeOutCirc', () => {
                    secondBlockElement.addClass('active');
                });
            });
        } else {
            secondBlockElement.css({
                display: 'block',
                opacity: 0
            });

            const secondBlockFinishPosition = $(window).height() - secondBlockElement.offset().top - windowScroll + 100;

            secondBlockElement.css({
                marginTop: secondBlockFinishPosition
            });

            secondBlockElement.animate({
                opacity: 1,
                marginTop: 0
            }, 400, 'easeOutCirc', () => {
                secondBlockElement.addClass('active');
            });
        }
        $('.calc-page__footer').addClass('active');

        calcFinal(selectedService);
    }


    function calcFinal(service){
        let jsonArray = {};
        switch(service) {
            case 0:
                let timeBlock = finalBlocks[0][0]['class'];
                let priceBlock = finalBlocks[0][1]['class'];
                let totalPrice = 0;
                let totalTime = 0;
                $('.calc-page__serviceBlock[data-service='+service+']').find('input:checked').each(function (){
                    totalPrice += parseInt($(this).data('price'));
                    totalTime += parseFloat($(this).data('time'));

                    let name = $(this).attr('name').replace(/[^a-zA-Z]+/g, '');
                    let value = $(this).val();
                    if (!jsonArray.hasOwnProperty(name)) {
                        jsonArray[name] = [value];
                    } else {
                        jsonArray[name].push(value);
                    }
                });
                $('.'+timeBlock).html(totalTime + ' ' + getMonthEnding(totalTime));
                $('.'+priceBlock).html(splitNumberIntoGroups(totalPrice) + ' ₽');
                break;
            default:
                break;
        }
        let json = JSON.stringify(jsonArray);

        $('.js-calc-formInput').val(json);
    }


    $(document).on('change','.calc-page__serviceBlock.active input',function (){
        calcFinal(selectedService);
    });


    $('.js-calc-allServices').on('click',function (){
        event.preventDefault();
        $('.calc-page__left-control').removeClass('active');
        $('.js-calc-service').slideDown(400).removeClass('collapsed');
    });

})(jQuery);
