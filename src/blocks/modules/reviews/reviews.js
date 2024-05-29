document.addEventListener("DOMContentLoaded", () => {
    const reviewsBlocks = document.querySelectorAll(".js-reviews")

    if(reviewsBlocks.length > 0) {
        reviewsBlocks.forEach(reviewsBlock => {
            const reviewsSlider = reviewsBlock.querySelector('.js-reviews__slider');
            const reviewsSliderPrev = reviewsBlock.querySelector('.js-reviews__prev');
            const reviewsSliderNext = reviewsBlock.querySelector('.js-reviews__next');

            let reviewsSliderEx = new Swiper(reviewsSlider, {
                slidesPerView: 1,
                spaceBetween: 35,
                navigation: {
                    prevEl: reviewsSliderPrev,
                    nextEl: reviewsSliderNext,
                },
            })
        })
    }
})