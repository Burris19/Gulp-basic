var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    watch   = require('gulp-watch');

var config = {
    scssDir: './assets/scss',
    cssDir:  './assets/css'
};

gulp.task('style', function(){
   gulp.src(config.scssDir + '/*.scss') // Indicamos que archivos queremos compilar
   .pipe(sass())   
   .on('error', sass.logError) // 
   .pipe(gulp.dest(config.cssDir)) // Indicamos donde queremos guardar los estilos
});


gulp.task('watch', function(){
    watch(config.scssDir + '/**/*.scss', function(){
        gulp.start('style'); // indica a la funcion de wath que invoque la tarea que indicamos
    });
});