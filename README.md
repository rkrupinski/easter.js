easter.js
=========

Easter eggs made easy.

Ever wanted to make the KONAMI code work on your website?

```js
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

var deregister = easter().register(konamiCode, function() {
	doSomeFancyStuff();

	// do stuff once
	deregister();
});
```

Installation
------------
`bower install easter.js`

Browser support
---------------
IE9+
