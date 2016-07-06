var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    watch       = require('gulp-watch'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssnano     = require('gulp-cssnano'),
    argv        = require('yargs').argv,
    gulpif      = require('gulp-if');

var isProduction;

if(argv.prod) {
    isProduction = true;
} else {
    isProduction = false;
}

var config = {
    scssDir: './assets/scss',
    cssDir:  './assets/css'
};

gulp.task('style', function(){
   gulp.src(config.scssDir + '/*.scss') // Indicamos que archivos queremos compilar
   .pipe(sourcemaps.init())
   .pipe(sass())   
   .on('error', sass.logError) // 
   .pipe(gulpif(isProduction, cssnano(), sourcemaps.write('maps') )) //minificamos el css antes de ser escrito   
   .pipe(gulp.dest(config.cssDir)) // Indicamos donde queremos guardar los estilos
});


gulp.task('watch', function(){
    watch(config.scssDir + '/**/*.scss', function(){
        gulp.start('style'); // indica a la funcion de wath que invoque la tarea que indicamos        
    });
});