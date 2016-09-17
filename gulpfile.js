// Variables with all technologies.
// ----------------------------------------------------------------------
var gulp        = require('gulp'),                  // Task Runner.
    plumber     = require('gulp-plumber'),          // Prevent breakings caused by plugins errors.
    uglify      = require('gulp-uglify'),           // To minify JS files.
    cssmin      = require('gulp-cssmin'),           // To minify CSS files.
    imagemin    = require('gulp-imagemin');         // To image compress.


// Constants with all directories and files path.
// ----------------------------------------------------------------------
const src_path = {
  css: 'assets/css/**/*.css',
  js: 'assets/js/**/*.js',
  images: 'assets/images/**/*'
};

const build_path = {
  css: '_site/assets/css/',
  js: '_site/assets/js/',
  images: '_site/assets/images/'
};

// CSS task.
// ----------------------------------------------------------------------
gulp.task('css', function () {
  gulp.src(src_path.css)
    .pipe(cssmin())
    .pipe(gulp.dest(build_path.css));
});

// JavaScript task.
// Using gulp-uglify plugin.
// ---------------------------------------------------------------------
gulp.task('js', function() {
  gulp.src(src_path.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(build_path.js));
});

// Image compress task.
// With gulp-imagemin plugin.
// ---------------------------------------------------------------------
gulp.task('images', function(){
  gulp.src(src_path.images)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 4
    }))
    .pipe(gulp.dest(build_path.images));
});

// Gulp tasks.
// ---------------------------------------------------------------------
gulp.task('default', ['css', 'js', 'images']);
gulp.task('imagesCompress', ['images']);
gulp.task('cssCompress', ['css']);
gulp.task('jsCompress', ['js']);
