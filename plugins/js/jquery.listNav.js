(function($){
    $.fn.listNav=function(options){
        var defaults={
            _class:"optnFocus",//当前选项的class
            eventName:"mouseover",
            curent:".sort",//指示箭头
            _nextul:".tip"//显示的ul项
        };

    var opts= $.extend(options,defaults);

    return $(this).each(function(){
            var curY;//获取所选项的Top值
            var curH;//获取所选项的height值
            var curL;
            var curW;//获取所选项的width值
            var  srtY;//设置提示箭头的Top值
            var srtX;//设置提示箭头的Left值
            var objL;//获取当前对象

            //设置当前位置的数值
            function setInitValue(obj){
                curY=obj.offset().top;
                curL=obj.offset().left;
                curH=obj.height();
                curW=obj.width();
                srtY=curY+curH-6+'px';
                srtX=curL+curW/4+'px';
            }
        $(this).bind(opts.eventName,function(){//绑定鼠标经过事件
            objL=$(this);//获取当前对象
            setInitValue(objL);//设置当前对象的值
            var allY=curY+curH+'px';
            objL.addClass(opts._class);
            objL.next("ul").show()
                .css({"top":allY ,"left":curL});
            $(opts.curent).show()
                .css({"top":srtY,"left":srtX});
            console.log(allY);
        })
            .mouseout(function(){
                $(this).removeClass(opts._class);
                $(this).next("ul").hide();
                $(opts.curent).hide();
            });
        $(opts._nextul).mouseover(function(){//为子项ul绑定鼠标经过事件
            $(this).show();
            objL=$(this).prev("li");
            setInitValue(objL);
            objL.addClass(opts._class);
            $(opts.curent).show()
                .css({"top":srtY,"left":srtX});

        })
            .mouseout(function(){
                $(this).hide();
                $(this).prev("li").removeClass(opts._class);
                $(opts.curent).hide();
            })
    });

    }
})(jQuery);