var x=70, y=0, $div=$('<div/>'),table=$('.map_table'), map=[7];

var Mapset=function(e){
	this.space=e;
}
Mapset.prototype={
	topLine:function(e){
		for(var i=0; i<e; i++){
			$div.clone().css({
				width: 70,
				height: 70,
				position: 'absolute',
				bottom: x,
				right: y
			}).appendTo(table);
			x+=70;
		}
	},
	leftLine:function(e){

	}
	
}
Mapset.renderMap=function(space){
	var map=new Mapset();
	map.topLine(space);
}

$(function(){
	for(var i=0; i< map.length; i++){
		Mapset.renderMap(map[i]);
	}
	
})

,12,6,1,5,1,5,1,5,3,3,2