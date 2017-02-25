//焦点图的切换
$(function () {
    var sw = 0,
        focusCur=$(".focus-cur li"),
        focusPicLi=$(".focus-pic li"),
        focusPicList=$(".focus-pic"),
        focusImg=$(".focus-img");
    var timer;
    focusCur.mouseover(function () {
        sw = focusCur.index(this);
        picShow(sw);
    });

    function picShow(i) {
        focusCur.eq(i).addClass("cur").siblings("li").removeClass("cur");
        //focusPicLi.eq(i).fadeIn(400).siblings("li").fadeOut(400);
        focusPicLi.eq(i).css({"opacity":"1","z-index":"1","position":"absolute"}).siblings("li").css({"opacity":"0","z-index":"0","position":"absolute"});
    }

    //自动播放图片
    function play(){
        sw=focusCur.index(this);
        timer=setInterval(function(){
            if(sw==focusCur.length){
                sw=0;
            }else{
                sw++;
            }
            picShow(sw);
        },1000);
    }
    function stop(){
        clearInterval(timer);
    }
    focusImg.hover(stop,play);
    play();
});
