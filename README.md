easter.js
=========
Easter eggs made easy.

[![Build Status](https://travis-ci.org/rkrupinski/easter.js.png?branch=master)](https://travis-ci.org/rkrupinski/easter.js)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Ever wanted to make the KONAMI code work on your website?

```js
var konamiCode = 'up up down down left right left right b a';

var deregister = easter().register(konamiCode, function() {
	// do fancy stuff
});
```

Usage
-----
Key sequence can be expressed in different formats:
- `['a', 'b', 'c']`\*
- `[65, 66, 67]`
- `['a', 66, 'c']`\*
- `'a b c'`\*

\* When using strings, you're limited to:
- `[a-z]`, `[0-9]`
- `'left'`, `'right'`, `'up'`, `'down'`, `'shift'`, `'ctrl'`, `'alt'`, `'space'`

A sequence can be deregistered easily. Just use the function returned by `register()` call.

Installation
------------
`bower install easter.js`

Browser support
---------------
IE9+
