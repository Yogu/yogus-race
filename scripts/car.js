"use strict";

(function() {
	window.Car = null;
	
	Car = function() {
		this.mass = 1;
		this.springConstant = 1;
		
		this.back = new Node();
		this.back.mass = this.mass / 2;
		this.back.position = [0,0];
		this.front = new Node();
		this.back.mass = this.mass / 2;
		this.back.position = [1,0];
		
		this.back.links = [{node: this.front, rate: this.springConstant, 
			equilibriumLength: 1}];
		this.front.links = [{node: this.back, rate: this.springConstant, 
			equilibriumLength: 1}];
	}
	
	Car.prototype = {
		update: function(elapsed) {
			this.back.update(elapsed);
			this.front.update(elapsed);
		}
	};
})();