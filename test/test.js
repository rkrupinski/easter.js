var	fixture = '<input id="input" type="text" name="foo"><div id="div"></div>',
	pattern = [65, 66, 67],
	callback = function() {};


describe('easter.js', function () {

	beforeEach(function () {
		document.body.innerHTML = fixture;
	});

	describe('private api', function () {

		it('checks keyup target', function () {
			var check = easter._private.isValidTarget;

			expect(check(document.getElementById('input'))).toBe(false);
			expect(check(document.getElementById('div'))).toBe(true);
		});
	});

	describe('public api', function () {

		it('registers sequence', function () {
			spyOn(window, 'callback');

			var sequence = easter().register(pattern, callback);

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

		it('registers multiple sequences', function () {
			spyOn(window, 'callback');

			var	sequence1 = easter().register(pattern, callback),
				sequence2 = easter().register(pattern.reverse(), callback);

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
				keyup(document.body, 66);
			});

			runs(function () {
				keyup(document.body, 65);
			});

			runs(function () {
				expect(callback.calls.length).toEqual(2);
			});

		});

	});

});
