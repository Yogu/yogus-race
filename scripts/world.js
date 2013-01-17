"use strict";

(function() {
	window.World = null;
	
	World = function() {
	};
	
	World.prototype = {
		update: function(elapsed) {
		},
		
		getHeightAt: function(x) {
			return -2 - x * 0.1;
		}
	};
})();