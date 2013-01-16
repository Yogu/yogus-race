"use strict";

(function() {
	window.Node = null;
	
	Node = function() {
		this.position = [0,0];
		this.momentum = [0,0];
		this.mass = 0;
		this.links = [];
	};
	
	Node.prototype = {
		update: function(elapsed) {
			this.applyForces(elapsed);
			// move
			var distance = vec2.scale(vec2.create(), this.momentum, elapsed);
			vec2.add(this.position, this.position, distance);
		},
		
		applyForces: function(elapsed) {
			var forces = vec2.fromValues(0, -this.mass * Constants.GRAVITY);
			
			for (var i = 0; i < this.links.length; i++) {
				var link = this.links[i];
				// vector from this node to the other node
				var diff = vec2.subtract(vec2.create(), link.node.position, this.position);
				var distance = vec2.length(diff);
				var displacementLength = distance - link.equilibriumLength;
				// shorten the distance by the equilibrium length
				var displacement = vec2.scale(vec2.create(), diff, displacementLength / distance);
				
				// spring force
				var force = vec2.scale(vec2.create(), displacement, -link.rate);
				// damped oscillation
				//force = vec2.subtract(vec2.multiply)
				
				vec2.add(forces, forces, force);
			}

			var deltaMomentum = vec2.scale(vec2.create(), forces, elapsed);
			vec2.add(this.momentum, this.momentum, deltaMomentum);
		}
	};
})();