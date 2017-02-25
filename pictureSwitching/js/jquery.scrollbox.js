(function($) {
    $.fn.scrollBox = function(p) {
        var d = {parentWidth: 0,width: 0,prevSelector: "",nextSelector: "",scrollWidth: 0,contSelector: "ul",unitSelector: "li",auto: 0,autoFun: "next",extend: null}
        d = $.extend(d, p);
        d.scrollWidth = d.scrollWidth ? d.scrollWidth : d.parentWidth;
        var cont = this.find(d.contSelector);
        if (this.find(d.unitSelector).length * d.width <= d.parentWidth) {
            cont.width(d.parentWidth);
            typeof d.extend == "function" && d.extend("failed");
            return this;
        }
        cont.append(cont.html() + cont.html());
        var totalWidth = this.find(d.unitSelector).length * d.width / 3;
        var canDo = true;
        d.done = function() {
        }
        d.prev = function() {
            if (!canDo)
                return;
            canDo = false;
            var left = parseInt(cont.css("margin-left"));
            left = isNaN(left) ? -totalWidth : left;
            if (left + d.scrollWidth > 0) {
                left = left % totalWidth - totalWidth;
                cont.css("margin-left", left);
            }
            cont.animate({"margin-left": left + d.scrollWidth}, function() {
                canDo = true;
                d.done()
            });
        };
        d.next = function() {
            if (!canDo)
                return;
            canDo = false;
            var left = parseInt(cont.css("margin-left"));
            left = isNaN(left) ? -totalWidth : left;
            if (left - d.scrollWidth < -totalWidth * 2) {
                left = left % totalWidth;
                cont.css("margin-left", left);
            }
            cont.animate({"margin-left": left - d.scrollWidth}, function() {
                canDo = true;
                d.done()
            });
        }
        cont.width(totalWidth * 3);
        d.prevSelector && this.find(d.prevSelector).click(d.prev);
        d.nextSelector && this.find(d.nextSelector).click(d.next);
        typeof d.auto == "number" && d.auto > 0 && setInterval(d[d.autoFun], d.auto);
        typeof d.extend == "function" && d.extend(d);
        return this;
    }
})(jQuery);