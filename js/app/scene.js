// BK
var Scene = function(obj){
	return this.init(obj); 
};
Scene.prototype = {
	init : function(obj){		
		this.cfg = extend({
			id : ''
		},obj);
		this.cameras = [];
		this.currentCamera = null;

		this.node = getNodes('#'+this.cfg.id)[0];
		addClass(this.node,'bk-scene');
		
		this.layer = {};
		this.rendered = false;

		var nlayers = getNodes('.'+config.layerClass);
		for(var i = 0;i<nlayers.length;i++){
			this.createLayer(nlayers[i]);
		}

		return this;
	},
	addCamera : function(camera){
		this.cameras.push(camera);
		camera.sceneParent = this;
		this.setCamera(camera);
		return this;
	},
	setCamera : function(cameraOrId){
		var camId = (typeof cameraOrId == 'number') ? cameraOrId : cameraOrId.id;
		for(var i = 0; i< this.cameras.length;i++){
			if(this.cameras[i].id == camId){
				this.currentCamera = this.cameras[i];
				if(this.rendered){this.render()};
			}
		}
		return this;
	},
	setSceneByCamera : function(){
		/*var objTrasform = {
				x : -1*this.currentCamera.x,
				y : -1*this.currentCamera.y,
				z : -1*this.currentCamera.z,
				xRotation : this.currentCamera.xRotation,
				yRotation : this.currentCamera.yRotation,
				zRotation : this.currentCamera.zRotation,
				xScale : 1,
				yScale : 1
			}
			
		css(this.node,{
			'perspective' : this.currentCamera.perspective + 'px',
			'perspectiveOrigin' : this.currentCamera.x + 'px '+this.currentCamera.y +'px',
			'transform' : trasformToString(objTrasform)
		});*/
		return this;
	},
	createLayer : function(n){
		var newLayer = new Layer(n);
		this.layer[newLayer.id] = newLayer;
		newLayer.sceneParent = this;
		return this;
	},
	render : function(){
		css(this.node,{
			'display' : 'block',
			'perspective' : this.currentCamera.perspective + 'px'
		});
		for(var a in this.layer){
			this.layer[a].render();
		}
		this.rendered = true;
		return this;
	}
};
