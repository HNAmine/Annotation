var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

var config = require('./gulp.config')();
var util = require('./gulp.util');
var tsProject = $.typescript.createProject('tsconfig.json');

gulp.task('tsc', function() {
	var tsResult = tsProject.src() // instead of gulp.src(...)
		.pipe($.typescript(tsProject));

	return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('serve', ['tsc'], function () {
  $.nodemon(config.nodemonfig).on('restart', function () {
    util.infoLog('===============');
    util.successLog('Restarting ....');
    util.infoLog('===============');
  });
});

gulp.task('default', ['serve']);

// gulp.task('watch', function () {
//   gulp.watch(config.tsFiles, ['tsc']);
// });

///////////////////////////////////////////////////////////////
