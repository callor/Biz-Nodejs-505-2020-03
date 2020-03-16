/**
 * 상단 메뉴 자동 스크롤링
 */
$(function(){
    let preScroll = $(window).scrollTop()
    $(window).scroll(function(e){

        let curScroll = $(window).scrollTop()
        /*
        if(preScroll > curScroll) {
            $("ul.main-menu").css("top",0)
        } else {
            $("ul.main-menu").css("top",-100)
        }
        */
        preScroll = curScroll
    })
})