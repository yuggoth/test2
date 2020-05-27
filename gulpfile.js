var gulp = require('gulp'),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require("gulp-concat"),
    terser = require('gulp-terser'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();


gulp.task("html", function() {
    return gulp.src("src/*.html")
         .pipe(gulp.dest("dist"));
});

gulp.task("css", function() {
    return gulp.src("src/css/*.css")
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
              "overrideBrowserslist": [
		    "> 1%",
		    "ie >= 8",
		    "edge >= 15",
		    "ie_mob >= 10",
		    "ff >= 45",
		    "chrome >= 45",
		    "safari >= 7",
		    "opera >= 23",
		    "ios >= 7",
		    "android >= 4",
		    "bb >= 10"
		  ],
            cascade: false
         }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"));
});


gulp.task("scripts", function() {
    return gulp.src("src/js/*.js") 
        .pipe(concat('scripts.js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' })) 
        .pipe(gulp.dest("dist/js"));
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html", gulp.series("html"));
    gulp.watch("src/js/*.js", gulp.series("scripts"));
    gulp.watch("src/css/*.css",  gulp.series("css"));


});

gulp.task("default", gulp.series("browserSync"));
