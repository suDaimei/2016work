/**
 * @fileOverview html5.js
 * @author Surging
 * @email surging2@qq.com
 * @version 1.0
 * @date 2015/02/04
 * Copyright (c) 2015-2016   DTAO.ORG
 */
!function () {
    var e = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),
        i = e.length;
    while (i--) {
        document.createElement(e[i]);
    }

    var isIE6 = function () {
        var ua = window.navigator && window.navigator.userAgent || '',
            m = ua.match(/MSIE ([\w.]+)/);

        return !!(m && m[1] === '6.0');
    };
    if (isIE6()) {
        alert('fuck you！');
        location.href = '//www.shikee.com';
    }
}();
/**
 * @fileOverview IE9以下响应式用添加样式的方法来处理
 * @author Surging
 * @email surging2@qq.com
 * @version 0.1
 * @date 2015/02/04
 * Copyright (c) 2015-2016   DTAO.ORG
 */
!function () {
    var classUtil = {
        hasClass: function (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass: function (obj, cls) {
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        },
        removeClass: function (obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }
    };

    var ltIE9 = {
        add: function () {
            var windowWidth = document.body.clientWidth;
            if (windowWidth <= 1220 && windowWidth > 1010) {
                classUtil.addClass(document.body, 'lt1220');
            } else if (windowWidth <= 1010 && windowWidth > 800) {
                classUtil.addClass(document.body, 'lt1010');
            } else {
                if (windowWidth <= 800) {
                    classUtil.addClass(document.body, 'lt800');
                }
            }
            return this;
        },
        remove: function () {
            var windowWidth = document.body.clientWidth;
            if (windowWidth > 1220) {
                classUtil.removeClass(document.body, 'lt1220');
            }
            if (windowWidth > 1010) {
                classUtil.removeClass(document.body, 'lt1010');
            }
            if (windowWidth > 800) {
                classUtil.removeClass(document.body, 'lt800');
            }
        }
    };

    window.onload = function () {
        ltIE9.add();
        window.onresize = function () {
            ltIE9.add().remove();
        };
    };
}();