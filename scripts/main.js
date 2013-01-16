"use strict";

(function() {
	var car;
	var front, back;
	
	function init() {
		car = new Car();

		front = document.getElementById("front");
		back = document.getElementById("back");

		// aim 60 fps
		setTimeout(tick, 16);
	}
	
	function tick() {
		update();
		render();
		setTimeout(tick, 16);
	}
	
	function update() {
		car.update();
	}
	
	function render() {
		front.setAttribute('cx', translate(car.front.position[0]));
		front.setAttribute('cy', translate(car.front.position[1]));
		back.setAttribute('cx', translate(car.back.position[0]));
		back.setAttribute('cy', translate(car.back.position[1]));
		
		function translate(pos) {
			return pos * 10 + 200;
		}
	}
	
	window.onload = init;
})();