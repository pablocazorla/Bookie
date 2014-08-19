//bookie
;(function(){
	// Utils
	var aaa = function(str){
			console.log(str);
		},
		extend = function(destination, source) {
			for (var property in source) {
				if (source[property] && source[property].constructor && source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					arguments.callee(destination[property], source[property]);
				}else{
					destination[property] = source[property];
				}
			}
			return destination;
		},
		prefixes = ['','-webkit-','-moz-'];

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
	}

	// Bookie
	var cfg = {
			baseClass : 'bk',
			containerId : 'bookie-container'
		},
		elements = [],
		length = 0,
		styleNode,
		styleStr,
		idCounter = 0,		
		parseData = function(data){
			var objData = {
					position : {x : 0,y : 0,z : 0},
					rotation : {x : 0,y : 0,z : 0},
					scale : {x : 1,y : 1}
				},
				paramArrData,paramName,paramValues,
				arrData = data.split(';');
			for(var i=0;i<arrData.length;i++){
				paramArrData = arrData[i].split(':');
				paramName = paramArrData[0];
				if(paramArrData[1]){paramValues = paramArrData[1].split(',');}
				if(typeof objData[paramName] != 'undefined'){
					objData[paramName].x = parseFloat(paramValues[0]);
					if(paramValues[1]){objData[paramName].y = parseFloat(paramValues[1]);}
					if(paramName == 'scale'){
						if(paramValues[1]==undefined){objData[paramName].y = objData[paramName].x;}
					}else{
						if(paramValues[2]){objData[paramName].z = parseFloat(paramValues[2]);}
					}
				}
			};
			return objData;
		},

		bookie = {
			init : function(obj){
				cfg = extend(cfg, obj || {});
				styleNode = document.createElement('style');
				document.body.appendChild(styleNode);
				//styleNode.innerHTML = '.bk{background:red;height:200px;width:350px;transform: rotateZ(45deg);}';
				this.setElements();
			},
			setElements : function(){
				var elem = document.getElementsByClassName(cfg.baseClass);
				length = elem.length;			
				for(var i = 0;i<length;i++){
					var data = parseData(elem[i].getAttribute('data-bookie') || ''),
						idElement = elem[i].getAttribute('id') || '';

					if(idElement==''){
						idElement = 'bk-id-'+idCounter;
						elem[i].setAttribute('id',idElement);
						idCounter++;
					}
					var newLayer = new layer({
							node : elem[i],
							data : data,
							id : idElement,
							width : elem[i].offsetWidth,
							height : elem[i].offsetHeight,
							parent : this
						});						
					elements.push(newLayer);					
				}
				
				return this.writeStyles();
			},
			writeStyles : function(){
				styleStr = '';//'#'+cfg.containerId+'{perspective:2000px;}';
				for(var i = 0;i<length;i++){
					styleStr += elements[0].styles;
				}
				styleNode.innerHTML = styleStr;
				return this;
			}
		};




	bookie.init();
})();