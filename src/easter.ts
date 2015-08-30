'use strict';

interface EasterDictionary {
  [index: string]: number;
}

interface EasterUtils {
  [index: string]: Function;
}

interface EasterFactory extends Function {
  (): Easter;
  defaults: EasterFactoryDefaults;
  _dict?: EasterDictionary;
  _utils?: EasterUtils;
}

interface EasterFactoryDefaults {
  sequenceMax: number;
  delay: number;
}

interface Easter {
  register(pattern: Array<string|number>, callback: Function): EasterControl;
  register(pattern: string, callback: Function): EasterControl;
}

interface EasterControl extends Function {
  (): void;
}

interface EasterWrapper extends Function {
  (e: EasterKeyupEvent): void;
}

interface EasterKeyupEvent extends KeyboardEvent {
  target: HTMLElement;
}

const dict: EasterDictionary = {
  left: 37,
  right: 39,
  up: 38,
  down: 40,
  shift: 16,
  ctrl: 17,
  alt: 18,
  space: 32
};

function isValidTarget(node: HTMLElement): boolean {
  return node.nodeName.toLowerCase() !== 'input' &&
    node.nodeName.toLowerCase() !== 'textarea' &&
    !node.hasAttribute('contenteditable');
}

function ensureArray(pattern: Array<string|number>): Array<string|number>;
function ensureArray(pattern: string): string[];
function ensureArray(pattern): any {
  return typeof pattern === 'string' ? pattern.split(/\s+/) : pattern;
}


function normalize(input: number): number;
function normalize(input: string): number|string;
function normalize(input): any {
  var output = input,
    charCode;

  if (typeof input === 'string') {
    charCode = input.charCodeAt(0);

    switch (true) {
      case (dict.hasOwnProperty(input)):
        output = dict[input];
        break;
      case (charCode > 96 && charCode < 123):
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

const factory = (function(): EasterFactory {
  let f = <EasterFactory>function() {
    return {
      register(pattern, callback) {
        let patternArr = ensureArray(pattern).map(normalize),
          wrapper: EasterWrapper,
          patternStr,
          sequence,
          timer;

        if (!pattern.length || patternArr.length > f.defaults.sequenceMax) {
          return;
        }

        patternStr = patternArr.toString();
        sequence = [];

        wrapper = function (e) {
          if (!isValidTarget(e.target)) {
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
        };

        window.addEventListener('keyup', wrapper);

        return function() {
          window.removeEventListener('keyup', wrapper);
          wrapper = null;
        };
      }
    };
  };

  f.defaults = {
    sequenceMax: 20,
    delay: 500
  };

  /* test-code */

  f._dict = dict;
  f._utils = { isValidTarget, ensureArray, normalize };

  /* end-test-code */

  return f;
} ());
