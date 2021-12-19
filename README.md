
# jsmin

Fast js minifier

## Features

 - CLI
 - JavaScript API
 - Support recursive
 - Create ".min.js" file automatically
 - Support watch mode


## Installation

Install jsmin with npm

```bash
npm install @erwinstone/jsmin -g
```

## Usage/Examples

### cli:
```bash
jsmin dist/js
jsmin dist/js --watch
```

### javascript api:
```bash
npm install @erwinstone/jsmin
```
```javascript
import { jsmin, jsminStr } from '@erwinstone/jsmin'

await jsmin({
	path: 'dist/js',
})

// or

await jsmin({
	path: 'dist/js',
	watch: true,
})

// or

await jsminStr(`
	function hello() {
		console.log("Hello world");
	}
`)
```
