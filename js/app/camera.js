// Camera
var Camera = function(obj){
	return this.init(obj); 
};
Camera.prototype = {
	init : function(obj){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.xRotation = 0;
		this.yRotation = 0;
		this.zRotation = 0;
		this.xScale = 1;
		this.yScale = 1;
		this.perspective = 2000;
		
		this.lens = 'perspective';// or orthographic
		this.id = idCounterCamera;
		idCounterCamera++;

		var self = this;
		self = extend(self,obj || {});

		this.prePerspective = this.perspective; 

		this.setLens(this.lens);

		this.sceneParent = null;
		return this;
	},
	setLens : function(l){
		this.lens = l;
		if(this.lens == 'perspective'){
			this.perspective = this.prePerspective;
		}else{
			this.prePerspective = this.perspective;
			this.perspective = 0;
		}
		return this;
	}
};