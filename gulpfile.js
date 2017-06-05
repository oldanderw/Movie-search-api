var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');


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
