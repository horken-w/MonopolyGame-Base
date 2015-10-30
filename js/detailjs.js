Mapset.prototype.eventbox=function(questions){
    var div=$('<div/>'), popup=$('<div id="event" class="pop center"/>'),
        main=div.clone().addClass('pop_main'), span=$('<span/>'), p=$('<p/>');
    var answers=['1-3月', '4-6月', '10-12月'];
    var h=$(window).outerHeight()/2-250;

    popup.css('top', h);
    popup.append(div.clone().addClass('pop_title2')).append(main).appendTo('body')
    popup.append('<div class="pop_close"><a href="#"><img src="images/close.png" alt="關閉" width="40" height="40" title="關閉" border="0"/></a></div>');
    var  boxtitle=$('.pop_title2');
    var callback=function(){

    };
    switch (questions){
        case 1:
            var question=function(){
                for(var i=0; i<answers.length; i++){
                    div.clone().addClass('td').text('A.'+answers[i]).appendTo('.table');
                   $('<input>').attr('type', 'radio').prependTo('.td:eq('+i+')');
                }
            };
            boxtitle.text('問答題目');
            $('<span/>').css('float', 'right').append($('<a/>',{
                href: '#',
                target: '_blank',
                text: '查看提示'
            })).appendTo(main);
            p.clone().css({
                fontSize: "130%",
                fontWeight: 900
            }).text('每年的什麼時候洄游性的黑鮪魚在臺灣南端的巴士海峽海域準備產卵？').appendTo(main);
            span.clone().addClass('font01').text('Q.').prependTo($('p'));
            div.clone().addClass('table').appendTo(main).queue(question()).dequeue();
            $('<hr />').appendTo(main);
            break;
        case 2:
            var url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + questions.shareEvent.url;
            boxtitle.text('新聞分享');
            p.clone().addClass('.sharetitle').text('台灣燈會 見證花燈技藝傳承與創新').appendTo(main);
            $('<hr />').appendTo(main);
            p.clone().text('每年到了元宵節，全臺各地舉辦各種熱鬧的慶典，其中最吸睛也是最多人參與的，就是元宵節當天開展的台灣燈會！台灣燈會每年移至不同縣市展出，將城市當成大型的花燈展演舞台，配合當地自然地景、人文內涵，規劃燈區主題；其中展出要角之一，就是由燈藝師手工製作的傳統花燈，精彩創新的花燈展演，也讓台灣燈會登上國際舞台，').append('<a href="#">...詳全文 </a>').appendTo(main);
            $('<hr />').appendTo(main);
            span.clone().addClass('pop_but').append($('<a />').text('分享至臉書')).insertAfter('hr:last-child');
            $('.pop_but').on('click', function(){
                Mapset.sharebox('facebook', url, '繞著台灣跑  環島大富翁');
                var ans;
                ans={rewardId:questions.rewardId, rewardEvent:2};
                callback('success', ans)
            }).off('click');
            break;
        case 3:
            boxtitle.text('現玩現送');
            p.clone().addClass('font01 sharetitle').appendTo(main);
            var font=$('.sharetitle'), bouns=Math.floor(Math.random()*4+1);
            switch (bouns){
                case 1:
                    font.text('您獲得點數200點!!');
                    break;
                case 2:
                    font.text('您獲得點數500點!!');
                    break;
                case 3:
                    font.text('您獲得點數5000點!!');
                    break;
                default:
                    font.text('您獲得免費擲骰1次!!');
                    break;
            }
            $('<hr />').appendTo(main);
            break;
        case 4:
            boxtitle.text('到達終點');
            $('<img/>', {
                src: 'images/winner.gif',
                alt: '台灣觀光年歷-環島大富翁'
            }).appendTo(main);
            div.clone().addClass('font01 sharetitle').appendTo(main);
            $('.sharetitle').text('恭喜您完成今日環島任務！獲得環島終點(LED液晶電視) 抽獎機會1次，也歡迎明天繼續來挑戰環島大富翁～');
            break;
        case 5:
            
            break;
        default:
            var textselect=Math.floor(Math.random()*2+1);
            boxtitle.text('回到原點');
            $('<img/>', {
                src: 'images/bear-3.png',
                alt: '台灣觀光年歷-環島大富翁'
            }).appendTo(main);
            div.clone().addClass('font01 sharetitle').appendTo(main);
            textselect == 1 ? $('.sharetitle').text('很殘念，遇到史上最強颱風將你吹回到起點！') : $('.sharetitle').text('哎呀 你不小心掉進了陷阱  回到了原點');
            break;
    }
    span.clone().addClass('pop_but').append($('<a />').text('確認')).insertAfter('hr:last-child');
    $('.pop_but:last-child').on('click', function(){
        callback();
    });
};
Mapset.prototype.dicerun=function(dice){
    var i=1, dicenum=0;
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
    }).queue(function walk(){
        setTimeout(function(){
            bearp=Mapset.walkStep(bearp, bear);
            if(i < dicenum){
                walk();
                i++
            }
        }, 500);
    }).delay(500*(dicenum+1)).queue(function(){
        Mapset.lightbox(1, data);
        $('.rollarea').css('pointer-events', 'auto');
    }).dequeue();
};

$(function(){
    var dice = $("#dice"), dicenum, event=0;
    $('.rollarea').css('pointer-events', 'auto');
    //地圖建置
    for(var i=0; i< map.position.length; i++){
        Mapset.renderMap(map.position[i], map.spaces[i]);
    }
    //配置熊熊
    Mapset.hobear(2);

    //擲骰子
    if(event==0){
        $('.rollarea').css('pointer-events', 'none');
        dice.on('click', function(){
            var b=new Mapset();
            b.dicerun(dice);
        });

        //location.reload();
    }else if(event == 2){
        alert('點數不足，請明天在試一次。')
    }else if(event == 3){

        $('.rollarea').css('pointer-events', 'none');
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
        });
        alert('請登入之後再進行遊戲。');
    }else{
        $('.rollarea').css('pointer-events', 'none');
        alert('是否花費紅利點數擲一次骰子?。');
    };
    $('#facebook').on('click', function(e){
        e.preventDefault();
        Mapset.sharebox('facebook', window.location.href, '繞著台灣跑  環島大富翁');

    });
    $('#google').on('click', function(e){
        e.preventDefault();
        Mapset.sharebox('google', window.location.href);
    });
    $('li[class^=menu_]:not(".menu_but3")').on('click', function(e){
        e.preventDefault();
        var btn=this.className.split('_')[1];
        Mapset.lightbox(0, btn);
    })
})