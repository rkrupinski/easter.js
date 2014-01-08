easter.js
=========
Easter eggs made easy.

[![Build Status](https://travis-ci.org/rkrupinski/easter.js.png?branch=master)](https://travis-ci.org/rkrupinski/easter.js)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Ever wanted to make the KONAMI code work on your website?

```js
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right',
		'left', 'right', 'b', 'a'];
// or [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

var deregister = easter().register(konamiCode, function() {
	// do some fancy stuff

	// deregister sequence
	deregister();
});
```

Usage
-----

Installation
------------
`bower install easter.js`

Browser support
---------------
IE9+
