$(function(){
    var mainContent=$(".main-content"),
        //获取main-content到顶部的距离
        mainContentTopPosition=mainContent.offset().top+50,
        searchCategory=$(".search-category"),
        //获取search-category到顶部的距离
        searchCategoryTopPosition=searchCategory.offset().top,
        //获取search-category高度
        searchFooterH=$(".search-wrap").height,
        footer=$(".footer").offset().top;

    $(window).on('scroll', function () {
        //判断滚动的距离，如果滚动的距离大于top-fix到顶部的距离，添加.chs  class
        if($(window).scrollTop()>mainContentTopPosition){
            $(".top-fix").removeClass("chs");
        }else{
            $(".top-fix").addClass("chs");
        }
        //判断search-wrap是否需要固定位置
        if($(window).scrollTop()>searchCategoryTopPosition){
            $(".search-wrap").addClass("search-wrap-fix");
            $("#hp-holder").addClass("holder-height");
        }else{
            $(".search-wrap").removeClass("search-wrap-fix");
            $("#hp-holder").removeClass("holder-height");
        }
        //判断search-wrap与底部的距离

        if($(window).scrollTop()>footer-570){
            $(".search-wrap").css({
                position: 'absolute',
                top:(footer-570)-20
            })
        }else{
            $(".search-wrap").css({
                position:'',
                top:''
            })
        }

    });


});



