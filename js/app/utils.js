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
				if((a =='transform' || a == 'perspective') && (prefix != '')){					
					element.style[prefix+capitalize(a)] = objOrProp[a];						
				}else{
					element.style[a] = objOrProp[a];
				}
			}
		}		
	},
	trasformToString = function(o){
		return 'translate3d('+o.x+'px,'+o.y+'px,'+o.z+'px) rotateX('+o.xRotation+'deg) rotateY('+o.yRotation+'deg) rotateZ('+o.zRotation+'deg) scale3d('+o.xScale+','+o.yScale+',1)';
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
	}




	;