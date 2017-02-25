(function($){
    $.fn.tab=function(options){
        var defaults={
            eventName:"click",//触发方式
            _class:"selected",//当前选项
            parentToChild:".tab-box>div",//切换内容项
            _opaciry:'show',
            _height:'show',
            interval:3000//循环周期
        };
        var opts= $.extend(defaults,options);//设置的参数覆盖初始化的值

        return $(this).each(function(){//遍历多个对象
            var _this = $(this);

            //自动切换
            var i=-1;
            function autoscoll(){
                var selectLi=$("ul li",_this);
                i++;
                if(i>selectLi.length-1){
                    i=0;
                }
                animate(i);
                timer=setTimeout(autoscoll,opts.interval)
            }

            function animate(i){
                $("ul li",_this).eq(i).addClass(opts._class).siblings( ).removeClass(opts._class);//选中项添加class名  $("ul li",_this)在_this下查找ul li
                $(opts.parentToChild).siblings().hide().end().eq(i).animate({opacity:opts._opaciry,height:opts._height},500);
            }
            autoscoll();

            $(this).find("li").bind(opts.eventName,function(){//为li绑定事件
                if(timer){//判断是否自动切换
                    i=$(this).prevAll().length;
                    animate(i);
                }

                //不启用自动切换时，把上面的if语句去掉，下面注释中带有*的去掉注释

                //$(this).addClass(opts._class).siblings().removeClass(opts._class);//选中项添加class名 *
                //console.log($(this));
                //var index = $("ul li",_this).index($(this));//当前选中项li的索引值 *
                //获取偏移量的值   动画效果向左移动
                //var margin = $("div",opts.parentToChild).width()+parseInt($("div",opts.parentToChild).css('padding-left'))+parseInt($("div",opts.parentToChild).css('padding-right'));
                //margin = margin * index;
                //margin = margin * -1;
                //$(opts.parentToChild).siblings().hide().end().eq(index).show().siblings().hide();//没有设置动画效果
                //$(opts.parentToChild).stop().animate({marginLeft:margin+'px'},{duration:300});

                //$(opts.parentToChild).siblings().hide().end().eq(index).animate({opacity:opts._opaciry,height:opts._height},500); *

            });

        });

    };

})(jQuery);

