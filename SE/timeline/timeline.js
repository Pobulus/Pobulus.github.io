	// http://www.dte.web.id/2013/02/event-mouse-wheel.html
	
	(function() {
        var elem = document.getElementById('horizon')
		function scrollHorizontally(e) {
			e = window.event || e;
			
			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			document.documentElement.scrollLeft -= (delta*400); // Multiplied by 40
			document.body.scrollLeft -= (delta*400); // Multiplied by 40
			e.preventDefault();
		}
		if (elem.addEventListener) {
			// IE9, Chrome, Safari, Opera
			elem.addEventListener("mousewheel", scrollHorizontally, false);
			// Firefox
			elem.addEventListener("DOMMouseScroll", scrollHorizontally, false);
		} else {
			// IE 6/7/8
			elem.attachEvent("onmousewheel", scrollHorizontally);
		}
	})();
	