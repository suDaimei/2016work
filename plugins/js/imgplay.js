$(function () {
    var $sul = $(".scroll>ul").find("li"),//获取切换内容元素
        $dot = $("#slider-nav").find("span"),//获取切换圆点元素
        $sliderPage = $("#slider-page"),//获取左右箭头的父级元素
        $sliderPageA = $sliderPage.find("a"),//获取左右箭头元素
        i = 0,
        interval = 5000,//定义动画播放间隔的时间
        timer;
    var animateImg = function (index) {//定义切换内容函数
            //$sul.siblings().hide().end().eq(index).animate({opacity: 1}, 500);
            $sul.eq(index).animate({opacity: 1}, 500);
            $sul.eq(index).siblings().animate({opacity: 0}, 500).css({//焦点图切换样式
                "position": "absolute",
                "z-index": 0
            });
            $dot.eq(index).addClass("cur").siblings().removeClass("cur");//为圆点增加class名
        },
        play = function () {//自动切换图片
            timer = setInterval(function () {
                i++;
                if (i == $sul.length) {
                    i = 0;
                }
                animateImg(i);
            }, interval);
        };
    //为上一张箭头绑定事件
    $sliderPage.find(".slider-prev").bind("click", function () {
        i--;
        if (i < 0) {
            i = $sul.length - 1;
        }
        animateImg(i);
    });
    //为下一张箭头绑定事件
    $sliderPage.find(".slider-next").bind("click", function () {
        i++;
        if (i == $sul.length) {
            i = 0;
        }
        animateImg(i);
        console.log(i);
    });
    //为切换圆点绑定事件
    $dot.bind('click', function () {
        i = $(this).index();
        animateImg(i);
    });

    $("#container").hover(function () {//鼠标经过container容器，停止播放动画
        clearInterval(timer);
        $sliderPageA.css({
            "opacity": 1
        })
    }, function () {//鼠标离开container容器继续播放动画
        $sliderPageA.css({
            "opacity": 0
        });
        play();
    });
    play();

});