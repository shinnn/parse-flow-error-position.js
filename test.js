'use strict';

var requireBowerFiles = require('require-bower-files');
var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(6);

    t.deepEqual(main('/foo/bar.js:9:5,11:1: object literal'), {
      file: '/foo/bar.js',
      startLine: 9,
      startCol: 5,
      endLine: 11,
      endCol: 1,
      type: 'object literal'
    }, 'should parse an error message of Flow.');

    t.deepEqual(main('/foo/bar.js:9:5,11: string'), {
      file: '/foo/bar.js',
      startLine: 9,
      startCol: 5,
      endLine: 9,
      endCol: 11,
      type: 'string'
    }, 'should parse an error message even if the end line number is abbreviated.');

    t.deepEqual(main('d:\\foo\\bar\\baz.js:1:1,2: number'), {
      file: 'd:\\foo\\bar\\baz.js',
      startLine: 1,
      startCol: 1,
      endLine: 1,
      endCol: 2,
      type: 'number'
    }, 'should support Windows path.');

    t.throws(
      main.bind(null, 'foo'), /Cannot parse/,
      'should throw an error when the string is not an error message of Flow.'
    );

    t.throws(
      main.bind(null, ['foo']), /TypeError.*is not a string/,
      'should throw an error when it takes a non-string argument.'
    );

    t.throws(
      main.bind(null), /TypeError.*No arguments/,
      'should throw an error when it takes no arguments.'
    );
  });
}

runTest('require(\'parse-flow-error-position\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.parseFlowErrorPosition', window.parseFlowErrorPosition);
