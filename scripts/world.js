"use strict";

(function() {
	window.World = null;
	
	World = function() {
	};
	
	World.prototype = {
		update: function(elapsed) {
		},
		
		getHeightAt: function(x) {
			var scale = 10;
			return Math.cos(x/scale-5)*scale -scale-2;
		}
	};
})();