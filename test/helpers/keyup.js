function keyup(el, code) {
	var ev = document.createEvent('Event');

	ev.initEvent('keyup', true, true);
	ev.keyCode = code;

	el.dispatchEvent(ev);
}