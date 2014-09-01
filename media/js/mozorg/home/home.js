/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    var $window = $(window);
    var $promos = $('.promo-grid');
    var $promoItems = $('.promo-grid .item');
    var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints || navigator.maxTouchPoints;
    var queryIsMobile;

    if (window.matchMedia) {
        queryIsMobile = matchMedia('(max-width: 659px)');
    }

    // for devices that don't support matchMedia we go off the
    // width of the #masthead .container as opposed to $window,
    // as this has a fixed size.
    var isSmallViewport = $('#masthead .container') < 460;

    function initFirefoxDownloadPromo() {
        var $downloadPromo = $('.firefox-download');
        //var $downloadButtonLinks = $('.firefox-download .download-other-desktop').detach();

        $downloadPromo.on('mouseenter focusin', function () {
            $downloadPromo.addClass('show');
        });

        $downloadPromo.on('mouseleave focusout', function () {
            $downloadPromo.removeClass('show');
        });

        //$downloadButtonLinks.css('display', 'block').appendTo('.firefox-download .secondary');
    }

    initFirefoxDownloadPromo();

    function initPromoHoverOver() {
        var $promoLarge = $('.promo-large-landscape, .promo-large-portrait');
        var $promoFaces = $('.promo-face > a');
        var scrollTimeout;

        $promoLarge.on('mousemove', function() {
            var $this = $(this);
            // for slightly less jank css transitions are only triggered
            // when the user is not scrolling
            if (!$promos.hasClass('scroll') && !$this.hasClass('show')) {
                $this.addClass('show');
            }
        });

        $promoLarge.on('mouseleave', function() {
            var $this = $(this);
            if ($this.hasClass('show')) {
                $this.removeClass('show');
            }
        });

        $promoLarge.on('click focus', function(e) {
            var $this = $(this);
            if (!$this.hasClass('show')) {
                e.preventDefault();
                $this.addClass('show');
            }
        });

        // when the inner link loses focus, hide the secondary content again
        // assumes a single link in the panel
        $('.promo-large-landscape > a, .promo-large-portrait > a').on('blur', function() {
            var $this = $(this);
            if ($this.parent().hasClass('show')) {
                $this.parent().removeClass('show');
            }
        });

        $promoFaces.on('mousemove', function() {
            var $this = $(this);
            // for slightly less jank css transitions are only triggered
            // when the user is not scrolling
            if (!$promos.hasClass('scroll') && !$this.hasClass('show')) {
                $this.addClass('show');
            }
        });

        $promoFaces.on('focus', function() {
            var $this = $(this);
            if (!$this.hasClass('show')) {
                $this.addClass('show');
            }
        });

        $promoFaces.on('mouseleave blur', function() {
            var $this = $(this);
            if ($this.hasClass('show')) {
                $this.removeClass('show');
            }
        });

        $(window).on('scroll', function() {
            clearTimeout(scrollTimeout);
            if (!$promos.hasClass('scroll')) {
                $promos.addClass('scroll');
            }

            scrollTimeout = setTimeout(function () {
                $promos.removeClass('scroll');
            }, 200);
        });
    }

    function revealPromos() {

        $promoItems.addClass('loaded');

        // for mobile or touch devies we don't reveal promos on scroll
        // if ((window.matchMedia && queryIsMobile.matches) || isSmallViewport || isTouch) {
        //     $promoItems.addClass('loaded');
        //     return;
        // }

        // $promoItems.waypoint(function(direction) {
        //     $(this).addClass('loaded');
        // }, {
        //   offset: '85%',
        //   triggerOnce: true
        // });
    }

    function initFacesGrid() {

        $promos.addClass('loading show-promos');
        setTimeout(function () {
            $promos.removeClass('loading');
        }, 50);

        revealPromos();
    }

    function initEllipsis() {
        var $tweet = $('.tweet .tweet-text');
        var title;

        if ($tweet.length > 0) {
            title = $.trim($tweet.text());

            $tweet.ellipsis({
                row: 4,
                onlyFullWords: true,
                callback: function () {
                    var text = $.trim($tweet.text());

                    if (text.match('[.]{3}$')) {
                        $tweet.attr('title', title);
                    }
                }
            });
        }
    }

    // function noScroll() {
    //     window.scrollTo(0, 0);
    // }

    // function initWelcomeOverlay() {
    //     var $window = $(window);
    //     var $body = $('body');

    //     if ($window.scrollTop() > 0) {
    //         $window.scrollTop(0);
    //     }

    //     $window.on('scroll.intro', noScroll);

    //     setTimeout(function () {
    //         $body.addClass('welcome');

    //         setTimeout(function () {
    //             $('#welcome-overlay').addClass('out');

    //             setTimeout(function () {
    //                 $body.removeClass('welcome');
    //                 $window.off('scroll.intro', noScroll);
    //                 initFacesGrid();
    //             }, 1500);
    //         }, 500);
    //     }, 50);
    // }

    // var showWelcome = false;

    initEllipsis();

    // if (showWelcome) {
    //     initWelcomeOverlay();
    // } else {
    //     initFacesGrid();
    // }

    initFacesGrid();
    initPromoHoverOver();

});
