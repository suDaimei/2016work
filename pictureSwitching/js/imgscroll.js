$(function () {
    var $container = $("#container"),//获取包含滚动内容的整个容器
        $J_Box = $("#J_Box"),//获取滚动内容的容器
        $J_BoxLi = $J_Box.find("li"),//获取图片所在的容器
        $J_BoxLiW = $J_BoxLi.width(),//获取图片所在的容器的宽
        $sliderNav = $("#slider-nav").find("span"),//获取切换圆点元素
        $sliderPage = $("#slider-page"),//获取左右箭头的父级元素
        $sliderPageA = $sliderPage.find("a"),//获取左右箭头元素
        i = 0,
        interval,
        timer=6000;

    var $J_BoxLiWD = parseInt($J_BoxLiW) * (-1);//滚动之前的定位
    $J_Box.css({
        "position": 'absolute',
        "left": $J_BoxLiWD
    });
    var scrollImg={
        clone:function(){//复制前后各一张
            _lasgchild = $J_BoxLi.eq(0);
            _lasgchild.clone(true).appendTo($J_Box);
            var d = $J_BoxLi.length - 1;//获取滚动的最后一个元素
            _firstchild = $J_BoxLi.eq(d);
            _firstchild.clone(true).prependTo($J_Box);
        },
        scrollanimate:function(index){//定义图片切换函数
            var leftDistance = $J_BoxLiWD * index + $J_BoxLiWD;//每一次移动的距离
            //为图片切换增加样式
            $J_Box.animate({"left": leftDistance + 'px'},300);
            $sliderNav.eq(index).addClass("cur").siblings().removeClass("cur");//切换圆点增删样式

        },
        preslider:function(){//上一张按钮
            i--;
            if (i < 0) {
                i = $J_BoxLi.length - 1;
                var leftDistanceW = parseInt($J_BoxLiW) * (-1);
                var leftDistance = leftDistanceW * (i + 2);//每一次移动的距离
                $J_Box.css({
                    "left": leftDistance
                });
            }
            scrollImg.scrollanimate(i);
        },
        nextslider:function(){//下一张按钮
            i++;
            if (i > $J_BoxLi.length - 1) {

                i = 0;
                var leftDistanceW = parseInt($J_BoxLiW) * (-1);
                var leftDistance = leftDistanceW * i;//每一次移动的距离

                $J_Box.css({
                    "left": leftDistance
                });
            }
            scrollImg.scrollanimate(i);
            console.log(i);
        },
        play:function(){//播放
            interval=setInterval(function(){
                scrollImg.nextslider();
            },timer)
        },
        stops:function(){//停止
            clearInterval(interval);
        }
    };

    scrollImg.clone();

    $sliderPage.find(".slider-prev").bind("click", function () {
        scrollImg.preslider();
    });


    $sliderPage.find(".slider-next").bind("click", function () {

       scrollImg.nextslider();

    });


    $sliderNav.bind("click", function () {//为切换圆点绑定点击事件
        i = $(this).index();
        scrollImg.scrollanimate(i);
    });

    $container.hover(function () {//鼠标经过滚动区域时，显示上一张箭头
        $sliderPageA.css({
            "opacity": 1
        });
        scrollImg.stops();
    }, function () {//鼠标离开滚动区域时，显示下一张箭头
        $sliderPageA.css({
            "opacity": 0
        });
        scrollImg.play();
    });


    //针对手机的操作
    //禁用手机的默认滚动
    document.addEventListener('touchmove',function(event){
        event.preventDefault();
    },false);
    //手势向左滑动
    $J_Box.on('swipeLeft',function(){
        scrollImg.nextslider();
    });
    //手势向右滑动
    $J_Box.on('swipeRight',function(){
        scrollImg.preslider();
    });

    scrollImg.play();


});
