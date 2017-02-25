$(function(){
    //var index=0,len=$('.right-focus li').length,_timer=null;
    //var index=0;
    //切换
    function showTab(index){
        $('.right-focus li').eq(index).addClass('cut-on').siblings().removeClass('cut-on');
        $('.content-box article').eq(index).stop(true,true).slideDown('slow').siblings().slideUp('slow');
    }
    $('.right-focus li').mouseenter(function(){
        var index=$(this).index();
        showTab(index);
    });
});

//fadeLoad
$(function(b) {
    b.fn.fakeLoader = function(m) {
        var f = b.extend({
            timeToHide: 1200,
            pos: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: "999",
            bgColor: "#00C6C0"
        }, m);
        var d = b(this);
        var c = {position: f.pos,width: f.width,height: f.height,top: f.top,left: f.left};
        d.css(c);
        setTimeout(function() {
            b(d).fadeOut()
        }, f.timeToHide);
        return this.css({backgroundColor: f.bgColor,zIndex: f.zIndex})
    };
    function a() {
        var c = b(window).width();
        var e = b(window).height();
        b(".loadcon").css({position: "absolute",left: (c / 2),top: (e / 2)})
    }
    b(window).load(function() {
        a();
        b(window).resize(function() {
            a()
        })
    })
}(jQuery));
