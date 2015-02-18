/*
	PLUGINS:
		gulp
		gulp-concat
		gulp-declare
		gulp-handlebars
		gulp-sass
		gulp-sourcemaps
		gulp-uglifyjs
		gulp-watch
		gulp-wrap
		node-bourbon
*/

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

// sass
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var bourbon = require('node-bourbon').includePaths;

// js
var uglify = require('gulp-uglifyjs');

// handlebars
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('assets/scss/*.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['sass'].concat(bourbon),
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload());
});

gulp.task('js', function() { // only need to mess with app.js for now
	gulp.src('assets/js/app.js')
		.pipe(uglify('app.min.js'))
		.pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','js']);