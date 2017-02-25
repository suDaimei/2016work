(function($){
    $.fn.mask=function(msg,timer){
        //判断页面中是否存在遮罩层的DIV
        if(!loadDiv||!loadDiv[0]){
            //增加一个遮罩层的div
            var loadDiv=$("<div class='mask-loadDiv' style='position:absolute;z-index:9999;background:rgba(0,0,0,0.5)'></div>");
            //增加提示信息层
            var contentDiv=$("<div class='mask-content' style='position:relative;text-align:center;color: #fff'>");
            //计算遮罩层的宽度
            var loadDiv_width=$(this).width()+parseInt($(this).css("padding-left"))+parseInt($(this).css("padding-right"));
            //提醒信息写入contentDiv对象中
            contentDiv.append(msg);
            //设置遮罩层的宽度
            loadDiv.css("width",loadDiv_width);
            $(this).append(loadDiv.append(contentDiv));
            loadDiv.css("top",this[0].offsetTop);
            loadDiv.css("left",this[0].offsetLeft);
            loadDiv.css("padding-top",(loadDiv[0].offsetHeight-contentDiv[0].offsetHeight)/2);
        }
        //loadDiv.css("z-index",99999).animate({opacty:0.5},1000).css({filter:"Alpha(Opacity=50)"});
        loadDiv.animate({"height":114+'px'});
        return this;


    };
    $.fn.unmask=function(){
        var loadDiv=this.find(".mask-loadDiv");
        if(loadDiv){
            //移除 .mask-loadDiv 对象
            ($(".mask-loadDiv",$(this))).remove();
            return this;
        }
    }

})(jQuery);