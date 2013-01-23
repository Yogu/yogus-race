"use strict";

(function() {
	var system, world;
	var canvas;
	var circles;
	var lastUpdate = new Date();
	var zoom = 10;
	
	var MAX_FRAME_TIME = 0.015;
	
	function makeSVG(tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }
	
	function init() {
		world = new World();
		system = new System(world, 15);
		window.system = system;
		window.world = world;
		
		canvas = $('#canvas');
		
		var pathSpec = '';
		for (var i = 0; i < canvas.width(); i++) {
			if (pathSpec == '')
				pathSpec = 'M';
			else
				pathSpec += ' ';
			var x = translateXInverse(i);
			var y = translateY(world.getHeightAt(x));
			pathSpec += i+','+y;
		}
		var path = makeSVG('path', {d: pathSpec, stroke: 'blue'});
		canvas[0].appendChild(path);
		
		circles = [];
		for (var i = 0; i < system.nodes.length; i++) {
			var circle = makeSVG('circle', {r: zoom/5, fill: 'red'});
			canvas[0].appendChild(circle);
			circles.push(circle);
		}

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
		system.update(elapsed);
	}
	
	function render() {		
		for (var i = 0; i < system.nodes.length; i++) {
			circles[i].setAttribute('cx', translateX(system.nodes[i].position[0]));
			circles[i].setAttribute('cy', translateY(system.nodes[i].position[1]));
		}
	}
	
	function translateX(pos) {
		return $(canvas).width() / 2 + pos * zoom;
	}
	
	function translateXInverse(pos) {
		return (pos - $(canvas).width() / 2) / zoom;
	}
	
	function translateY(pos) {
		return $(canvas).height() / 2 - pos * zoom;
	}
	
	window.onload = init;
})();