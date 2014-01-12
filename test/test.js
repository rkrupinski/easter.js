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

			it('should fail for strings from outside the range (not supported yet)',
					function () {
				var input = ';';

				expect(typeof utils.normalize(input)).toBe('string');
			});

		});

		describe('utils.ensureArray', function () {

			it('should return input unchanges if it\'s an array', function () {
				var input = ['a', 'b', 1];

				expect(utils.ensureArray(input)).toBe(input);
			});

			it('should convert input to array (assumes string)', function () {
				var input = 'a b 1';
				var output = ['a', 'b', '1'];

				expect(utils.ensureArray(input)).toEqual(output);
			});

			it('should strip all unnecessary whitespace', function () {
				var input = 'a	b     1';

				expect(utils.ensureArray(input).length).toEqual(3);
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

	describe('public', function () {

		beforeEach(function () {
			document.body.innerHTML = '<div></div>';
		});

		describe('register', function () {

			it('should register a sequence as array of keyCodes', function () {
				var seq = [65, 66, 67];
				var spy = jasmine.createSpy('"array of numbers spy"');

				easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(67);

				expect(spy).toHaveBeenCalled();
			});

			it('should register a sequence as array of strings', function() {
				var seq = ['a', 'b', 'c'];
				var spy = jasmine.createSpy('"array of strings spy"');

				easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(67);

				expect(spy).toHaveBeenCalled();
			});

			it('should register a sequence as array of mixed values', function () {
				var seq = [65, 'b', 'ctrl'];
				var spy = jasmine.createSpy('"array of mixed values spy"');

				easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(easter._dict[seq[2]]);

				expect(spy).toHaveBeenCalled();
			});

			it('should register a sequence as string', function () {
				var seq = 'a b c  1';
				var spy = jasmine.createSpy('"string spy"');

				easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(67);
				keyup(easter._utils.normalize(seq.split(/\s+/)[3]));

				expect(spy).toHaveBeenCalled();
			});

			it('should call passed function each time a sequence matches', function () {
				var seq = [65, 66, 67];
				var spy = jasmine.createSpy('"multiple calls spy"');

				easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(67);

				expect(spy.calls.length).toEqual(1);

				keyup(65);
				keyup(66);
				keyup(67);

				expect(spy.calls.length).toEqual(2);
			});

			it('should deregister a sequence', function () {
				var seq = [65, 66, 67];
				var spy = jasmine.createSpy('"deregister spy"');

				var deregister = easter().register(seq, spy);

				expect(typeof deregister).toBe('function');

				keyup(65);
				keyup(66);
				keyup(67);

				expect(spy.calls.length).toEqual(1);

				deregister();

				keyup(65);
				keyup(66);
				keyup(67);

				expect(spy.calls.length).toEqual(1);
			});

			it('should register any number of sequences', function () {
				var seq1 = [65, 66, 67];
				var seq2 = [66, 67, 68];
				var spy1 = jasmine.createSpy('"multiple sequences spy 1"');
				var spy2 = jasmine.createSpy('"multiple sequences spy 2"');

				easter().register(seq1, spy1);
				easter().register(seq2, spy2);

				keyup(65);
				keyup(66);
				keyup(67);
				keyup(68);

				expect(spy1).toHaveBeenCalled();
				expect(spy2).toHaveBeenCalled();
			});

			it('shouldn\'t register an empty array', function () {
				var seq = [];
				var spy = jasmine.createSpy('"empty array spy"');

				var returnedValue = easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(67);

				expect(typeof returnedValue).not.toBe('function');
				expect(spy).not.toHaveBeenCalled();
			});

			it('shouldn\'t register an empty string', function () {
				var seq = '';
				var spy = jasmine.createSpy('"empty string spy"');

				var returnedValue = easter().register(seq, spy);

				keyup(65);
				keyup(66);
				keyup(67);

				expect(typeof returnedValue).not.toBe('function');
				expect(spy).not.toHaveBeenCalled();
			});

		});

		describe('config', function () {

			describe('defaults.sequenceMax', function () {
				var sequenceMax = easter.defaults.sequenceMax;

				afterEach(function () {
					easter.defaults.sequenceMax = sequenceMax;
				});

				it('shouldn\'t register a sequence if it\'s too long', function () {
					var seq = [65, 66, 67];
					var spy = jasmine.createSpy('"long sequence spy"');

					easter.defaults.sequenceMax = 2;

					var returnedValue = easter().register(seq, spy);

					keyup(65);
					keyup(66);
					keyup(67);

					expect(typeof returnedValue).not.toBe('function');
					expect(spy).not.toHaveBeenCalled();
				});

			});

			describe('defaults.delay', function () {
				var delay = easter.defaults.delay;

				beforeEach(function () {
					jasmine.Clock.useMock();
				});

				afterEach(function () {
					easter.defaults.delay = delay;
				});

				it('should interrupt the sequence if delay between keystrokes is too long',
						function () {
					var seq = [65, 66, 67];
					var spy = jasmine.createSpy('"slow sequence spy"');

					easter.defaults.delay = 300;

					easter().register(seq, spy);

					keyup(65);
					keyup(66);
					jasmine.Clock.tick(350);
					keyup(67);

					expect(spy).not.toHaveBeenCalled();
				});

			});

		});

	});

});
