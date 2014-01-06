function keypress(el, code) {
	var ev = document.createEvent('Event');

	ev.initEvent('keypress', true, true);
	ev.keyCode = code;

	el.dispatchEvent(ev);
}