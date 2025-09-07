jQuery(document).ready(function($) {
    "use strict";
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: false,
        animationLoop: true,
        slideshow: true,
        minItems: 0,
        maxItems: 7,
        itemWidth: 166,
        itemMargin: 25
            /*asNavFor: '#slider'*/
    });

    $('.prev').on('click', function() {
        $('#carousel').flexslider('prev')
        return false;
    })

    $('.next').on('click', function() {
        $('#carousel').flexslider('next')
        return false;
    })

    $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: true
            /*sync: "#carousel"*/
    });
    /********* SIDEBAR SCROLL **********/
    function start_nano() {
        if ($(window).width() < 992) {
            $(".nano").nanoScroller({ destroy: true });
            $(".blog-single-content-wrap").height('auto');
            $(".nano-content").css('position', 'relative');
        } else {
            $(".blog-single-content-wrap").height($(".blog-single-media").height());
            $(".sidebar.shop-single").height($(".product-single-wrap").outerHeight(true));
            $(".nano-content").css('position', 'absolute');
            $(".nano").nanoScroller({
                sliderMaxHeight: 200,
                sliderMinHeight: 40
            });
        }
    }

    $(".btn-noticias").click(function() {
        $(".div-noticias").toggleClass("activo");
    });

    $(".tab_content").hide();
    $("ul.tabs li:first").addClass("active").show();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab_content").hide();

        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });

});