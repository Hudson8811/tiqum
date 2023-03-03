(function ($) {
  const windowInnerWidth = window.innerWidth
  console.log(windowInnerWidth);
  if (windowInnerWidth > 1024) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".services__items").forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'bottom bottom',
        pin: true,
        pinSpacing: false
      });
    });
  }
})(jQuery);