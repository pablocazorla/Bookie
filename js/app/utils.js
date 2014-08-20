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
	getNodes = function(selection){
		return document.querySelectorAll(selection);
	},
	addClass = function(element,classname) {
	    var cn = element.className || '';
	    //test for existance
	    if( cn.indexOf( classname ) != -1 ) {
	    	return;
	    }
	    //add a space if the element already has class
	    if( cn != '' ) {
	    	classname = ' '+classname;
	    }
	    element.className = cn+classname;
	},
	removeClass = function(element,classname) {
	    var cn = element.className;
	    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
	    cn = cn.replace( rxp, '' );
	    element.className = cn;
	},
	prefix = (function(){
	    var proparray = ['transform', 'MozTransform', 'WebkitTransform'],
	    	prefixes = ['', 'Moz', 'Webkit'],
	    	root=document.documentElement //reference root element of document
	    for (var i=0; i<proparray.length; i++){ //loop through possible properties

	        if (proparray[i] in root.style){ //if property exists on element (value will be string, empty string if not set)
	            return prefixes[i] //return that string
	        }
	    }
	})(),
	capitalize = function(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
	css = function(element,objOrProp,val){
		var get = false;
		if(typeof objOrProp == 'string'){
			if(typeof val == 'string'){
				var obj = {objOrProp : val};
			}else{
				//get
				get = true;
				return window.getComputedStyle(element).getPropertyValue(objOrProp);
			}
		}else{
			var obj = objOrProp;
		}
		if(!get){
			for(var a in objOrProp){
				if((a =='transform' || a == 'perspective' || a == 'perspectiveOrigin') && (prefix != '')){					
					element.style[prefix+capitalize(a)] = objOrProp[a];						
				}else{
					element.style[a] = objOrProp[a];
				}
			}
		}		
	},
	transform = function(n,o,c){
		var str = 'translate3d('+(o.x-c.x)+'px,'+(o.y-c.y)+'px,'+(o.z+c.z)+'px) rotateX('+o.xRotation+'deg) rotateY('+o.yRotation+'deg) rotateZ('+o.zRotation+'deg) scale3d('+o.xScale+','+o.yScale+',1)';
		css(n,{
			'transform' : str
		});
	},
	parseData = function(objData,data){
		var	arrData = data.split(','),u,a,b;

		for(var i=0;i<arrData.length;i++){
			u = arrData[i].split(':');
			a = u[0];
			b = u[1];

			if(typeof objData[a] != 'undefined'){
				objData[a] = parseFloat(b);
			}
		};
		return objData;
	},
	clone = function(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	},
	move = function(o,trans){
		o = extend(o,trans);
		o.render();
	},
	animate = function(o,trans,duration,callback){
		if(!o.animating){
			o.animating = true;	
			var steps = Math.round(duration/animationStepMS),
				stepObj = {};
			for(var a in trans){
				stepObj[a] = (trans[a]-o[a])/steps;
			}		
			var st = 1,
				timer = setInterval(function(){
				for(var a in stepObj){
					o[a] += stepObj[a];
				}
				st++;
				if(st==steps){
					clearInterval(timer);timer=null;
					o = extend(o,trans);
					o.render();
					if(typeof callback == 'function'){
						o.animating = false;
						callback();
					}
				}else{o.render();}
				
			},animationStepMS);
		}
	}




	;