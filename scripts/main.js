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
		front.setAttribute('cx', car.front.position[0]);
		front.setAttribute('cy', car.front.position[1]);
		back.setAttribute('cx', car.back.position[0]);
		back.setAttribute('cy', car.back.position[1]);
	}
	
	window.onload = init;
});