const gulp = require('gulp');
const pump = require('pump');
const svgmin = require('gulp-svgmin');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const fontName = 'cryptocoins';

const paths = {
  input: 'SVG/**/*.svg',
  output: 'SVG/',
  font_output: 'webfont/',
}

gulp.task('optimize', cb => {
  console.log('-- Optimizing SVG files');
  pump([
    gulp.src(paths.input),
    svgmin(),
    gulp.dest(paths.output),
  ], cb );
});

gulp.task('webfont', cb => {
  console.log('-- Generating webfont');
  pump([
    gulp.src(paths.input),
    iconfontCss({
      fontName: fontName,
      path: 'src/icons-template.css',
      targetPath: 'cryptocoins.css',
      fontPath: '',
      cssClass: 'cc'
    }),
    iconfont({
      fontName: fontName,
      prependUnicode: true,
      formats: ['ttf', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001,
      descent: 200,
     }),
    gulp.dest(paths.font_output),
  ], cb );
});


gulp.task('default', ['optimize', 'webfont'], () => {});
