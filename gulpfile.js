const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const nunjucksRender = require('gulp-nunjucks-render');
const prettyHtml = require('gulp-pretty-html');

const snippets = "src/templates/";
const paths = {
  styles: {
    src: ['src/scss/*.scss', snippets + '**/*.scss'],
    watch: ['src/scss/*.scss', snippets + '**/*.scss'],
    tmp:  'tmp/',
    dest: 'app/css/'
  },
  js: {
    src: ['src/js/*.js', snippets + '**/*.js'],
    watch: ['src/js/*.js', snippets + '**/*.js'],
    tmp:  'tmp/',
    dest: 'app/js/'
  },
  templates: {
    src: 'src/html/**/*.html',
    snips: 'src/templates',
    watch: ['src/html/**/*.html', 'src/templates/**/*.html'],
    dest: 'app'
  },
  fonts: {
    src: 'src/fonts/**/*',
    watch: 'src/fonts/**/*',
    dest: 'app/fonts'
  },
  data: {
    src: 'src/json/**/*',
    watch: 'src/json/**/*.json',
    dest: 'app/json'
  },
  images: {
    src: 'src/images/**/*',
    watch: 'src/images/**/*.(svg|png|jpg)',
    dest: 'app/images'
  }
}

const sources = paths.styles.watch
  .concat(paths.js.watch)
  .concat(paths.fonts.watch)
  .concat(paths.data.watch)
  .concat(paths.templates.watch)
  .concat(paths.images.watch);

gulp.task('styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(gulp.dest(paths.styles.tmp))
    .pipe(sourcemaps.init())
    .pipe(concat('site.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('js', () => {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.tmp))
    .pipe(sourcemaps.init())
    .pipe(concat('site.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('nunjucks', function() {
  return gulp.src(paths.templates.src)
  .pipe(nunjucksRender({
      path: paths.templates.snips
  }))
  .pipe(prettyHtml())
  .pipe(gulp.dest(paths.templates.dest))
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('data', function() {
  return gulp.src(paths.data.src)
    .pipe(gulp.dest(paths.data.dest));
});

gulp.task('images', function() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('clean', () => {
    return del([
      paths.styles.tmp, paths.styles.dest, paths.js.tmp, paths.js.dest
    ]);
});

gulp.task('default', gulp.series(['clean', 'js', 'styles', 'nunjucks', 'fonts', 'data', 'images']));

gulp.task('watch', () => {
  gulp.watch(sources, (done) => {
      gulp.series(['clean', 'js','styles', 'nunjucks', 'fonts', 'data', 'images'])(done);
  });
});