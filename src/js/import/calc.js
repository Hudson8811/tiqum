(function ($) {
    let serviceSelect = false;
    let selectedService;
    let serviceList = [
        'Запуск MVP',
        'Проектирование сервиса CJM/UX/UI',
        'Продуктовая команда',
        'Цифровая трансформация. Консалтинг'
    ];

    let formTitles = [
        'Срок и стоимость <span><br>запуска вашего продукта</span>',
        'Стоимость проектирования <span><br>сервиса</span>',
        'Стоимость продуктовой <span><br>команды</span>',
        'Стоимость консалтинга по <span><br>цифровой трансофрмации</span>'
    ];

    let finalBlocks = [
        [
            {
                class: 'js-calc-finalTime',
                text: 'Максимальный срок запуска вашего сервиса/продукта с момента подписания договора',
            },
            {
                class: 'js-calc-finalPrice',
                text: 'Предварительная стоимость запуска сервиса/продукта с учетом ваших предпочтений',
            },
        ],
        [
            {
                class: 'js-calc-finalPrice',
                text: 'Предварительная стоимость запуска сервиса/продукта с учетом ваших предпочтений',
            },
        ],
        [
            {
                class: 'js-calc-finalPrice',
                text: 'Предварительная стоимость команды с учетом ваших предпочтений',
            },
        ],
        [
            {
                class: 'js-calc-finalPrice',
                text: 'Предварительная стоимость запуска сервиса/продукта с учетом ваших предпочтений',
            },
        ]
    ];

    let mvpStaff = {
        'main': [
            'Product Owner',
            'Project Manager',
            'System Analytics',
            'UX Architect',
            'UI designer',
            'Backend Developer',
        ],
        'Веб-сервис' : [
            'Frontend Developer (Web)'
        ],
        'Мобильное приложение' : [
            'Mobile Frontend Developer (iOS)',
            'Mobile Frontend Developer (Android)'
        ],
        'add' : {
            'Quality Assurance' : 'QA Engineer',
            'Автотестирование' : 'Test Engineer',
            'Инфраструктура' : 'DevOps',
        }
    };

    let mvpPrices = {
        'Веб-сервис': {
            'time': 4.5,
            'mainPrice': 6560400,
            'add': {
                'Quality Assurance': 630000,
                'Автотестирование': 1176000,
                'Инфраструктура': 756000,
                'Промо-сайт': 250000
            }
        },
        'Мобильное приложение': {
            'time': 5.5,
            'mainPrice': 8752800,
            'add': {
                'Quality Assurance': 882000,
                'Автотестирование': 588000,
                'Инфраструктура': 882000,
                'Промо-сайт': 250000
            }
        },
        'all': {
            'time': 5.5,
            'mainPrice': 11029200,
            'add': {
                'Quality Assurance': 1134000,
                'Автотестирование': 1176000,
                'Инфраструктура': 1260000,
                'Промо-сайт': 250000
            }
        }
    };

    let mvpDetails = {
        'main': {
            'Архитектура' : 1,
            'Системная аналитика' : 1,
            'UX проектирование' : 1,
            'UI (дизайн пользовательских интерфейсов)' : 1,
            'Back-end разработка (бизнес-логика и API)' : 1
        },
        'Веб-сервис' : {
            'Front-end разработка (админка, кабинеты пользователей)' : 1
        },
        'Мобильное приложение' : {
            'Front-end разработка Android' : 1,
            'Front-end разработка iOS' : 1
        }
    };


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






    $('.js-calc-service').hover(function (){
        $(this).siblings('.js-calc-service').addClass('opacity');
    },function (){
        $('.js-calc-service').removeClass('opacity');
    });

    $('.js-calc-service').on('click',function (){
        event.preventDefault();
        serviceSelect = true;
        selectedService = parseInt($(this).data('service'));
        $('.js-calc-allServices').addClass('active');
        $('.calc-page__left-control').addClass('active');
        $(this).siblings('.js-calc-service').slideUp(400).addClass('collapsed').removeClass('active');

        if (!$(this).hasClass('active')){
            $(this).addClass('active');
            selectService(selectedService);
        }
    });


    $('.numberPeople--perv').on('click', function() {
        const $count = $(this).siblings('.numberPeople--count');
        const $input = $(this).siblings('input');
        let count = parseInt($count.text(), 10);
        let minimum = 0;
        if ($input.data('minimum')){
            minimum =  parseInt($input.data('minimum'), 10)
        }
        count--;
        if (count < minimum) {
            count = minimum;
        }
        $count.text(count);
        $input.val(count);
        if (count === 0) {
            $(this).closest('.calc-page__underBlok').addClass('disabled');
        } else {
            $(this).closest('.calc-page__underBlok').removeClass('disabled');
        }
        if ($input.data('minimum')){
            if (count === minimum) {
                $(this).addClass('hidden');
            }
        }
        calcFinal(selectedService);
    });

    $('.numberPeople--next').on('click', function() {
        const $count = $(this).siblings('.numberPeople--count');
        const $input = $(this).siblings('input');
        let count = parseInt($count.text(), 10);
        let minimum = 0;
        if ($input.data('minimum')){
            minimum =  parseInt($input.data('minimum'), 10)
        }
        count++;
        $count.text(count);
        $input.val(count);
        if (count === 0) {
            $(this).closest('.calc-page__underBlok').addClass('disabled');
        } else {
            $(this).closest('.calc-page__underBlok').removeClass('disabled');
        }
        if ($input.data('minimum')){
            if (count > minimum) {
                $(this).siblings('.numberPeople--perv').removeClass('hidden');
            }
        }
        calcFinal(selectedService);
    });


    function selectService(service){
        let htmlFinal = '';
        finalBlocks[service].forEach(function (elem){
            htmlFinal += replacePlaceholders(finalBlockHtml, elem);
        });
        $('.js-calc-finalBlocks .finalCost__block:not(.finalCost__block--subtitle)').remove()
        $('.js-calc-finalBlocks').prepend(htmlFinal);
        $('.js-calc-formTitle').html(formTitles[service]);

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
        if (service !== 0){
            $('.calc-page__footer').addClass('active');
        }

        calcFinal(selectedService);
    }

    var lottie1Play = false;
    var lottie2Play = false;
    var lottie1_2Play = false;
    var lottie2_2Play = false;

    function calcFinal(service){
        let jsonArray = {};
        jsonArray['service'] = serviceList[service];
        let details = {};
        let totalPrice = 0;
        let totalTime = 0;
        let timeBlock;
        let priceBlock;
        let count = 0;
        let teamArray = [];
        switch(service) {
            case 0:
                timeBlock = finalBlocks[service][0]['class'];
                priceBlock = finalBlocks[service][1]['class'];
                $('.calc-page__serviceBlock[data-service='+service+']').find('input:checked').each(function (){
                    let name = $(this).attr('name').replace(/[^a-zA-Z]+/g, '');
                    let value = $(this).val();
                    if (!jsonArray.hasOwnProperty(name)) {
                        jsonArray[name] = [value];
                    } else {
                        jsonArray[name].push(value);
                    }
                });


                let currentWhat;

                let mvpCount = 7;


                if (jsonArray.hasOwnProperty('what') && jsonArray['what'].length >= 2) {
                    currentWhat = 'all';
                }

                if (jsonArray.hasOwnProperty('what') && jsonArray['what'].length === 1){
                    currentWhat = jsonArray['what'][0];
                }


                if ( $('.calc-page__serviceBlock[data-service='+service+'] input[name="what[]"][value="Веб-сервис"]').is(':checked')){
                    if (!lottie1_2Play){
                        $('#lottie1').hide();
                        $('#lottie1_2').show();
                        if (animLotte1){
                            animLotte1.stop();
                        }
                        if (animLotte1_2){
                            animLotte1_2.stop();
                            animLotte1_2.play();
                        }
                        lottie1Play = false;
                        lottie1_2Play = true;
                    }
                } else {
                    if (!lottie1Play){
                        $('#lottie1_2').hide();
                        $('#lottie1').show();
                        if (animLotte1_2){
                            animLotte1_2.stop();
                        }
                        if (animLotte1){
                            animLotte1.stop();
                            animLotte1.play();
                        }
                        lottie1Play = true;
                        lottie1_2Play = false;
                    }
                }

                if ( $('.calc-page__serviceBlock[data-service='+service+'] input[name="what[]"][value="Мобильное приложение"]').is(':checked')){
                    if (!lottie2_2Play) {
                        $('#lottie2').hide();
                        $('#lottie2_2').show();
                        if (animLotte2) {
                            animLotte2.stop();
                        }
                        if (animLotte2_2) {
                            animLotte2_2.stop();
                            animLotte2_2.play();
                        }
                        lottie2Play = false;
                        lottie2_2Play = true;
                    }
                } else {
                    if (!lottie2Play) {
                        $('#lottie2_2').hide();
                        $('#lottie2').show();
                        if (animLotte2_2) {
                            animLotte2_2.stop();
                        }
                        if (animLotte2) {
                            animLotte2.stop();
                            animLotte2.play();
                        }
                        lottie2Play = true;
                        lottie2_2Play = false;
                    }
                }


                $('.calc-page__frontend-dev').removeClass('active');
                if (currentWhat){
                    let tempMans  = {};
                    $('.calc-page__serviceBlock[data-service='+service+']')
                        .find('.calc-page__block--team ,.calc-page__block--Additionally').removeClass('hidden');
                    $('.calc-page__footer').addClass('active');

                    totalTime = mvpPrices[currentWhat]['time'];
                    totalPrice = mvpPrices[currentWhat]['mainPrice'];
                    let tempArray = [...mvpStaff['main']];
                    teamArray = tempArray;

                    if (currentWhat === 'Веб-сервис'){
                        if (mvpStaff.hasOwnProperty(currentWhat)){
                            teamArray.push(...mvpStaff[currentWhat]);
                        }
                        $('.calc-page__frontend-dev[data-type="'+currentWhat+'"]').addClass('active');
                        mvpCount = 7;
                        Object.assign(tempMans, mvpDetails['main'], mvpDetails[currentWhat]);
                        details['main'] = {
                            'title': 'Разработка веб-сервиса',
                            'price': mvpPrices[currentWhat]['mainPrice'],
                            'parts': tempMans
                        }
                    } else if (currentWhat === 'Мобильное приложение') {
                        if (mvpStaff.hasOwnProperty(currentWhat)){
                            teamArray.push(...mvpStaff[currentWhat]);
                        }
                        $('.calc-page__frontend-dev[data-type="'+currentWhat+'"]').addClass('active');
                        count++
                        mvpCount = 8;
                        Object.assign(tempMans, mvpDetails['main'], mvpDetails[currentWhat]);
                        details['main'] = {
                            'title': 'Разработка мобильного приложения',
                            'price': mvpPrices[currentWhat]['mainPrice'],
                            'parts': tempMans
                        }
                    } else {
                        if (mvpStaff.hasOwnProperty( 'Веб-сервис')){
                            teamArray.push(...mvpStaff[ 'Веб-сервис']);
                        }
                        if (mvpStaff.hasOwnProperty( 'Мобильное приложение')){
                            teamArray.push(...mvpStaff[ 'Мобильное приложение']);
                        }
                        $('.calc-page__frontend-dev').addClass('active');
                        mvpCount = 9;
                        Object.assign(tempMans, mvpDetails['main'], mvpDetails['Веб-сервис'], mvpDetails['Мобильное приложение']);
                        details['main'] = {
                            'title': 'Разработка веб-сервиса и мобильного приложения',
                            'price': mvpPrices[currentWhat]['mainPrice'],
                            'parts': tempMans
                        }
                    }






                    details['additional'] = {
                        'title': 'Дополнительные услуги',
                        'price': 0,
                        'parts': {}
                    }
                    if (jsonArray.hasOwnProperty('add')){
                        let tempDetailsAdd = {};
                        let tempDetailsPrice= 0;
                        jsonArray['add'].forEach(function (value){
                            if (mvpPrices[currentWhat]['add'].hasOwnProperty(value)){
                                totalPrice += mvpPrices[currentWhat]['add'][value];
                                tempDetailsPrice += mvpPrices[currentWhat]['add'][value];
                                Object.assign(tempDetailsAdd, {[value] : mvpPrices[currentWhat]['add'][value]});
                            }

                            if (mvpStaff['add'].hasOwnProperty(value)){
                                teamArray.push(mvpStaff['add'][value])
                            }

                        });

                        details['additional'] = {
                            'title': 'Дополнительные услуги',
                            'price': tempDetailsPrice,
                            'parts': tempDetailsAdd
                        }
                    }
                    count = teamArray.length;

                    $('.js-mvp-count').text(count);



                    for (var key in mvpPrices[currentWhat]['add']) {
                        $('.calc-page__serviceBlock[data-service='+service+'] input[name="add[]"][value="'+key+'"]')
                            .closest('.calc-page__underBlok').find('.calc-page__underBlok--cost')
                            .text('+' + splitNumberIntoGroups(mvpPrices[currentWhat]['add'][key]) + ' ₽');
                    }
                } else {
                    $('.calc-page__serviceBlock[data-service='+service+'] .calc-page__underBlok--cost').text('+0 ₽')
                    $('.calc-page__serviceBlock[data-service='+service+']')
                        .find('.calc-page__block--team ,.calc-page__block--Additionally').addClass('hidden');
                    $('.calc-page__footer').removeClass('active');
                }

                jsonArray['team'] = teamArray;
                jsonArray['teamTotal'] = count;
                jsonArray['totalPrice'] = totalPrice;
                jsonArray['totalTime'] = totalTime;
                jsonArray['details'] = details;

                $('.'+timeBlock).html(totalTime + ' ' + getMonthEnding(totalTime));
                $('.'+priceBlock).html(splitNumberIntoGroups(totalPrice) + ' ₽');
                break;
            case 1:
                priceBlock = finalBlocks[service][0]['class'];
                totalPrice = parseInt($('.calc-page__serviceBlock[data-service="'+service+'"] input[name="fixedPrice"]').val());
                jsonArray['totalPrice'] = totalPrice;
                $('.'+priceBlock).html(splitNumberIntoGroups(totalPrice) + ' ₽');
                break;
            case 2:
                let manArray = {};
                priceBlock = finalBlocks[service][0]['class'];
                $('.calc-page__serviceBlock[data-service="'+service+'"] input').each(function () {
                    let value = parseInt($(this).val());
                    count += value;
                    totalPrice += parseInt($(this).data('price')) * value;
                    let name = $(this).data('title');
                    if (!manArray.hasOwnProperty(name)) {
                        manArray[name] = value;
                    } else {
                        manArray[name].push(value);
                    }
                });
                jsonArray['team'] = manArray;
                jsonArray['teamTotal'] = count;
                jsonArray['totalPrice'] = totalPrice;
                $('.js-calc-manCount').text(count);
                $('.'+priceBlock).html(splitNumberIntoGroups(totalPrice) + ' ₽/мес');
                break;
            case 3:
                priceBlock = finalBlocks[service][0]['class'];
                totalPrice = parseInt($('.calc-page__serviceBlock[data-service="'+service+'"] input[name="fixedPrice"]').val());
                jsonArray['totalPrice'] = totalPrice;
                $('.'+priceBlock).html(splitNumberIntoGroups(totalPrice) + ' ₽');
                break;
            default:
                break;
        }
        let json = JSON.stringify(jsonArray);

        $('input[name="calc_info"]').val(json);
    }


    $(document).on('change','.calc-page__serviceBlock.active input',function (){
        calcFinal(selectedService);
    });


    $('.js-calc-allServices').on('click',function (){
        event.preventDefault();
        $('.calc-page__left-control').removeClass('active');
        $('.js-calc-service').slideDown(400).removeClass('collapsed');
				$(this).removeClass('active');
    });




    const accordions = document.querySelectorAll(".accordion");

    const openAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion__content");
        accordion.classList.add("accordion__active");
        content.style.maxHeight = content.scrollHeight + "px";
    };

    const closeAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion__content");
        accordion.classList.remove("accordion__active");
        content.style.maxHeight = null;
    };

    accordions.forEach((accordion) => {
        const intro = accordion.querySelector(".accordion__intro");
        const content = accordion.querySelector(".accordion__content");
        const isAccordion = accordion.closest(".js-no-accordion") ? false : true

        intro.addEventListener('click', function(event) {
            if (!event.target.closest('.numberPeople')) {
                if (content.style.maxHeight) {
                    closeAccordion(accordion);
                } else {
                    if(isAccordion) {
                        accordions.forEach((accordion) => closeAccordion(accordion));
                    }
                    openAccordion(accordion);
                }
            }
        });
    });


})(jQuery);