"use strict";

(function() {
	window.Car = null;
	
	Car = function(world) {
		this.world = world;
		this.mass = 1;
		var springConstant = 100;
		var frictionalCoefficient = 10;
		
		this.back = new Node(world);
		this.back.mass = this.mass / 2;
		this.back.position = [0,0];
		this.back.name = 'back';
		this.front = new Node(world);
		this.front.mass = this.mass / 2;
		this.front.position = [1,0];
		this.front.name = 'front';
		
		this.back.links = [{node: this.front, rate: springConstant, 
			equilibriumLength: 1, frictionalCoefficient: frictionalCoefficient}];
		this.front.links = [{node: this.back, rate: springConstant, 
			equilibriumLength: 1, frictionalCoefficient: frictionalCoefficient}];
	}
	
	Car.prototype = {
		update: function(elapsed) {
			this.back.applyForces(elapsed);
			this.front.applyForces(elapsed);
			this.back.move(elapsed);
			this.front.move(elapsed);
		}
	};
})();