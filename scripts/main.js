"use strict";

(function() {
	var car, world;
	var front, back;
	var lastUpdate = new Date();
	
	var MAX_FRAME_TIME = 0.1;
	
	function init() {
		world = new World();
		car = new Car(world);
		window.car = car;
		window.world = world;

		front = document.getElementById("front");
		back = document.getElementById("back");

		setTimeout(tick, 0);
	}
	
	function tick() {
		update();
		render();

		// aim 60 fps
		setTimeout(tick, 16);
	}
	
	function update() {
		var elapsed = (new Date() - lastUpdate) / 1000;
		elapsed = Math.min(MAX_FRAME_TIME, elapsed);
		lastUpdate = new Date();
		car.update(elapsed);
	}
	
	function render() {
		front.setAttribute('cx', translateX(car.front.position[0]));
		front.setAttribute('cy', translateY(car.front.position[1]));
		back.setAttribute('cx', translateX(car.back.position[0]));
		back.setAttribute('cy', translateY(car.back.position[1]));
		
		function translateX(pos) {
			return $(canvas).width() / 2 + pos * 50;
		}
		
		function translateY(pos) {
			return $(canvas).height() / 2 - pos * 50;
		}
	}
	
	window.onload = init;
})();