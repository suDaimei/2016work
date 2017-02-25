/**
 * Created by Administrator on 2015/3/21.
 */
$(function(){
    $("#login :input.k").focus(function(){
        if($(this).val() ==this.defaultValue){
            $(this).val("");
            $(this).addClass("selected");
        }
    }).blur(function(){
        if($(this).val() == ''){
            $(this).val(this.defaultValue);
            $(this).removerClass("selected");
        }
    });
});
