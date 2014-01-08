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

	var dict = {
		'left': 37,
		'right': 39,
		'up': 38,
		'down': 40
	};

	var utils = {
		isValidTarget: function (element) {
			return element.nodeName.toLowerCase() !== 'input' &&
					element.nodeName.toLowerCase() !== 'textarea' &&
					!element.hasAttribute('contenteditable');
		},
		normalizeInput: function (input) {
			var output = input,
					charCode;

			if (typeof input === 'string') {
				charCode = input.charCodeAt(0);

				switch (true) {
					case (dict.hasOwnProperty(input)):
						output = dict[input];
						break;
					case (charCode > 64 && charCode < 123):
						output = charCode - 32;
						break;
					case (charCode > 47 && charCode < 58):
						output = charCode;
						break;
					default:
						output = '☺';
						break;
				}
			}

			return output;
		}
	};

	function f() {
		return {
			register: function(pattern, callback) {
				var sequence = [],
						patternStr = pattern.map(utils.normalizeInput).toString(),
						timer;

				if (typeof window.addEventListener !== 'function' ||
						!pattern.length) {
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