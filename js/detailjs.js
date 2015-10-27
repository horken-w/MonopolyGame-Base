/**
 * Created by evolve on 10/27/2015.
 */

Mapset.prototype.eventbox=function(questions){
    var div=$('<div/>'), popup=$('<div id="event" class="pop center"/>'),main=div.clone().addClass('pop_main'), span=$('<span/>');
    var answers=['台中', '南投', '墾丁'];
    var h, q;
    switch (Math.floor(Math.random() * 4 + 1)){
        case 1:
            q=1;
            break;
        case 2:
            q=2;
            break;
        case 3:
            q=3;
            break;
    }

    h=$(window).outerHeight()/2-250;

    var question=function(){
        for(var i=0; i<3; i++){
            div.clone().addClass('td').text('A.'+answers[i]).appendTo('.table')
            $('<input>').attr('type', 'radio').prependTo('.td:eq('+i+')')
        }
    }
    popup.css('top', h);
    popup.append(div.clone().addClass('pop_title2').text('問答題目')).append(main).appendTo('body')
    popup.append('<div class="pop_close"><a href="#"><img src="images/close.png" alt="關閉" width="40" height="40" title="關閉" border="0"/></a></div>');
    $('<span/>').css('float', 'right').append($('<a/>',{
        href: '#',
        target: '_blank',
        text: '查看提示'
    })).appendTo(main);
    $('<p/>').css({
        fontSize: "130%",
        fontWeight: 900
    }).text('請問屏東黑鮪魚祭的地點是在那裡?').appendTo(main);
    span.clone().addClass('font01').text('Q.').prependTo($('p'));
    div.clone().addClass('table').appendTo(main).queue(question()).dequeue();
    $('<hr />').appendTo(main);

    span.clone().addClass('pop_but').append($('<a />').text('確認')).appendTo(main);
}

$.getJSON('http://localhost:8080/travel/TravelRichAction.do?method=getInit',function(data){
    $('.font01').text(data.bonus);
    data.siteList.forEach(function(v, i){
        $('.map_table > a:eq('+(i+1)+')').attr('href', v.url);
    });
    Mapset.hobear(data.site);
    $('.map_table > a').on('click', function(e){
        e.preventDefault();
        if($(this).attr('href') !== '#') window.open($(this).attr('href'), '_blank');
    });
});
$(function(){
    var dice = $("#dice"), dicenum, dicen= dice[0].classList[1].split('-')[1];

    //地圖建置
    for(var i=0; i< map.position.length; i++){
        Mapset.renderMap(map.position[i], map.spaces[i]);
    }
    //擲骰子
    dice.on('click', function(){
        dice.attr("class", "dice");
        dice.css('cursor', 'default');
        dicenum = Math.floor(Math.random() * 6 + 1);
        dice.stop().animate({
            left : '+2px'
        }, 85, function() {
            dice.addClass('dice-t');
        }).delay(170).animate({
            top : '-5px'
        }, 85, function(){
            dice.removeClass('dice-t').addClass('dice-s');
        }).delay(170).animate( {
            opacity : 'show'
        }, 510, function() {
            dice.removeClass('dice-s').addClass('dice-e');
        }).delay(85).animate({
            left : '-2px',
            top: '2px'
        }, 85, function(){
            dice.removeClass('dice-e').addClass('dice-' + dicenum);
            dice.css('cursor', 'pointer');
        }).queue(function(){
            for(var i=0; i<dicenum; i++){
                setTimeout(bearp=Mapset.walkStep(bearp, bear),2000);
            };
        }).dequeue().delay(800).queue(function(){
            Mapset.lightbox(1);
        });
    });
    $('li[class^=menu_]:not(".menu_but3")').on('click', function(e){
        e.preventDefault();
        var btn=this.className.split('_')[1];
        Mapset.lightbox(0, btn);
    })
})
//$.ajax({
//    url: '',
//    method: 'post',
//    datatype: json,
//})