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
		
		this.layers = {};

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
				this.setSceneByCamera();
			}
		}
		return this;
	},
	setSceneByCamera : function(){
		var objTrasform = {
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
			'transform' : trasformToString(objTrasform)
		});
		return this;
	},
	createLayer : function(n){
		var newLayer = new Layer(n);
		this.layers[newLayer.id] = newLayer;
		newLayer.sceneParent = this;
		return this;
	},
	render : function(){
		css(this.node,{
			'display' : 'block'
		});
		return this;
	}
};
