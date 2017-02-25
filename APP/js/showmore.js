$(document).ready(function(){
    $('a.mune-icon').click(function(e){
        $('.type-panel').fadeIn(200);
        $('body').append('<div id="fade"></div>');
        $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(200);
        e.stopPropagation();
    });
    $('#fade').click(function(){
        $('.type-panel , #fade').fadeOut(200);
        return false;
    });

});

