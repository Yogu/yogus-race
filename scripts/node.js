"use strict";

(function() {
	window.Node = null;
	
	Node = function(world) {
		this.position = [0,0];
		this.momentum = [0,0];
		this.mass = 0;
		this.links = [];
		this.world = world;
		this.force = [0,0];
		
		if (!(world instanceof World))
			throw new Error('world argument must be a World');
	};
	
	var MAX_STEP = 0.1;
	
	Node.prototype = {
		getSpeed: function() {
			return vec2.scale(vec2.create(), this.momentum, 1 / this.mass);
		},
			
		move: function(elapsed) {
			var deltaMomentum = vec2.scale(vec2.create(), this.force, elapsed);
			vec2.add(this.momentum, this.momentum, deltaMomentum);
			
			// X
			var deltaX = this.momentum[0] * elapsed / this.mass;
			var targetX = this.position[0] + deltaX;
			var minY = this.world.getHeightAt(targetX);
			if (this.position[1] >= minY) {
				this.position[0] = targetX;
			} else {
				// brake on collision
				this.momentum[0] /= 2;
			}
			
			// Y
			var deltaY = this.momentum[1] * elapsed / this.mass;
			var targetY = this.position[1] + deltaY;
			var minY = this.world.getHeightAt(this.position[0]);
			if (targetY < minY) {
				targetY = minY;
				this.momentum[1] = 0;
			}
			this.position[1] = targetY;
				
			
			// air grip etc.
			//vec2.scale(this.momentum, this.momentum, Math.pow(0.5, elapsed));
			
			/*var distance = vec2.scale(vec2.create(), this.momentum, elapsed / this.mass);
			var target = vec2.add(vec2.create(), this.position, distance);
			var minY = this.world.getHeightAt(target[0]);
			if (target[1] >= minY) {
				this.position = target;
			} else {
				// hangauftriebskraft
				var slope = vec2.normalize(distance, distance);
				// calculate that component of momentum that is parallel to slope
				var momentumLength = vec2.dot(slope, this.momentum);
				this.momentum = vec2.scale(slope, slope, momentumLength);
			} *//*else {
				vec2.set(this.momentum, 0, 0);
			}*/
		},
		
		applyForces: function(elapsed) {
			var forces = vec2.fromValues(0, -this.mass * Constants.GRAVITY);
			
			for (var i = 0; i < this.links.length; i++) {
				var link = this.links[i];
				// vector from this node to the other node
				var diff = vec2.subtract(vec2.create(), link.node.position, this.position);
				//console.log(this.name + ' diff: ' + diff[0] + ', ' +diff[1]);
				var distance = vec2.length(diff);
				var force;
				if (distance > 0.0001) {
					var displacementLength = distance - link.equilibriumLength;
					// shorten the distance by the equilibrium length
					var displacement = vec2.scale(vec2.create(), diff, displacementLength / distance);
					
					// spring force
					force = vec2.scale(vec2.create(), displacement, link.rate);
				} else
					force = vec2.fromValues(0, 0);
				
				// damped oscillation
				var thisSpeed = this.getSpeed();
				var relativeSpeed = vec2.subtract(thisSpeed, thisSpeed, link.node.getSpeed());
				vec2.scale(relativeSpeed, relativeSpeed, link.frictionalCoefficient * this.mass);
				vec2.subtract(force, force, relativeSpeed);
				//console.log(this.name + ": " + relativeSpeed[0]+","+relativeSpeed[1]);
				
				vec2.add(forces, forces, force);
			}
			this.force = forces;
		}
	};
})();