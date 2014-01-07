(function (root, factory) {
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

	var utils = {
		isValidTarget: function (element) {
			return element.nodeName.toLowerCase() !== 'input' &&
					element.nodeName.toLowerCase() !== 'textarea' &&
					!element.hasAttribute('contenteditable');
		}
	};

	function f() {
		return {
			register: function(pattern, callback) {
				var sequence = [],
						patternStr = pattern.toString(),
						timer;

				if (typeof window.addEventListener !== 'function') {
					return;
				}

				function wrapper(e) {

					if (!utils.isValidTarget(e.target)) {
						return;
					}

					sequence.push(e.keyCode);

					if (sequence.length > f.defaults.sequenceMax) {
						sequence.shift();
					}

					if (sequence.toString().indexOf(patternStr) !== -1) {
						sequence.length = 0;
						callback();
					}

					clearTimeout(timer);

					timer = setTimeout(function () {
						sequence.length = 0;
					}, f.defaults.delay);

				}

				window.addEventListener('keyup', wrapper);

				return function () {
					window.removeEventListener('keyup', wrapper);
					wrapper = null;
				};

			}
		};
	}

	f.defaults = {
		sequenceMax: 20,
		delay: 500
	};

	/* test-code */

	f._utils = utils;

	/* end-test-code */

	return f;
}));