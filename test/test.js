describe('easter.js', function () {

	describe('private', function () {

		var utils = easter._utils;

		describe('utils.isValidTarget', function () {

			it('should return false when passed input element', function () {
				var input = document.createElement('input');

				expect(utils.isValidTarget(input)).toBe(false);
			});

			it('should return false when passed textarea element', function () {
				var textarea = document.createElement('textarea');

				expect(utils.isValidTarget(textarea)).toBe(false);
			});

			it('should return false when passed element with contenteditable attr',
					function () {
				var div = document.createElement('div');
				div.setAttribute('contenteditable', true);

				expect(utils.isValidTarget(div)).toBe(false);
			});

			it('should return true when passed any other element', function () {
				var div = document.createElement('div');

				expect(utils.isValidTarget(div)).toBe(true);
			});

		});

		describe('utils.normalize', function () {

			it('should return the input unchanged if it\'s not a string (assumes number)',
					function () {
				var input = 66;

				expect(utils.normalize(input)).toBe(input);
			});

			it('should only care about first character of string input (for input not' +
					'present in dict)', function () {
				var input1 = 'ax';
				var input2 = 'ay';

				expect(utils.normalize(input1)).toEqual(utils.normalize(input2));
			});

			it('should decrease charCode by 32 within the range of 97 - 122',
					function () {
				var input = 'x';

				expect(utils.normalize(input)).toEqual(input.charCodeAt(0) - 32);
			});

			it('should return the exact charCode within the range of 48 - 57',
					function () {
				var input = '7';

				expect(utils.normalize(input)).toEqual(input.charCodeAt(0));
			});

			it('should use dict for special keys', function () {
				var dict = easter._dict;
				var keyword = 'up';

				expect(dict.hasOwnProperty(keyword)).toBe(true);
				expect(utils.normalize(keyword)).toEqual(dict[keyword]);
			});

		});

		describe('dict', function () {

			it('should contain keyword-keyCode pairs', function () {
				var dict = easter._dict;

				Object.keys(dict).forEach(function (key) {
					expect(typeof dict[key]).toBe('number');
				});
			});

		});

	});

});
