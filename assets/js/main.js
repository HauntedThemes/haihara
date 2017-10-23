/**
 * Main JS file for Haihara
 */

jQuery(document).ready(function($) {

    var config = {
        'share-selected-text': true,
        'load-more': true,
        'infinite-scroll': true,
        'infinite-scroll-step': 3,
        'disqus-shortname': 'hauntedthemes-demo'
    };

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if ($('.featured').length) {
        var swiperFeatured = new Swiper('.featured .swiper-container', {
            navigation: {
                nextEl: '.featured .swiper-button-next',
                prevEl: '.featured .swiper-button-prev',
            },
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
        });

        swiperFeatured.on('slideChange', function(event) {
            $('.featured-navigation li').removeClass('active');
            $('.featured-navigation li:nth-child('+ (swiperFeatured.activeIndex+1) +')').addClass('active');
        });

        $('.featured-navigation li:first-child').addClass('active');

        $('.featured-navigation li').each(function(index, el) {
            $(this).on('click', function(event) {
                event.preventDefault();
                swiperFeatured.slideTo(index);
            });
        });
    };
    

});