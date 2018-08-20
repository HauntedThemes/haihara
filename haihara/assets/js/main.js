/**
 * Main JS file for Haihara
 */

jQuery(document).ready(function($) {

    var config = {
        'share-selected-text': true,
        'load-more': false,
        'infinite-scroll': false,
        'infinite-scroll-step': 3,
        'disqus-shortname': 'hauntedthemes-haihara'
    };

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        lang = $('body').attr('lang'),
        monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "Sepember", "October", "November", "December"];

    // Featured posts slider

    if ($('.featured-slider').length) {
        var swiperFeatured = new Swiper('.featured-slider .swiper-container', {
            navigation: {
                nextEl: '.featured-slider .swiper-button-next',
                prevEl: '.featured-slider .swiper-button-prev',
            },
            spaceBetween: 100,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
        });

        var countFeatured = $('.featured-navigation li').length;

        swiperFeatured.on('slideChange', function(event) {
            var activeIndex = swiperFeatured.activeIndex+1;
            var nextIndex = swiperFeatured.activeIndex+2;
            $('.featured-navigation li').removeClass('active next');
            if (countFeatured == activeIndex) {
                nextIndex = 1;
            };
            $('.featured-navigation li:nth-child('+ (activeIndex) +')').addClass('active');
            $('.featured-navigation li:nth-child('+ (nextIndex) +')').addClass('next');
        });

        $('.featured-navigation li:first-child').addClass('active');
        $('.featured-navigation li:nth-child(2)').addClass('next');

        $('.featured-navigation li').each(function(index, el) {
            $(this).on('click', function(event) {
                event.preventDefault();
                swiperFeatured.slideTo(index);
            });
        });

        if ($('.featured-slider .swiper-slide').length < 2) {
            $('.featured-slider .swiper-button-next, .featured-slider .swiper-button-prev').hide();
        };

    };

    // Recent posts slider

    if ($('.recent-slider').length) {

        var pagination = 4;

        var swiperRecent = new Swiper('.recent-slider .swiper-container', {
            navigation: {
                nextEl: '.recent-slider .swiper-button-next',
                prevEl: '.recent-slider .swiper-button-prev',
            },
            spaceBetween: 30,
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerGroup: 2,
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    slidesPerColumn: 2,
                    slidesPerGroup: 1,
                },
            }
        });

        if ($('.recent-slider .swiper-slide').length <= pagination) {
            $('.recent-slider .swiper-button-next, .recent-slider .swiper-button-prev').hide();
        };

    };

    // Menu trigger
    $('.nav-trigger').on('click', function(event) {
        event.preventDefault();
        $('body').toggleClass('menu-visible');
    });
    $('.backdrop, .menu-backdrop').on('click', function(event) {
        event.preventDefault();
        $('body').removeClass('search-visible menu-visible');
    });

    // Search trigger
    $('.search-trigger').on('click', function(event) {
        event.preventDefault();
        setTimeout(function() {
            $('.search #search-field').focus();
        }, 300);
        $('body').toggleClass('search-visible');
    });

    // Initialize ghostHunter - A Ghost blog search engine
    $("#search-field").ghostHunter({
        results             : "#results",
        onKeyUp             : true,
        zeroResultsInfo     : true,
        displaySearchInfo   : false,
        info_template       : "<h3 class='title'>Number of posts found: {{amount}}</h3>",
        result_template     : "<li class='swiper-slide'><article class='post post-card post-card-small'><div class='content'><div class='content-holder'><time class='post-date' datetime='{{pubDate}}'>{{pubDate}}</time><h3 class='post-title'><a href='{{link}}' title='{{title}}'>{{title}}</a></h3></div></div></article></li>",
        onComplete      : function( results ){
            if ($("#search-field").val() == '') {
                $('.search-results').removeClass('active');
            }else{
                $('.search-results').addClass('active');
                $('.search-results .title:not(.active)').prependTo('.search-slider').addClass('active');

                var resultsCount = $('#results li').length;

                if (resultsCount == 0) {
                    $('<h3 class="title no-posts-found">No posts found</h3>').appendTo('#results');
                }else{
                    $('.no-posts-found').remove();
                };

                $('#results li').each(function(index, el) {
                    var date = $(this).find('time').text();
                    var dateSplit = date.split(' ')
                    var month = monthNames.indexOf(dateSplit[1])+1;
                    date = moment(date, "D MMMM YYYY").format('D MMMM YYYY');
                    date = moment(dateSplit[0]+'-'+month+'-'+dateSplit[2], "DD-MM-YYYY").format('DD MMMM YYYY');
                    $(this).find('time').text(date);
                    if (index > 14) {
                        $(this).hide();
                    };
                });
            };

        }
    });

    // Execute on scroll
    $(window).on('scroll', function(event) {
        if ($('.post-template').length) {
            progressBar();
        };

        // Hide menu and search after scroll
        var top = $(window).scrollTop();
        if (top > (h/1.5)) {
            $('body.menu-visible .backdrop, body.search-visible .backdrop').click();
        };

        if (top > 0) {
            if (!$('.go-top').hasClass('active')) {
                $('.go-top').addClass('active');
            };
        }else{
            $('.go-top').removeClass('active');
        };
    });

    // Execute on load
    $(window).on('load', function(event) {

        // Sticky sidebar
        $(".sidebar").stick_in_parent({
            offset_top: 15
        });

        // Sticky infobar
        $(".info-bar").stick_in_parent();

        $('.post-content img').each(function(index, el) {
            if (!$(this).parent().is("a")) {
                $( "<a href='" + $(this).attr('src') + "' class='zoom'></a>" ).insertAfter( $(this) );
                $(this).appendTo($(this).next("a"));
            };
        });

        $('.zoom')
        .on('openstart.fluidbox', function() {
            $('.comments-trigger').addClass('z-index-0');
        })
        .on('closestart.fluidbox', function() {
            $('.comments-trigger').removeClass('z-index-0');
        })
        .fluidbox();

        $(window).on('scroll', function(event) {
            $('.zoom').fluidbox('close');
        });

    });

    $(window).on('resize', function(event) {
        w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    });

    // Initialize Highlight.js
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    // Initialize shareSelectedText
    if (config['share-selected-text']) {
        shareSelectedText('.post-template .post-content', {
            sanitize: true,
            buttons: [
                'twitter',
            ],
            tooltipTimeout: 250
        });
    };

    // Initialize Disqus comments
    if ($('#content').attr('data-id') && config['disqus-shortname'] != '') {

        $('.comments-trigger').on('click', function(event) {
            event.preventDefault();

            if ($('#disqus_thread').length) {
                $('.comments').toggleClass('active');
            }else{
                $('.comments').append('<div id="disqus_thread"></div>').addClass('active');

                var url = [location.protocol, '//', location.host, location.pathname].join('');
                var disqus_config = function () {
                    this.page.url = url;
                    this.page.identifier = $('#content').attr('data-id');
                };

                (function() {
                var d = document, s = d.createElement('script');
                s.src = '//'+ config['disqus-shortname'] +'.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();
            };

            $(".sidebar").trigger("sticky_kit:detach");
            $(".sidebar").stick_in_parent();

        });

    };

    // Infinite scroll
    var currentPage = 1;
    var pathname = window.location.pathname;
    var $document = $(document);
    var $result = $('.loop-medium');
    var buffer = 100;
    var step = 0;

    var ticking = false;
    var isLoading = false;

    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = $document.height();

    // remove hash params from pathname
    pathname = pathname.replace(/#(.*)$/g, '').replace('/\//g', '/');

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = $document.height();
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(infiniteScroll)
        }
        ticking = true;
    }

    function infiniteScroll () {
        // return if already loading
        if (isLoading) {
            return;
        }

        // return if not scroll to the bottom
        if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
            ticking = false;
            return;
        }

        // return if currentPage is the last page already
        if (currentPage === maxPages) {
            return;
        }

        if (step >= config['infinite-scroll-step']) {
            return;
        };

        isLoading = true;

        // next page
        currentPage++;

        // Load more
        var nextPage = pathname + 'page/' + currentPage + '/';

        $.get(nextPage, function (content) {
            $result.append($(content).find('.post'));
            step++;

        }).fail(function (xhr) {
            // 404 indicates we've run out of pages
            if (xhr.status === 404) {
                window.removeEventListener('scroll', onScroll, {passive: true});
                window.removeEventListener('resize', onResize);
            }

        }).always(function () {
            $(".sidebar").trigger("sticky_kit:detach");
            $(".sidebar").stick_in_parent({
                offset_top: 15
            });
            if (currentPage == maxPages) {
                $('#load-posts').addClass('last').text($('#load-posts').attr('data-end'));
            };
            lastDocumentHeight = $document.height();
            isLoading = false;
            ticking = false;
        });
    }

    if ($('.pagination').length) {
        if (config['load-more']){
            $('#load-posts').addClass('active');
        }

        if (config['infinite-scroll'] && config['load-more']) {
            window.addEventListener('scroll', onScroll, {passive: true});
            window.addEventListener('resize', onResize);
        }

        $('#load-posts').on('click', function(event) {
            event.preventDefault();

            // return if currentPage is the last page already
            if (currentPage === maxPages) {
                return;
            }

            // next page
            currentPage++;

            // Load more
            var nextPage = pathname + 'page/' + currentPage + '/';

            $.get(nextPage, function (content) {
                $result.append($(content).find('.post'));
                step = 0;
            }).always(function () {
                $(".sidebar").trigger("sticky_kit:detach");
                $(".sidebar").stick_in_parent({
                    offset_top: 15
                });
                if (currentPage == maxPages) {
                    $('#load-posts').addClass('last').text($('#load-posts').attr('data-end'));
                };
                lastDocumentHeight = $document.height();
                isLoading = false;
                ticking = false;
            });;

        });

        infiniteScroll();
    };

    // Validate Subscribe input
    $('.gh-signin').on('submit', function(event) {
        var email = $('.gh-input').val();
        if (!validateEmail(email)) {
            $('.gh-input').addClass('error');
            setTimeout(function() {
                $('.gh-input').removeClass('error');
            }, 500);
            event.preventDefault();
        };
    });

    // Validate email input
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 

    // Progress bar for inner post
    function progressBar(){
        var postContentOffsetTop = $('.post-content').offset().top;
        var postContentHeight = $('.post-content').height();
        if ($(window).scrollTop() > postContentOffsetTop && $(window).scrollTop() < (postContentOffsetTop + postContentHeight)) {
            var heightPassed = $(window).scrollTop() - postContentOffsetTop;
            var percentage = heightPassed * 100/postContentHeight;
            $('.progress').css({
                width: percentage + '%'
            });
        }else if($(window).scrollTop() < postContentOffsetTop){
            $('.progress').css({
                width: '0%'
            });
        }else{
            $('.progress').css({
                width: '100%'
            });
        };
    }

    // Go to top
    $('.go-top').on('click', function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

});