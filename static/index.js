/**
 * @extends jquery 2.1.1
 * @fileOverview CSS3动画 调用JS
 * @author Surging
 * @email surging2@qq.com
 * @version 0.1
 * @date 2014/11/15
 * Copyright (c) 2010-2015   一站网络集团
 *
 */
!function () {
    'use strict';

    //调试开关
    var debug = {
        isDebug: false,//是否调试模式
        pageNum: 5
    };

    var playing = true,//是否正在动画中
        motionDuration = 1700,//动画持续时间
        transformNum = 0,//记录当前页码
        scrollDuration = 700,//滚动切换时间
        pageNum = 5,//总共的页数
        readNum = 0;//记录共浏览页数

    var timer = null, timer1 = null, timer2 = null;

    var xtAnimate = {
        /**
         * 运动
         * @param direction 滚动方向 true：向下 false：向上
         */
        motion: function (direction) {
            $('#J_ScrollTip').remove();

            //如果已全部阅读完毕，将动画执行时间设为0，目的为了第二次浏览无需再等待
            if (readNum >= pageNum) {
                motionDuration = 0;
            }

            //当浏览到最后一页再次向下滚动 或者 向上滚动两次以上时，当前页码设置0
            if (transformNum > (pageNum - 1) || transformNum <= 0) {
                transformNum = 0;
            }
            var index = direction ? ++transformNum : --transformNum;
            //禁止第一页向上滚动
            if (index < 0) {
                playing = false;
                return;
            }
            this.scroll(index);

            //如果已全部阅读完毕
            if (readNum > pageNum) {
                this.notionDelay(true);
                return;
            }
            //给动画加个 定时器，防止动画未执行完毕就滚动切换
            var $lis = $('#J_RightBtns').find('li'),
                $me = $lis.eq(index),
                $next = $me.next('li');

            if (direction) {//向下滚动
                //如果下一个页面已经浏览过，或者是看到一半就向上滚动再次向下滚动
                if ($next && $next.data('isread') == 1 || $me.data('ka') == 'ka') {
                    this.notionDelay(true);//定时器的时间只为切换时间
                } else {
                    this.notionDelay(false);//定时器的时间为切换时间 + 动画执行时间
                }
            } else {
                //看到一半就向上滚动再次向下滚动，给当前页面记录一下
                $next.attr('data-ka', 'ka');
                this.notionDelay(true);
            }
        },
        /**
         * 滚动切换页面操作
         * @param index 当前页码
         */
        scroll: function (index) {
            $('#J_Content').removeClass().addClass('content-box transform3d' + index);
            //因为火狐不支持hide动画，会依旧执行，所有用添加父级样式方式处理
            $('#J_Banner,#J_ScrollTip,#J_RightBtns,.content-' + (index + 1)).addClass('animate-parent');
            //给右边快捷点击按钮添加对应样式
            $('#J_RightBtns').find('li').removeClass('cur').eq(index == pageNum ? 0 : index).addClass('cur');
            this.rogress(index);
            return this;
        },
        /**
         * 顶部进度条操作
         * @param index
         */
        rogress: function (index) {
            //如果是刚加载页面，需保持进度条时间与正在进行动画时间一致（可切换时间）
            if (index == 0) {
                this.notionDelay();
            }
            index = index == pageNum ? 0 : index;

            var $lis = $('#J_RightBtns').find('li'),
                $me = $lis.eq(index);

            if ($me.data('isread') != 1) {//加载过进度条的将不再次加载

                readNum++;//浏览过将其记录，用于计算可滚动时间差

                $me.attr('data-isread', 1);

                //页面滚动完就加载进度条
                clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    $('#J_RogressBar').addClass('rogress-bar');
                }, scrollDuration);

                //动画执行完毕注销进度条
                clearTimeout(timer2);
                timer2 = setTimeout(function () {
                    $('#J_RogressBar').removeClass('rogress-bar');
                }, motionDuration + scrollDuration);
            }
        },
        /**
         * 解锁  解锁时间 = 动画时间 + 滚动时间
         */
        notionDelay: function (time) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                playing = false;
            }, time ? scrollDuration : motionDuration + scrollDuration);
        }
    };

    var imgUtil = {
        timer: null,
        isLoad: true,
        /**
         * !TODO 该方法不对的
         * @param callback
         */
        isImgLoad: function (callback) {
            callback();
        }
    };

    /**
     * 图片加载完毕
     */
    imgUtil.isImgLoad(function () {
        setTimeout(function () {//模拟图片加载完毕，!TODO 暂时未发现图片加载完毕方法
            xtAnimate.scroll(debug.isDebug ? debug.pageNum - 1 : 0);
            $('#J_Loader').hide();
        }, 2500);
    });

    /**
     * 滚动提示点击进入下一页
     */
    $('#J_ScrollTip').on('click', function () {

        if (playing)return;
        playing = true;

        xtAnimate.motion(true);
    });

    /**
     * 右侧快捷点击操作
     */
    $('#J_RightBtns').find('li').on('click', function () {

        if (playing)return;
        playing = true;

        $('#J_RogressBar').removeClass('rogress-bar');

        if (readNum < pageNum) {

            //没有浏览过的快捷点击 强制为依次查看
            xtAnimate.motion(true);
        } else {

            transformNum = $(this).index();
            xtAnimate.scroll(transformNum).notionDelay(true);
        }
    });

    //键盘码
    var KEY = {
        DOWN: 40,
        SPACE: 32,
        RIGHT: 39,
        UP: 38,
        LEFT: 37
    };

    /**
     * 绑定事件 鼠标滚轮时间和键盘事件
     */
    $(document).on('mousewheel', function (event) {

        if (playing)return;
        playing = true;

        //event.deltaY == -1 为向下滚动， event.deltaY == 1 为向上滚动
        xtAnimate.motion(event.deltaY == -1);

    }).on('keyup', function (event) {

        if (playing)return;
        playing = true;

        var _key = event.keyCode;
        if (_key == KEY.DOWN || _key == KEY.SPACE || _key == KEY.RIGHT) {
            //键盘下、空格、右 将向下滚动
            xtAnimate.motion(true);
        } else if (_key == KEY.UP || _key == KEY.LEFT) {
            //键盘上、左 将向上滚动
            xtAnimate.motion(false);
        }
    });
}();