var	fixture = '<input id="input" type="text" name="foo"><div id="div"></div>',
	pattern = [65, 66, 67],
	sequence,
	callback = function() {};

describe('easter.js', function () {

	beforeEach(function () {
		document.body.innerHTML = fixture;
	});

	it('registers sequence', function () {
		spyOn(window, 'callback');
		sequence = easter().register(pattern, callback);

		runs(function () {
			expect(callback.calls.length).toEqual(0);
		});

		runs(function () {
			keyup(document.body, 65);
		});

		runs(function () {
			keyup(document.body, 66);
		});

		runs(function () {
			keyup(document.body, 67);
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
			keyup(document.body, 65);
		});

		runs(function () {
			keyup(document.body, 66);
		});

		runs(function () {
			keyup(document.getElementById('div'), 67);
		});

		runs(function () {
			expect(callback.calls.length).toEqual(2);
		});

		runs(function () {
			keyup(document.body, 65);
		});

		runs(function () {
			keyup(document.body, 66);
		});

		waits(600);

		runs(function () {
			keyup(document.body, 67);
		});

		runs(function () {
			expect(callback.calls.length).toEqual(2);
		});

		runs(function () {
			keyup(document.body, 65);
		});

		runs(function () {
			keyup(document.body, 66);
		});

		runs(function () {
			keyup(document.getElementById('input'), 67);
		});

		runs(function () {
			expect(callback.calls.length).toEqual(2);
		});

		runs(function () {
			sequence();
		});

		runs(function () {
			keyup(document.body, 65);
		});

		runs(function () {
			keyup(document.body, 66);
		});

		runs(function () {
			keyup(document.body, 67);
		});

		runs(function () {
			expect(callback.calls.length).toEqual(2);
		});

	});

});