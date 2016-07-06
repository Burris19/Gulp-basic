var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    watch       = require('gulp-watch'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssnano     = require('gulp-cssnano'),
    argv        = require('yargs').argv,
    gulpif      = require('gulp-if'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del');

var isProduction;

if(argv.prod) {
    isProduction = true;
} else {
    isProduction = false;
}

var config = {
    scssDir: './assets/scss',
    cssDir:  './assets/css',
    jsDir:   './assets/js',
    imgDir:  './assets/img'
};

gulp.task('style', function(){
   return gulp.src(config.scssDir + '/*.scss') // Indicamos que archivos queremos compilar
   .pipe(sourcemaps.init())
   .pipe(sass())   
   .on('error', sass.logError) // 
   .pipe(gulpif(isProduction, cssnano(), sourcemaps.write('maps') )) //minificamos el css antes de ser escrito   
   .pipe(gulp.dest(config.cssDir)) // Indicamos donde queremos guardar los estilos
});

gulp.task('concat', function(){
    return gulp.src([
        config.jsDir + '/start.js',
        config.jsDir + '/main.js',
        config.jsDir + '/end.js',
        
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(config.jsDir))
});

gulp.task('compress', ['concat'] , function(){
   return gulp.src(config.jsDir + '/scripts.js') 
   .pipe(uglify())
   .on('error', console.error.bind(console))
   .pipe(gulp.dest(config.jsDir + '/min'))
});

gulp.task('imagemin', function(){
    return gulp.src(config.imgDir + '/*.+(png|jpg|jpeg)')
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgDir + '/'))
        
})

gulp.task('cleanup', function(){
    del(config.cssDir + '/maps/*');
    del(config.cssDir + '/maps/');
});

gulp.task('watch', function(){
    watch(config.scssDir + '/**/*.scss', function(){
        gulp.start('style'); // indica a la funcion de wath que invoque la tarea que indicamos        
    });
});

