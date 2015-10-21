var x=70, y=0, $div=$('<div/>'),table=$('.map_table'), map={"position":['top','left','bottom','right','top','right','bottom','right','top','right','bottom','left','bottom'],'spaces':[5,12,6,2,4,2,4,2,4,4,2,1,2]};

var Mapset=function(e){
	this.space=e;
}
Mapset.prototype={
	topLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().addClass('map_grid').css({
				bottom: x,
				right: y
			}).appendTo(table);
			x+=70;
		}
	},
	rightLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().addClass('map_grid').css({
				bottom: x,
				right: y
			}).appendTo(table);
			y-=70;
		}
	},
	bottomLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().addClass('map_grid').css({
				bottom: x,
				right: y
			}).appendTo(table);
			x-=70;
		}
	},
	leftLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().addClass('map_grid').css({
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

$(function(){
	for(var i=0; i< map.position.length; i++){
		Mapset.renderMap(map.position[i], map.spaces[i]);
	}
	
})