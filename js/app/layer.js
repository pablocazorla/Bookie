// Layer
var Layer = function(n){
	return this.init(n); 
};
Layer.prototype = {
	init : function(n){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.xRotation = 0;
		this.yRotation = 0;
		this.zRotation = 0;
		this.xScale = 1;
		this.yScale = 1;

		this.node = n;

		setTimeout(function(){
			css(n,{
				'position' : 'absolute',
				'top' : (-.5*n.offsetHeight)+'px',
				'left' : (-.5*n.offsetWidth)+'px'
			});
		},100);

		

		css(this.node,{
			'position' : 'absolute',
			'top' : (-.5*this.height)+'px',
			'left' : (-.5*this.width)+'px'
		});


		this.id = 'bk-layer-id-'+idCounterLayer;
		idCounterLayer++;

		var idNode = n.id;
		if(typeof idNode != 'undefined' && idNode != ''){
			this.id = idNode;
		}else{
			n.setAttribute('id',this.id);
		}
		var d = n.getAttribute('data-bk');

		if(typeof d != 'undefined' && d != ''){
			var o = parseData({
				x : this.x,
				y : this.y,
				z : this.z,
				xRotation : this.xRotation,
				yRotation : this.yRotation,
				zRotation : this.zRotation,
				xScale : this.xScale,
				yScale : this.yScale
			},d);
			var self = this;
			self = extend(this,o);			
		}
		this.sceneParent = null;
		this.animating = false;
		return this;
	},
	move : function(trans){
		move(this,trans);
		return this;
	},
	animate : function(trans,duration,callback){
		animate(this,trans,duration,callback);
		return this;
	},
	render : function(){
		transform(this.node,this,this.sceneParent.currentCamera);
		return this;
	},
	on : function(eventType,eventHandler){
		this.node.addEventListener(eventType, eventHandler,false);
		return this;
	}
};
/*
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
*/