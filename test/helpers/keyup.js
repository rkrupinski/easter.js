function keyup(code) {
	var ev = document.createEvent('Event');

	ev.initEvent('keyup', true, true);
	ev.keyCode = code;
	document.body.firstChild.dispatchEvent(ev);
}