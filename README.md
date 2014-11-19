# parse-flow-error-position.js

[![Build Status](https://travis-ci.org/shinnn/parse-flow-error-position.js.svg?branch=master)](https://travis-ci.org/shinnn/parse-flow-error-position.js)
[![Build status](https://ci.appveyor.com/api/projects/status/51r49djav16035j7?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/parse-flow-error-position-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/parse-flow-error-position.js.svg)](https://coveralls.io/r/shinnn/parse-flow-error-position.js)
[![devDependency Status](https://david-dm.org/shinnn/parse-flow-error-position.js/dev-status.svg)](https://david-dm.org/shinnn/parse-flow-error-position.js#info=devDependencies)

Parse the error position from [Flow] error message

```javascript
parseFlowErrorPosition('/foo/bar.js:8:5,10:1: object literal');
/*=>

  {
    file: '/foo/bar.js',
    startLine: 8,
    startCol: 5,
    endLine: 10,
    endCol: 1,
    type: 'object literal'
  }

*/
```

## Installation

### Package managers

#### [npm](https://www.npmjs.org/) [![NPM version](https://badge.fury.io/js/parse-flow-error-position.svg)](https://www.npmjs.org/package/parse-flow-error-position)

```
npm install parse-flow-error-position
```

#### [Bower](http://bower.io/) [![Bower version](https://badge.fury.io/bo/parse-flow-error-position.svg)](https://github.com/shinnn/parse-flow-error-position.js/releases)

```
bower install parse-flow-error-position
```

#### [Duo](http://duojs.org/)

```javascript
var parseFlowErrorPosition = require('shinnn/parse-flow-error-position.js');
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/parse-flow-error-position.js/master/dist/parse-flow-error-position.js "view raw")

### [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) support

This repository includes [the AMD-friendly build](https://raw.githubusercontent.com/shinnn/parse-flow-error-position.js/master/dist/parse-flow-error-position-amd.js) but the package managers doesn't include it. If you want to use it, download it directly.

## API

### parseFlowErrorPosition(*string*)

*string*: `String`  
Return: `Object`

It takes a line of the error-position information [Flow] produces, and returns an object which has the following properties:

* `file`
* `startLine`
* `startCol`
* `endLine`
* `endCol`
* `type`

```javascript
parseFlowErrorPosition('/path/to/script.js:124:5,11: string');
/*=>

  {
    file: '/foo/bar.js',
    startLine: 124,
    startCol: 5,
    endLine: 124,
    endCol: 11,
    type: 'string'
  }

*/
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[Flow]: http://flowtype.org/