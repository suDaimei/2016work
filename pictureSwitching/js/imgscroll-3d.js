$(function () {
    var $container = $("#container"),//获取包含滚动内容的整个容器
        $J_Promo = $("#J_Promo"),//获取可见滚动区域的容器
        $J_Box = $("#J_Box"),//获取滚动内容的容器
        $J_BoxDiv=$J_Box.find("div"),//获取图片所在的容器
        $J_BoxDivW=$J_BoxDiv.width(),//获取图片所在的容器的宽
        $sliderNav = $("#slider-nav").find("span"),//获取切换圆点元素
        $sliderPage = $("#slider-page"),//获取左右箭头的父级元素
        $sliderPageA = $sliderPage.find("a"),//获取左右箭头元素
        i=0;

    var scrollanimate=function(index){//定义图片切换函数
        var leftDistance=parseInt($J_BoxDivW)*(-index);//每一次移动的距离
        $J_Box.css({//为图片切换增加样式
            "position":'absolute',
            "-webkit-transition-duration":0.5+'s',
            "-moz-transition-duration":0.5+'s',
            "-ms-transition-duration":0.5+'s',
            "transition-durantion":0.5+'s',
            "-webkit-transform":'translate3d('+leftDistance+'px'+',0,0)',
            "-moz-transform":'translate3d('+leftDistance+'px'+',0,0)',
            "-ms-transform":'translate3d('+leftDistance+'px'+',0,0)',
            "transform":'translate3d('+leftDistance+'px'+',0,0)',
            "-webkit-backface-visibility":'hidden',
            "-moz-backface-visibility":'hidden',
            "-ms-backface-visibility":'hidden',
            "backface-visibility":'hidden',
            "left":0
        });

        $sliderNav.eq(index).addClass("cur").siblings().removeClass("cur");//切换圆点增删样式
    };


    $sliderNav.bind("click",function(){//为切换圆点绑定点击事件
        //i++;
        //if(i>$sliderNav.length){
        //    i=0;
        //}
        i=$(this).index();
        scrollanimate(i);
    });

    $container.hover(function(){//鼠标经过滚动区域时，显示上一张箭头
        $sliderPageA.css({
            "opacity": 1
        });
    },function(){//鼠标离开滚动区域时，显示下一张箭头
        $sliderPageA.css({
            "opacity": 0
        });
    });

});
