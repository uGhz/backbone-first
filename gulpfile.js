var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

//Browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
	    dist    : './dist',
	    scripts : [
	               './src/app/models/*.js',
	               './src/app/collections/*.js',
	               './src/app/views/*.js',
	               './src/app/app.js'
	    ],
	    styles  : './src/assets/styles/**/*.css',
	    html    : './src/**/*.html',
	    images  : ['./src/assets/favicon.ico', './src/assets/images/**/*.*']
};

/*
 * Cleans the dist directory
 */
gulp.task('clean:scripts', function (cb) {
    return del(paths.dist + '/js', cb);
});

gulp.task('clean:styles', function (cb) {
	return del(paths.dist + '/css', cb);
});

gulp.task('clean:images', function (cb) {
	return del(paths.dist + '/images', cb);
});

gulp.task('clean:html', function (cb) {
	return del(paths.dist + '/**/*.html', cb);
});

gulp.task('browserify', function() {
    return browserify('./src/app/app.js').bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

/*
 * Compiles less files into css
 */
gulp.task('styles', ['clean:styles'], function () {
    return gulp.src(paths.styles)
//         .pipe(less())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.dist + '/css'));
});

/*
 * Checks the validity of JS code
 */
gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*
 * Copies html files to dist directory
 */
gulp.task('html', ['clean:html'], function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});

/*
 * Copies images files to dist directory
 */
gulp.task('images', ['clean:images'], function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist + '/images'));
});

/*
 * 
 */
gulp.task('html-watch', ['html'], function () {
	browserSync.reload();
});
gulp.task('styles-watch', ['styles'], function () {
	browserSync.reload();
});
gulp.task('scripts-watch', ['lint', 'browserify'], function () {
	browserSync.reload();
});
gulp.task('images-watch', ['images'], function () {
	browserSync.reload();
});

/*
 * Synchronizes the browser with the 'dist' directory
 */
gulp.task('serve', ['build'], function () {
	
    browserSync.init({
        // notify: false,
        port: 9025,
        server: {
            baseDir: "dist"
        },
        browser: "google chrome"
    });

    gulp.watch(paths.scripts, ['scripts-watch']);
    gulp.watch(paths.styles, ['styles-watch']);
    gulp.watch(paths.html, ['html-watch']);
    gulp.watch(paths.images, ['images-watch']);
});


gulp.task('build', [
                    'lint',
                    'browserify',
                    'html',
                    'images',
                    'styles'
                ]);
gulp.task('default', ['serve']);