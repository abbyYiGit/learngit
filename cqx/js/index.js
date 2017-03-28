(function( $ ) {

    //Function to animate slider captions
    function doAnimations( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.css('animation-delay',$this.data('delay')).addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType).removeClass('inv');
            });
        });
    }

    //Variables on page load
    var $myCarousel = $('#slides'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

    //Initialize carousel
    $myCarousel.carousel();

    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);

    //Pause carousel
    $myCarousel.carousel('pause');


    //Other slides to be animated on carousel slide event
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });

    $myCarousel.on('slid.bs.carousel', function (e) {
        $('.slide-btn, .slideTitle, .slideExcerpt').addClass('inv');
    });

})(jQuery);

$(document).ready( function() {
    new WOW().init();
	fnSonNav(".mainNavWrap"); //子导航动效
	setNavLocation(); //点击导航跟随定位

	$('#slides').carousel({
        interval:   4000
    });

    var clickEvent = false;
    $('#slides').on('click', '.navListBox li', function() {
        clickEvent = true;
        $('.navListBox li').removeClass('active');
        $(this).addClass('active');
    }).on('slid.bs.carousel', function(e) {
        if(!clickEvent) {
            var count = $('#slides .navListBox').children().length -1;
            var current = $('#slides .navListBox li.active');
            current.removeClass('active').next().addClass('active');
            var id = parseInt(current.data('slide-to'));

            if(count == id) {
                $('#slides .navListBox li').first().addClass('active');
            }
        }
        clickEvent = false;
    });
});
//start 子导航动效
function fnSonNav(nav) {
    var $nav = $(nav);
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $nav.css({
            	"position":"fixed",
            	"top":"0",
            	"margin-top":"0",
                "zIndex":"99"
            });
        } else {
            $nav.css({
                "position": "absolute",
            	"top":"0",
            	"margin-top":"20px"
            });
        }
        ;
    });
};
// 子导航动效 end
//点击子导航跟随定位	
function setNavLocation() {
    var aNavBox = $("section");

    var iNum = 0;
    var currentIndex = 0;
    var navH = parseInt($(".webMapNav").css("height"));

    $(".menu li").on("click", function () {
        $(".menu li").removeClass("active");
        $(this).addClass("active")
        currentIndex = $(this).index();

        iNum = aNavBox.eq(currentIndex).offset().top;
        $("html,body").animate({
            "scrollTop": iNum
        }, 500);

    });
};