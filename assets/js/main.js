/**
 * Main JS file for Haihara
 */

jQuery(document).ready(function($) {

    var config = {
        'share-selected-text': true,
        'load-more': true,
        'infinite-scroll': true,
        'infinite-scroll-step': 1,
        'disqus-shortname': 'hauntedthemes-demo'
    };

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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

        var nextPage = 3;
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
        swiperRecent.on('reachEnd', function(event) {

            var parseUrl = '&include=tags&limit=' + pagination + '&page=' + nextPage + '&filter=featured:false';
            if ($('body').attr('data-author')) {
                parseUrl = parseUrl + '+author:' + $('body').attr('data-author');
            }else if($('body').attr('data-tag')){
                parseUrl = parseUrl + '+tag:' + $('body').attr('data-tag');
            }

            $.ajax({
                url: ghost.url.api("posts") + parseUrl,
                type: 'get'
            }).done(function(data) {
                $.each(data.posts, function(i, post) {
                    $.ajax({
                        url: ghost.url.api("users") + '&filter=id:' + post.author,
                        type: 'get'
                    }).done(function(data) {
                        $.each(data.users, function(i, users) {
                            insertPost(post, users, swiperRecent);
                        });
                    });
                });
                nextPage += 1;
            }).fail(function(err) {
                console.log(err);
            });

        });

        if ($('.recent-slider .swiper-slide').length <= pagination) {
            $('.recent-slider .swiper-button-next, .recent-slider .swiper-button-prev').hide();
        };

    };

    // Get first number of words from a string
    function getWords(str) {
        return str.split(/\s+/).slice(0,40).join(" ");
    }

    // Append posts on masonry container
    function insertPost(postData, authorData, swiperRecent) {

        var d = postData.published_at.slice(0, 10).split('-');
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthNumber = d[1];
        if (monthNumber.slice(0,1) == '0') {
            monthNumber = monthNumber.slice(1,2) - 1;
        }else{
            monthNumber--;
        };

        var featured = '';

        if (postData.featured) {
            featured = 'featured';
        };

        if (d[2].slice(0,1) == '0') {
            d[2] = d[2].slice(1,2);
        }

        var datetime = d[0] +'-'+ d[1] +'-'+ d[2];
        var date = monthNames[monthNumber] + ' ' + d[2] + ', ' + d[0];
        var excerpt;
        if (postData.custom_excerpt != null) {
            excerpt = postData.custom_excerpt;
        }else{
            excerpt = getWords($(postData.html).text());
        };

        var data = {
            comment_id: postData.comment_id,
            title: postData.title,
            date: {
                "datetime": datetime,
                "date": date
            },
            featured: featured,
            url: postData.url,
            excerpt: excerpt,
            author: {
                "slug": authorData.slug,
                "name": authorData.name
            },
            tags: function(){
                if (!$.isEmptyObject(postData.tags)) {
                    data.tags.tag = postData.tags.slice( 0, 5 );
                    return true;
                };
            },
            feature_image: function(){
                if (postData.feature_image != '' && postData.feature_image != null) {
                    return postData.feature_image;
                };
            },
        }

        var template = [
            '<article class="post post-card {{#featured}}featured{{/featured}} {{^feature_image}}no-image{{/feature_image}} {{#tags}}{{#tags.tag}}tag-{{slug}} {{/tags.tag}}{{/tags}}" data-id="{{comment_id}}">',
                '<div class="content">',
                    '<div class="content-holder">',
                        '<h3 class="post-title"><a href="{{url}}" title="{{title}}">{{title}}</a></h3>',
                        '<p>',
                            '{{excerpt}}',
                        '</p>',
                        '<a href="{{url}}" title="{{title}}" class="read-more">Read more</a>',
                    '</div>',
                    '{{#feature_image}}',
                        '<div class="img-holder">',
                            '<a href="{{url}}" title="{{title}}">',
                                '<span style="background-image: url({{feature_image}})"></span>',
                            '</a>',
                        '</div>',
                    '{{/feature_image}}',
                '</div>',
            '</article>'
        ].join("\n");

        var post = Mustache.render(template, data);
        post = $(post);
        swiperRecent.appendSlide('<div class="swiper-slide">' + post[0].outerHTML + '</div>');
    }

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
        if (top > (h/1.33)) {
            $('body.menu-visible .backdrop, body.search-visible .backdrop').click();
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

        $('.zoom').fluidbox();

        $(window).on('scroll', function(event) {
            $('.zoom').fluidbox('close');
        });

    });

    $(window).on('resize', function(event) {
        w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
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
                $('#load-posts').addClass('last').text('No more posts');
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
                    $('#load-posts').addClass('last').text('No more posts');
                };
                lastDocumentHeight = $document.height();
                isLoading = false;
                ticking = false;
            });;

        });

        infiniteScroll();
    };

    // Hide widget if no posts
    $('.widget').each(function(index, el) {
        var count = $(this).find('li').length;
        if (count == 0) {
            $(this).remove();
        };
    });

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

});