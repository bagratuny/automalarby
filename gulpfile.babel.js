// import jsLibsArray from './js-libs-array.js';

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  uglifyjs = require("gulp-uglifyjs"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  del = require("del"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        browsers: ["last 50 versions"]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task(
  "init",
  gulp.series("sass", function() {
    browserSync.init({
      server: {
        baseDir: "./src"
      },
      notify: false
    });
    gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
    gulp.watch("./src/**/*.html").on("change", browserSync.reload);
    gulp.watch("./src/**/*.js").on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series("init"));

gulp.task("css-libs", function(done) {
  return gulp
    .src("src/css/libs.css")
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("src/css"));
});

gulp.task("js-libs", function(done) {
  return gulp
    .src(jsLibsArray)
    .pipe(concat("libs.min.js"))
    .pipe(uglifyjs())
    .pipe(gulp.dest("src/js"));
});

gulp.task("libs", gulp.series("sass", "css-libs", function(done) {}));

gulp.task(
  "build",
  gulp.series("sass", function(done) {
    gulp.src("./src/*.html").pipe(gulp.dest("./public/build/"));
    gulp.src("./src/*.*").pipe(gulp.dest("./public/build/"));
    gulp
      .src(["!src/css/libs.css", "./src/css/**/*.css"])
      .pipe(cssnano())
      .pipe(gulp.dest("./public/build/css"));
    gulp.src("./src/js/**/*.js").pipe(gulp.dest("./public/build/js"));
    gulp.src("./src/fonts/**/*").pipe(gulp.dest("./public/build/fonts"));
    gulp.src("./src/img/**/*").pipe(gulp.dest("./public/build/img"));

    done();
  })
);
