var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', function(){
   return gulp.src('src/css/**/*.scss')
       .pipe(plumber())
       .pipe(sass({style: "compressed"}))
       .pipe(gulp.dest('dist/css'))
});


// Content
gulp.task('ts-content-compile', function(){
   return gulp.src('src/ts/**/_content.ts')
       .pipe(plumber())
       .pipe(ts({target:"ES5", sortOutput:true, module:"commonjs"}))
       .pipe(uglify())
       .pipe(rename({extname: ".js"}))
       .pipe(gulp.dest('src/js'));
});

gulp.task('ts-content-browserify', ['ts-content-compile'], function(){
    return browserify({entries: 'src/js/_content.js'})
        .bundle()
        .pipe(plumber())
        .pipe(source("content.min.js"))
        .pipe(gulp.dest('dist/js'));
});

// Embedded
gulp.task('ts-embed-compile', function(){
    return gulp.src('src/ts/**/[^_]*.ts')
        .pipe(plumber())
        .pipe(ts({target:"ES5", sortOutput:true, module:"commonjs"}))
        .pipe(uglify())
        .pipe(rename({extname: ".js"}))
        .pipe(gulp.dest('src/js'));

});

gulp.task('ts-embed-pack', ['ts-embed-compile'], function(){
    return browserify({entries: ['src/js/embedded.js']})
        .bundle()
        .pipe(plumber())
        .pipe(source("embedded.min.js"))
        .pipe(gulp.dest('dist/js'));
});

// Options
gulp.task('ts-options', function(){
    gulp.src('src/ts/**/_options.ts')
        .pipe(plumber())
        .pipe(ts({target:"ES5", sortOutput:true, module:"commonjs"}))
        .pipe(uglify())
        .pipe(rename("options.min.js"))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', function(){
    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch('src/ts/**/_content.ts', ['ts-content-compile', 'ts-content-browserify']);
    gulp.watch('src/ts/**/_options.ts', ['ts-options']);
    gulp.watch('src/ts/**/[^_]*.ts', ['ts-embed-compile', 'ts-embed-pack']);
});

gulp.task('default', ['watch'], function(){});