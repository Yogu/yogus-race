"use strict";

(function() {
	window.System = null;
	
	System = function(world, count) {
		this.world = world;
		this.mass = 1;
		var springConstant = 40;//100;
		var frictionalCoefficient = 2;//10;
		this.nodes = [];
		for (var i = 0; i < count; i++) {
			var node = new Node(world);
			node.mass = this.mass / count;
			var angle = i/count*2*Math.PI;
			node.position = [Math.cos(angle),Math.sin(angle)];
			node.name = i;
			node.links = [];
			/*if (i > 0) {
				node.links.push({node: this.nodes[i-1], rate: springConstant, equilibriumLength: 1,
					frictionalCoefficient: frictionalCoefficient});
				this.nodes[i-1].links.push({node: node, rate: springConstant, equilibriumLength: 1,
					frictionalCoefficient: frictionalCoefficient});
			}*/
			this.nodes.push(node);
		}
		// close the circle
		/*this.nodes[0].links.push({node: this.nodes[count-1], rate: springConstant, equilibriumLength: 1,
			frictionalCoefficient: frictionalCoefficient});
		this.nodes[count-1].links.push({node: this.nodes[0], rate: springConstant, equilibriumLength: 1,
			frictionalCoefficient: frictionalCoefficient});*/

		for (var i = 0; i < count; i++) {
			for (var j = 0; j < count; j++) {
				if (i != j) {
					var length = vec2.dist(this.nodes[i].position, this.nodes[j].position);
					this.nodes[i].links.push({node: this.nodes[j], rate: springConstant, equilibriumLength: length,
						frictionalCoefficient: frictionalCoefficient});
				}
			}
		}
	};
	
	System.prototype = {
		update: function(elapsed) {
			for (var i = 0; i < this.nodes.length; i++)
				this.nodes[i].applyForces(elapsed);
			for (var i = 0; i < this.nodes.length; i++)
				this.nodes[i].move(elapsed);
		},
		
		applyMomentum: function(momentum) {
			for (var i = 0; i < this.nodes.length; i++) {
				this.nodes[i].momentum = vec2.add(this.nodes[i].momentum, this.nodes[i].momentum, momentum);
			}
		}
	};
})();