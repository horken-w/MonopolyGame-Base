var x=0, y=0, $div=$('<div class=map_grid/>'),table=$('.map_table'), map={"position":['top','left','bottom','right','top','right','bottom','right','top','right','bottom','left','bottom'],'spaces':[6,12,6,2,4,2,4,2,4,4,2,1,2]};

var Mapset=function(e){
	this.position=e;
}
Mapset.prototype={
	topLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().css({
				bottom: x,
				right: y
			}).appendTo(table);
			x+=70;
		}
	},
	rightLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().css({
				bottom: x,
				right: y
			}).appendTo(table);
			y-=70;
		}
	},
	bottomLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().css({
				bottom: x,
				right: y
			}).appendTo(table);
			x-=70;
		}
	},
	leftLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().css({
				bottom: x,
				right: y
			}).appendTo(table);
			y+=70;
		}
	}	
}
Mapset.renderMap=function(position,space){
	var map=new Mapset();
	switch(position){
		case 'top':
			map.topLine(space);
			break;
		case 'right':
			map.rightLine(space);
			break;
		case 'bottom':
			map.bottomLine(space);
			break;
		case 'left':
			map.leftLine(space);
			break;
		default:
			alert('Data error');
	}
}
Mapset.walkStep=function(place, hobear){
		place+=1
		hobear.appendTo('.map_grid:eq('+ place+')');
		return place;
}
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
		case 4:
			q=2;
			break;
	}

	($(window).outerHeight()/2-100<195) ?	h=195 : h=$(window).outerHeight()/2-195;

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
}
Mapset.prototype.rulebox=function(action){
	var div=$('<div/>'), title=div.clone().addClass('pop_title'),close=$('<div class="pop_close"><a href="#"><img src="images/close.png" alt="關閉" width="40" height="40" title="關閉" border="0"/></a></div>');
	var h,  w=$(window).outerWidth()/2-430;

	var rules=function(){
		title.text('遊戲說明').appendTo('.pop_bg1');
	};
	var rewards=function(){
		title.text('環島有禮').appendTo('.pop_bg1');
	};
	var notices=function(){
		title.text('注意事項').appendTo('.pop_bg1');		
	};
	var announces=function(){
		title.text('得獎公佈').appendTo('.pop_bg1');
	};
	($(window).outerHeight()/2-100<195) ?	h=195 : h=$(window).outerHeight()/2-195;
	if(action == 'but1' || action == 'but2')
		div.addClass('pop_bg1').css({'top': h, 'left': w}).append(close).appendTo('body');
	else 
		div.addClass('pop_bg2').css({'top': h, 'left': w}).append(close).appendTo('body');
	switch(action){
		case 'but1':
			rules();
			break;
		case 'but2':
			rewards();
			break;
		case 'but4':
			notices();
			break;
		case 'but5':
			announces();
			break;
		default:
			alert('Data error');
	}
}
Mapset.lightbox=function(box, action){
	var div=$('<div/>'),backdrop=$('<div class="drop"/>');	

	backdrop.fadeIn('slow').appendTo('body');
	if(box == 1){
		var boxs=new Mapset();
		boxs.eventbox(action);
	}else{
		var boxs=new Mapset();
		boxs.rulebox(action);
	}
	$('.pop_close').on('click', function(e){
		e.preventDefault();
		$('#event, .pop_bg1, .pop_bg2').fadeOut(1000);

		$(backdrop).fadeOut(1000).delay(1000)
		.queue(function(next){
			$(backdrop).remove();
			$('#event, .pop_bg1, .pop_bg2').remove();
			next();
		}).dequeue();
	})

		// $('<hr />').appendTo(main);
		// span.clone().addClass('font01').text('您答對！可獲得大富翁幸運抽獎(超商禮券)抽獎機會1次 ').appendTo(main);
		// $('<br />').appendTo(main)
		// span.clone().addClass('font01').text('您答錯了！').appendTo(main);
		// span.clone().addClass('pop_but').append($('<a />').text('確認')).appendTo(main);
	
		
}
$(function(){ 
	var dice = $("#dice"), p=2, dicenum,dicen= dice[0].classList[1].split('-')[1], bear =$('<div class="bear"/>');

	//地圖建置
	for(var i=0; i< map.position.length; i++){
		Mapset.renderMap(map.position[i], map.spaces[i]);
	}
	//配置熊熊
	if (p > 0) {
		bear.appendTo('.map_grid:eq('+ p+')');
	}else{
		bear.appendTo('.map_grid:first');
	};
	
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
				setTimeout(p=Mapset.walkStep(p, bear),2000);
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