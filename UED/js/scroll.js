$(function(){
   var conTop=$(".con-top"),
       conTopHeight=conTop.offset().top;
    //滚动条滚动到一定的高度，J_ConTopfix固定
    $(window).on('scroll',function(){
        if($(window).scrollTop()>conTopHeight){
            $("#J_ConTopfix").addClass("con-top-height");
        }else{
            $("#J_ConTopfix").removeClass("con-top-height");
        }
    });
    //点击展开菜单
    $("#J_Navshow").click(function () {
        $(this).hide();
        $('.J_Navhidden').css('margin-left','43px');
        $(".hover-nav").show().animate({left:0,top:74+"px"},500);
    });
    //点击收缩菜单
    $(".J_Navhidden").click(function(){
         $(".hover-nav").animate({left:-370+"px",top:-320+"px"},500,function(){
             $("#J_Navshow").fadeIn(1000);
         });
    });

});
