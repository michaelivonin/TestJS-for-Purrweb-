'use strict';
const gulp = require('gulp'),
  pug = require('gulp-pug'),
  prefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  sass = require('gulp-sass'),
  sassLint = require('gulp-sass-lint'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  rigger = require("gulp-rigger"),
  notify = require("gulp-notify"),
  browserSync = require('browser-sync').create();

let path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/'
  },
  src: {
    pug: 'src/*.pug',
    mainJs: 'src/js/index.js',
    style: 'src/sass/main.sass'
  },
  watch: {
    pug: 'src/**/*.pug',
    mainJs: 'src/js/**/index.js',
    style: 'src/sass/**/*.*'
  }
};

gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  done();
});

gulp.task('html:build', (done) => {
  gulp.src(path.src.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
  done();
});

gulp.task('mainJs:build', (done) => {
  gulp.src(path.src.mainJs)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
  done();
});

gulp.task('style:build', (done) => {
  gulp.src(path.src.style)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
  done();
});

gulp.task('sassLint', (done) => {
  gulp.src('src/sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
  done();
});

gulp.task('build', gulp.series('html:build', 'mainJs:build', 'style:build'));

gulp.task('watch', (done) => {
  gulp.watch(path.watch.pug, gulp.series('html:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.watch.mainJs, gulp.series('mainJs:build'));
  done();
});

gulp.task('default', gulp.series('build', 'browser-sync', 'watch'));