//;(function($){
//    $.fn.extend({
//        "focuscolor":function (li_col){
//            var def_col="#ccc";//默认获取焦点的颜色
//            var lst_col="#fff";//默认丢失焦点的颜色
//            //如果设置的颜色不为空，使用设置的颜色，为空则使用默认
//            li_col=(li_col==undefined)?def_col:li_col;
//            //遍历表项<li>中的全部元素
//            $(this).find("li").each(function(){
//                $(this).mouseover(function(){
//                   $(this).css("background-color",li_col);
//                })
//                .mouseout(function(){
//                    $(this).css("background-color",lst_col);
//                })
//            });
//            return $(this);//返回jQuery对象，保持链式操作
//        }
//    });
//})(jQuery);
$(function($){
    $.fn.extend({
        "focuscolor":function(li_col){
            var def_color="#ccc";//获取焦点的默认值
            var lst_color="#fff";//失去焦点的默认颜色值
            li_col=(li_col==undefined)?def_color:li_col;
            $(this).find("li").each(function(){
                $(this).mouseover(function(){
                    $(this).css("background-color",li_col);
                }).mouseout(function(){
                    $(this).css("background-color",lst_color);
                })
            });
            return $(this);
        }
    })
})(jQuery);