$(function(){
    var $sul=$(".scroll>ul").find("li"),
        $dot=$("#dot").find("span"),
        i=-1,
        interval=1000,
        //evt='mouseover',
        timer;
    var animateImg=function(index){
            $sul.eq(index).animate({opacity:1},500);
            $sul.eq(index).siblings().animate({opacity:0},500).css({//焦点图切换样式
                        "position":"absolute",
                        "z-index":0
            });

        //$sul.eq(index).css(//焦点图切换样式
        //    {
        //        "position":"absolute",
        //        "z-index":1,
        //        "opacity":1
        //    }
        //).siblings().css(
        //    {
        //        "position":"absolute",
        //        "z-index":0,
        //        "opacity":0
        //    }
        //);
        $dot.eq(index).addClass("cur").siblings().removeClass("cur");//为圆点增加class名
            //console.log(index);
        },
        play=function(){//自动切换图片
            i++;
            if(i==$sul.length){
                i=0;
            }
            animateImg(i);
            timer=setTimeout(play,interval);
        };

    $dot.bind('click',function(){
           //i=$(this).prevAll().length;
        i=$(this).index();
        animateImg(i);
    });
    $(this).hover(function(){
        clearTimeout(timer);
    },function(){
        //i=$(this).index();
        //animateImg(i);
        play();
    });
    play();

});