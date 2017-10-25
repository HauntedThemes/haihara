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

    if ($('.featured-slider').length) {
        var swiperFeatured = new Swiper('.featured-slider .swiper-container', {
            navigation: {
                nextEl: '.featured-slider .swiper-button-next',
                prevEl: '.featured-slider .swiper-button-prev',
            },
            spaceBetween: 30,
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false
            // },
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

        if ($('.featured-slider .swiper-slide').length < 2) {
            $('.featured-slider .swiper-button-next, .featured-slider .swiper-button-prev').hide();
        };

    };

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

    // Initialize Disqus comments
    if ($('#content').attr('data-id') && config['disqus-shortname'] != '') {

        $('.comments').append('<div id="disqus_thread"></div>')

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

    // var timeagoInstance = timeago();

    // var DisqusRecent = {
    //   init: function( config ) {
    //     this.api_key     = config.api_key;
    //     this.forum       = config.forum;

    //     this.fetchRecentComments();
    //   },

    //   fetchRecentComments: function() {
    //     $.ajax({
    //       url: "https://disqus.com/api/3.0/forums/listPosts.jsonp?forum="+this.forum+"&related=thread&api_key="+this.api_key,
    //       dataType: "jsonp",
    //       context: this,

    //       success: function(results) {
    //         $.each(results.response, function(index, val) {
    //             var date = val.createdAt;
    //             console.log(date);
    //             console.log(timeagoInstance.format(date));
    //         });
    //       }
    //     });
    //   }
    // }

    // $(function() {
    //   DisqusRecent.init({
    //     api_key:     'dhaJKRgBq7PWT1Ir4EISulTqsajfHyIpozGc4zRHMdyn5dQqioyn8giN96jfISlJ',
    //     forum:       'hauntedthemes-demo',
    //   });
    // });

      // Replace with your client ID from the developer console.
  // var CLIENT_ID = '426633516596-6upbjtvbdqvbd8gl2ahee0eof8au5e6c.apps.googleusercontent.com';

  // // Set authorized scope.
  // var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];


  // function authorize(event) {
  //   // Handles the authorization flow.
  //   // `immediate` should be false when invoked from the button click.
  //   var authData = {
  //     client_id: CLIENT_ID,
  //     scope: SCOPES,
  //     immediate: false
  //   };

  //   gapi.auth.authorize(authData, function(response) {
  //     console.log(response);
  //   });
  // }

  // authorize();

  // function queryAccounts() {
  //     // Load the Google Analytics client library.
  //     gapi.client.load('analytics', 'v3').then(function() {

  //       // Get a list of all Google Analytics accounts for this user
  //       gapi.client.analytics.management.accounts.list().then(handleAccounts);
  //     });
  //   }

  //   (function( gapi ) {
  //       gapi.client.setApiKey(apiKey); // your variable for apiKey
  //       window.setTimeout(checkAuth,1);

  //       function checkAuth() {
  //           gapi.auth.authorize({client_id: clientID, scope: scopes, immediate: true},   handleAuthResult);
  //       }

  //       function handleAuthResult(authResult) {
  //           var authorizeButton = document.getElementById('id-of-your-login-button');
  //           if (authResult && !authResult.error) {
  //               authorizeButton.style.visibility = 'hidden';
  //               makeApiCall();
  //           } else {
  //               authorizeButton.style.visibility = '';
  //               authorizeButton.onclick = handleAuthClick;
  //           }
  //       }

  //     function handleAuthClick(event) {
  //         gapi.auth.authorize({
  //             client_id: clientID,
  //             scope: scopes,
  //             response_type: 'code token id_token gsession',
  //             access_type: accessType,
  //             immediate: false
  //         }, handleAuthResult);
  //         return false;
  //      }
  //    })( gapi );    


    var CLIENT_ID = '426633516596-6upbjtvbdqvbd8gl2ahee0eof8au5e6c.apps.googleusercontent.com';
    var API_KEY = 'v1';
    var SCOPES = 'https://www.googleapis.com/auth/analytics.readonly';
    var filter = '';
    var exclude = [
        '/p/', 
        '/author/',
        '/tag/',
        '(not set)',
    ];

    $.each(exclude, function(index, val) {
        filter += 'ga:landingPagePath!@'+ val +';';
    });

    filter += 'ga:landingPagePath!=/';

    /**
    * Authorize Google Compute Engine API.
    */
    function authorization() {
    gapi.client.setApiKey(API_KEY);
    gapi.auth.authorize({
     client_id: CLIENT_ID,
     scope: SCOPES,
     immediate: true
    }, function(authResult) {
        if (authResult && !authResult.error) {
          var apiQuery = gapi.client.analytics.data.ga.get({
            'ids': 'ga:160750085',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
            'metrics': 'ga:entrances',
            'dimensions': 'ga:landingPagePath',
            'sort': '-ga:entrances',
            'filters'    : filter,
            'max-results': 20
          });
          apiQuery.execute(handleCoreReportingResults);
        } else {
          console.log('Auth was not successful');
        }
      }
    );
    }

    function handleCoreReportingResults(results) {
      if (!results.error) {
        var check = 0;
        $.each(results.rows, function(index, val) {
            var slug = val[0].substring(1).slice(0,-1);
            slug = slug.replace(/\\/g, '');
            $.get(ghost.url.api('posts'), {filter:"page:false+slug:"+slug}).done(function (data){
                if (data.posts[0] && check < 5) {
                    var viewText = 'views';
                    if (val[1] == 1) { viewText = 'view'; };
                    $('.most-viewed ul').append('<li><p class="views">'+ val[1] + ' ' + viewText + ' </p><a href="' + val[0] + '">' + data.posts[0].title + '</a></li>');
                    check++;
                };
            }).fail(function (err){
              console.log(err);
            });
        });
      } else {
        alert('There was an error: ' + results.message);
      }
    }

    /**
    * Driver for sample application.
    */
    $(window).load(authorization);

});