describe('easter.js', function () {
	var	fixture = [
			'<input id="input" type="text" name="foo">',
			'<div id="div">foo</div>',
			'<span id="span" contenteditable>foo</span>'
		].join(''),
		pattern = [97, 98, 'c'],
		sequenceMax = easter.defaults.sequenceMax,
		delay = easter.defaults.delay;

	beforeEach(function () {
		document.body.innerHTML = fixture;
	});

	afterEach(function () {
		easter.defaults.sequenceMax = sequenceMax;
		easter.defaults.delay = delay;
	});

	describe('private api', function () {
		it('validates event target', function () {
			var check = easter._utils.isValidTarget;

			expect(check(document.getElementById('input'))).toBe(false);
			expect(check(document.getElementById('div'))).toBe(true);
			expect(check(document.getElementById('span'))).toBe(false);
		});

		it('converts strings in pattern to key codes', function () {
			var convert = easter._utils.toKeyCodes;

			expect(convert([1, 2, 3])).toEqual([1, 2, 3]);
			expect(convert([1, 'a', 'c'])).toEqual([1, 97, 99]);
		});
	});

	describe('public api', function () {
		it('registers sequence', function () {
			var	callback = jasmine.createSpy(),
				deregister = easter().register(pattern, callback);

			expect(callback.calls.length).toEqual(0);

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.body, 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(1);
			});

			runs(function () {
				keyup(document.body, 64);
			});

			runs(function () {
				keyup(document.body, 64);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(1);
			});

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.getElementById('div'), 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(2);
			});

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.getElementById('input'), 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(2);
			});

			runs(deregister);

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.body, 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(2);
			});
		});

		it('registers multiple sequences', function () {
			var callback = jasmine.createSpy();

			easter().register(pattern, callback);
			easter().register(pattern.slice().reverse(), callback);

			expect(callback.calls.length).toEqual(0);

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.body, 99);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(2);
			});
		});

		it('fails for sequences that are too long', function () {
			var callback = jasmine.createSpy();

			easter.defaults.sequenceMax = pattern.length - 1;

			easter().register(pattern, callback);
			easter().register(pattern.slice(0, easter.defaults.sequenceMax), callback);

			expect(callback.calls.length).toEqual(0);

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			runs(function () {
				keyup(document.body, 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(1);
			});
		});

		it('fails for sequences entered too slowly', function () {
			var callback = jasmine.createSpy();

			easter().register(pattern, callback);

			expect(callback.calls.length).toEqual(0);

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			waits(600);

			runs(function () {
				keyup(document.body, 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(0);
				easter.defaults.delay = 700;
			});

			runs(function () {
				keyup(document.body, 97);
			});

			runs(function () {
				keyup(document.body, 98);
			});

			waits(600);

			runs(function () {
				keyup(document.body, 99);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(1);
			});
		});
	});
});
