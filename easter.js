(function (root, factory) {
	'use strict';


	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return factory();
		});
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.easter = factory();
	}

}(this, function () {
	'use strict';


	function isValidTarget(element) {
		return	element.nodeName.toLowerCase() !== 'input' &&
			element.nodeName.toLowerCase() !== 'textarea';
	}

	function f() {

		return {

			register: function(pattern, callback) {

				var	sequence = [],
					patternStr = pattern.toString(),
					timer;

				function wrapper(e) {

					if (!isValidTarget(e.target)) {
						return;
					}

					sequence.push(e.keyCode);

					if (sequence.toString().indexOf(patternStr) !== -1) {
						sequence.length = 0;
						callback();
					}

					if (sequence.length > f.defaults.sequenceMax) {
						sequence.shift();
					}

					clearTimeout(timer);

					timer = setTimeout(function() {
						sequence.length = 0;
					}, f.defaults.delay);

				}

				if (typeof addEventListener === 'function') {
					addEventListener('keyup', wrapper);
				}

				return function() {
					if (typeof removeEventListener === 'function') {
						removeEventListener('keyup', wrapper);
					}
				};

			}
		};

	}

	f.defaults = {
		sequenceMax: 20,
		delay: 500
	};


	/* test-code */

	f._private = {};

	f._private.isValidTarget = isValidTarget;

	/* end-test-code */


	return f;
	
}));