// Layer
var	layer = function(obj){
		return this.init(obj);
	};
layer.prototype = {
	init: function(obj){			
		this.node = null;
		this.data = {};
		this.id = '';
		this.width = 0;
		this.height = 0;
		this.styles = '';
		var self = 	this;	
		self = extend(self,obj);
		this.setStyles(false);
		return this;
	},
	setStyles : function(updating){
		this.styles = '#'+this.id+'{position:absolute;top:-'+Math.round(this.height/2)+'px;left:-'+Math.round(this.width/2)+'px;';	
			
		var valStr = ' translate3d('+this.data.position.x+'px,'+this.data.position.y+'px,'+this.data.position.z+'px)';
			valStr += ' rotateX('+this.data.rotation.x+'deg) rotateY('+this.data.rotation.y+'deg) rotateZ('+this.data.rotation.z+'deg)';
			valStr += ' scale3d('+this.data.scale.x+','+this.data.scale.y+',1)';
		
		for(var i = 0; i < prefixes.length;i++){
			this.styles += prefixes[i]+'transform:'+valStr+';';
		}
		this.styles += '}';
		if(updating){this.parent.writeStyles();}
		return this;
	}
};