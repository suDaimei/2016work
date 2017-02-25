//焦点图的切换
$(function () {
    var sw = 0,
        focusCur=$(".focus-cur li"),
        focusPicList=$(".focus-pic"),
        focusImg=$(".focus-img");
    var len=2;
    var index=0;
    var timer;

    //focusCur.mouseover(function () {
    //    sw = focusCur.index(this);
    //    picShow(sw);
    //});

    //图片向左偏移
    function animate(offset){
        var left=parseInt(focusPicList.css('left'))+offset;
        if(offset>0){
            offset='+='+offset;
        }
        else{
            offset='-='+Math.abs(offset);
        }
        focusPicList.animate({'left':offset},300,function(){
            if(left>0){
                focusPicList.css('left',-1140*len);
            }
            if(left<(-1140*len)){
                focusPicList.css('left','60%');
            }
        })
    }
    function picShow(i) {
        focusCur.eq(i).addClass("cur").siblings("li").removeClass("cur");
    }
    //鼠标指针穿过元素事件
    focusCur.each(function () {
        $(this).bind('mouseenter', function () {
            if (focusPicList.is(':animated') || $(this).attr('class')=='cur') {
                return;
            }
            var myIndex = parseInt($(this).attr('index'));
            var offset = -1140 * (myIndex - index);
            animate(offset);
            index = myIndex;
            picShow();
        });
    });

    //自动播放图片
    function play(){
        sw=focusCur.index(this);
        timer=setInterval(function(){
            if(sw==focusCur.length){
                sw=0;
            }else{
                sw++;
            }
            animate(-1140);
            picShow(sw);
        },3000);
    }
    function stop(){
        clearInterval(timer);
    }
    focusImg.hover(stop,play);
    play();
});
