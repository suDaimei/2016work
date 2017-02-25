(function ($) {
    $.fn.scrollImg = function (option) {
        var defaults= {
            direction: 'left',
            parentWidth:0,
            scrollWidth: 0,
            scrollHeight:0,
            scrollCon: 'ul',
            unitSelector:'li',
            sliderNav:"",//圆点导航内容
            preSelector: "",//上一张
            nextSelector: "",//下一张
            interval: '',
            timer:6000,
            eventName: 'click',
            auto: true
        };
        var p = $.extend(defaults, option);
        var i;
        p.scrollWidth= p.scrollWidth? p.scrollWidth: p.parentWidth;
        return $(this).each(function () {
            var _this = $(this);
            var leftScroll=parseInt(p.scrollWidth),
                TopScroll=parseInt(p.scrollHeight),
                lengthLi= p.unitSelector.length;
            //默认left的值
            _this.css({
                "position":'absolute'
            });
            if(p.direction=='left'){//向左移动
                _this.css({"left":'-'+leftScroll});
            }
            if(p.direction=='top'){//向上移动
                _this.css({"top":'-'+TopScroll});
            }
            var scrollIMG={
                clones:function(){//复制滚动的第一份和最后一份
                    _this.find(p.unitSelector).eq(0).clone(true).appendTo(_this);
                    var lastLi= lengthLi-1;//获取最后一个li元素， -1的作用是复制了第一张
                    _this.find(p.unitSelector).eq(lastLi).clone(true).prependTo(_this);
                },
                scrollAnimate:function(index){//定义图片切换函数
                    var leftDistance= p.unitSelector*index+ p.unitSelector;//每一次移动的距离
                    if(p.direction=="left"){
                        _this.animate({"left":'-'+leftDistance+'px'},300);
                    }
                    if(p.direction=="top"){
                        _this.animate({"top":'-1'+leftDistance+'px'},300);
                    }

                    p.sliderNav.eq(index).addClass("cur").siblings().removeClass("cur");//圆点导航样式
                },
                preSelect:function(){//上一张按钮函数
                    i--;
                    if (i < 0) {
                        i=lengthLi-1;
                        if(p.direction=='left'){//向左移动
                            var leftDis=leftScroll*(i+2);//每一次移动的距离
                            _this.css({"left": "-"+leftDis});
                        }
                        if(p.direction=='top'){//向上移动
                            var topDis=TopScroll*(i+2);
                            _this.css({"top":"-"+topDis});
                        }

                    }
                    scrollIMG.scrollAnimate(i);
                },
                nextSelect:function(){//下一张按钮函数
                    i++;
                    if (i >lengthLi - 1) {
                        i = 0;
                        if(p.direction=='left'){
                            var leftNextDix=leftScroll*i;//每一次移动的距离
                            _this.css({"left": "-"+leftNextDix});
                        }
                        if(p.direction=='top'){
                            var topNextDix=TopScroll*i;
                            _this.css({"top":'-'+topNextDix});
                        }

                    }
                    scrollIMG.scrollAnimate(i);
                },
                playAuto:function(){
                    p.interval=setInterval(function(){
                        scrollIMG.nextSelect();
                    }, p.timer)
                },
                clearAuto:function(){
                    clearInterval(interval);
                }

            };
            scrollIMG.clones();//调用复制
            _this.find(p.prevSelector).on(p.eventName,function(){//上一张按钮调用
                scrollIMG.preSelect();
            });
            d.prevSelector && this.find(d.prevSelector).click(d.prev);
            _this.find(p.nextSelector).bind(p.eventName,function(){//下一张按钮调用
                scrollIMG.nextSelect();
            });
            _this.find(p.sliderNav).bind(p.eventName,function(){//圆点调用
                i=$(this).index();
                scrollIMG.scrollAnimate(i);
            });
            _this.find(p.parentWidth).hover(function(){//鼠标经过滚动区域时，显示箭头
                p.preSelector.css({"opacity":1});
                p.nextSelector.css({"opacity":1});
                if(p.auto==true){
                    scrollIMG.clearAuto();
                }
            },function(){
                p.preSelector.css({"opacity":0});
                p.nextSelector.css({"opacity":0});
                if(p.auto==true){
                    scrollIMG.playAuto();
                }
            });

            if(p.auto==true){//自动播放
                scrollIMG.playAuto();
            }

            console.log(_this.find(p.prevSelector));
        });

    }
})(jQuery);
