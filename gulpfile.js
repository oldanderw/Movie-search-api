const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');


gulp.task('scss', function() {
 return gulp.src('./scss/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass())
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest('./css'))
   .pipe(browserSync.reload({
     stream: true
   }))
})

gulp.task('browser-sync', function(){
  browserSync.init({
    server:{
      baseDir:"./"
    }
  })
})
gulp.task('watch', ['browser-sync', 'scss'] ,function () {
  gulp.watch('./scss/**/*.scss', ['scss']);
});
