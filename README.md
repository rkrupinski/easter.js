easter.js
=========
[![Build Status](https://travis-ci.org/rkrupinski/easter.js.png?branch=master)](https://travis-ci.org/rkrupinski/easter.js)

Easter eggs made easy.

Ever wanted to make the KONAMI code work on your website?

```js
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
// It also supports strings, e.g., ['a', 'b', 'c'].

var deregister = easter().register(konamiCode, function() {
	// Do fancy stuff.

	// Remove listener.
	deregister();
});
```

Installation
------------
`bower install easter.js`

Browser support
---------------
IE9+
