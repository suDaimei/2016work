/**
 * Created by Administrator on 2015/5/27.
 *  Author TERA
 */
function autoScroll(obj){
    $(obj).find("ul").animate({
        marginTop : "-50px"
    },500,function(){
        $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
    });
};
setInterval('autoScroll(".maquee")',3000);

;(function($){
    $.fn.imgSlider=function(opts){
        var defaultVal={
            conClass:'',
            btnClass:'',
            cur:'',
            bind:'hover',
            delay:500,
            left:'',
            right:'',
            an:'0',
            auto:false,
            autoSpeed:3000
        };
        var obj=$.extend(defaultVal,opts),
            btn=$(this).find(obj.btnClass),
            con=$(this).find(obj.conClass),
            prev=$(this).find(obj.left),
            next=$(this).find(obj.right),
            len=con.children().length,
            evt =obj.bind,
            anim=obj.an,
            i= 0,
            page=1,
            c= 1,
            timer;
        var page_count=Math.ceil(len/c);
        return this.each(function(){
            btn.children().eq(0).addClass(obj.cur);
            con.children().css({"opacity":0}).eq(0).css({"opacity":1});
            function anima(i){
                btn.children().removeClass(obj.cur).eq(i).addClass(obj.cur);
                switch (anim){
                    case '0':
                        con.children().hide().eq(i).show();
                    case 'opacity':
                        con.children().css({"opacity":0}).eq(i).css({"opacity":1});
                }
            }
            next.click(right);
            prev.click(left);

            if(evt=='hover'){// 为切换点绑定事件
                btn.children().hover(function() {
                    i = $(this).index();
                    anima(i);
                });
            }else{
                btn.children().bind(evt,function(){
                    i=$(this).index();
                    anima(i);
                });
            };
            function right(){//右箭头切换图片
                if(!con.is(":animated")) {
                    if (page == page_count) {
                        anima(0);
                        page = 1;
                    } else {
                        anima(page*c);
                        page++;
                    }
                }
            }
            function left(){//左箭头切换图片
                if(!con.is(":animated")) {
                    if (page ==1) {
                        anima((page_count-1)*c);
                        page=page_count;
                    } else {
                        anima((page-2)*c);
                        page--;
                    }
                }
            }
            function autoRun(){//自动切换图片函数
                timer=setInterval(function(){
                    i++;
                    if(i>=len){
                        i=0;
                    }
                    anima(i);
                },obj.autoSpeed);
            };
            if(obj.auto){//判断是否启用了自动切换
                $(this).hover(function(){
                    clearInterval(timer);
                },function(){
                    autoRun();
                });
                autoRun();
            };
        });
    };
})(jQuery);