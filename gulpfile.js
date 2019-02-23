var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass' , function(){
    return gulp.src('./src/select.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch' , function(){
    gulp.watch('./src/select.scss' , gulp.series('sass'));

});
