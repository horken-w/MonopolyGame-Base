var x=0, y=0, $div=$('<div class=map_grid/>'),table=$('.map_table'), map={"position":['top','left','bottom','right','top','right','bottom','right','top','right','bottom','left','bottom'],'spaces':[6,12,6,2,4,2,4,2,4,4,2,1,2]};

var Mapset=function(e){
	this.space=e;
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
Mapset.walkStep=function(number){

}
$(function(){ 
	var dice = $("#dice"), dicen= dice[0].classList[1].split('-')[0], bear =$('<img src="images/bear-1.png"/> <img src="images/bear-2.png"/>');
	var  abc =0;

	//地圖建置
	for(var i=0; i< map.position.length; i++){
		Mapset.renderMap(map.position[i], map.spaces[i]);
	}
	//配置熊熊
	if (abc == 0) {
		bear.appendTo('.map_grid:first');
	}else{
	};
	
	//擲骰子
	dice.stop().on('click', function(){
		dice.attr("class", "dice");
		dice.css('cursor', 'default');
		var dicenum = Math.floor(Math.random() * 6 + 1);
		dice.animate({
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
		})
	});
})