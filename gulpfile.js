/* jshint unused: true */

'use strict';

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var stylish = require('jshint-stylish');
var toCamelCase = require('to-camel-case');

var bower = require('./bower.json');
var funName = toCamelCase(bower.name);
var pkg = require('./package.json');
var banner = require('tiny-npm-license')(pkg);

gulp.task('lint', function() {
  gulp.src(['{,src/}*.js'])
  .pipe($.jscs('.jscs.json'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
  gulp.src(['*.json'])
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('build', ['lint', 'clean'], function() {
  return mergeStream(
    gulp.src(['src/*.js'])
      .pipe($.header(banner + '!function() {\n', {pkg: pkg}))
      .pipe($.footer('\nwindow.' + funName + ' = ' + funName + ';\n}();\n'))
      .pipe($.rename(bower.main))
      .pipe(gulp.dest('')),
    gulp.src(['src/*.js'])
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.footer('module.exports = ' + funName + ';\n'))
      .pipe($.rename(pkg.main))
      .pipe(gulp.dest('')),
    gulp.src(['src/*.js'])
      .pipe($.wrapAmd({exports: funName}))
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.rename(bower.main))
      .pipe($.rename({suffix: '-amd'}))
      .pipe(gulp.dest(''))
  );
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['build']);
  gulp.watch(['*.json', '.jshintrc'], ['lint']);
});

gulp.task('default', ['build', 'watch']);
gulp.task('default', ['build', 'watch']);
