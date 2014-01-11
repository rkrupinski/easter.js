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

	// deregister sequence
	deregister();
});
```

Installation
------------
`bower install easter.js`

Docs
----
Supported sequence formats:
- `['a', 'b', 'c']` \*
- `[65, 66, 67]`
- `['a', 66, 'c']` \*
- `'a b c'` \*

\* - When using strings, you're limited to:
- `a-z`
- `0-9`
- `left`, `right`, `up`, `down`, `shift`, `ctrl`, `alt`, `space`

Sequence can be deregistered by calling function returned by `register()` call.

Default configuration can be altered as it is exposed via `easter.defaults`. Available configuration options are:
- `sequenceMax`: maximum length of registered sequence (default: `20`)
- `delay`: maximum delay between keystrokes in ms (default: `500`)

Using standalone:
```js
easter().register(sequence, callback);
```

Using with [RequireJS](http://requirejs.org/):
```js
require(['easter'], function (easter) {
	easter().register(sequence, callback);
});
```

Using with [browserify](http://browserify.org/):
```js
var easter = require('./easter.js');

easter().register(sequence, callback);
```

Browser support
---------------
IE9+
