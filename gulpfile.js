/*
	PLUGINS:
		gulp
		gulp-concat
		gulp-declare
		gulp-handlebars
		gulp-sass
		gulp-uglifyjs
		gulp-watch
		gulp-wrap
		node-bourbon
*/

var gulp = require('gulp');
var watch = require('gulp-watch');

// sass
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var minifyCSS = require('gulp-minify-css');

// js
var uglify = require('gulp-uglifyjs');

// handlebars
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass({
            includePaths: ['sass'].concat(bourbon),
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['sass']);