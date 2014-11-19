/*!
 * parse-flow-error-position | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/parse-flow-error-position.js
*/
define(function(require,exports,module){

'use strict';

function parseFlowErrorPosition(str) {
  if (typeof str !== 'string') {
    var msg;

    if (arguments.length === 0) {
      msg = 'No arguments.';
    } else {
      msg = str + ' is not a string.';
    }

    throw new TypeError(msg + ' (Argument must be a string)');
  }

  str = str.trim();

  var match = str.match(/(.+?):(\d+?):(\d+?)\,(\d*?:|)(\d+?):(.+?)$/);
  if (!match) {
    throw new Error('Cannot parse the error message.');
  }

  return {
    file: match[1],
    startLine: parseInt(match[2], 10),
    startCol: parseInt(match[3], 10),
    endLine: parseInt(match[4] || match[2], 10),
    endCol: parseInt(match[5], 10),
    type: match[6].trim(),
  };
}

return parseFlowErrorPosition;

});
