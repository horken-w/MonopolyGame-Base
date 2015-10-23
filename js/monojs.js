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
Mapset.lightbox=function(){
	var div=$('<div/>'), span=$('<span/>'),backdrop=$('<div class="drop"/>'),
	 popup=$('<div class="pop center"/>'),main=div.clone().addClass('pop_main');
	var question=function(){
		for(var i=0; i<3; i++){
			div.clone().addClass('td').text('A. 墾丁').appendTo('.table')
			$('<input>').attr('type', 'radio').prependTo('.td:eq('+i+')')
		}
	}

	popup.append(div.clone().addClass('pop_title2').text('問答題目'))
		.append(main)
		.queue(function(){
			$('<span/>').css('float', 'right').append($('<a/>',{
				href: '#',
				target: '_blank',
				text: '查看提示'
			})).appendTo(main);
		});
	backdrop.fadeIn('slow')
		.appendTo('body').queue(function(){
			var h, w=backdrop.outerWidth()/2-642/2;
			(backdrop.outerHeight()/2-100<195) ?	h=195 : h=backdrop.outerHeight()/2-100;
			popup.show(1000).appendTo('body')
			.css({
				left: w,
				top: h
			});
			$('<p/>').css({
				fontSize: "130%",
				fontWeight: 900
			}).text('請問屏東黑鮪魚祭的地點是在那裡?').appendTo(main)
			span.clone().addClass('font01').text('Q.').prependTo($('p'));
			div.clone().addClass('table').appendTo(main).queue(question()).dequeue();
			$('<hr />').appendTo(main);
			span.clone().addClass('font01').text('您答對！可獲得大富翁幸運抽獎(超商禮券)抽獎機會1次 ').appendTo(main);
			$('<br />').appendTo(main)
			span.clone().addClass('font01').text('您答錯了！').appendTo(main);
			span.clone().addClass('pop_but').append($('<a />').text('確認')).appendTo(main);
		}).dequeue();
}
$(function(){ 
	var dice = $("#dice"), p=2, dicenum,dicen= dice[0].classList[1].split('-')[1], bear =$('<div class="bear"/>');

	//地圖建置
	for(var i=0; i< map.position.length; i++){
		Mapset.renderMap(map.position[i], map.spaces[i]);
	}
	//配置熊熊
	if (p == 0) {
		bear.appendTo('.map_grid:first');
	}else{
		bear.appendTo('.map_grid:eq('+ p+')');
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
				p=Mapset.walkStep(p, bear);
			}
		}).dequeue();		
	});
	Mapset.lightbox();
})