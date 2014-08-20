// App

var myScene = bk.createScene({
	id : 'scene1'
});


var camera1 = bk.createCamera({
	x : 250,
	y : 0,
	z : 500
});


myScene.addCamera(camera1).render();


myScene.layer['cosa1'].on('click',function(){
	myScene.layer['cosa1'].animate({
		yRotation : 500
	},1200,function(){
		myScene.layer['cosa2'].animate({
			yRotation : 500,
			x : 400
		},1200,function(){
			camera1.animate({
			/*	y : 100,
				x : 400,*/
				z : 600
			},1600,function(){
				alert('Paro');
			});
		});
	});
});


