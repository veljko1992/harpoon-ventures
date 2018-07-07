"use strict";

const gulp = require("gulp"),
      concat = require("gulp-concat"),
      uglify = require("gulp-uglify"),
      rename = require("gulp-rename"),
      sass = require("gulp-sass"),
      maps = require("gulp-sourcemaps"),
      del = require("del");

gulp.task("concatScripts", function () {
  return gulp.src(["js/main.js"])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
  return gulp.src("js/app.js")
  .pipe(uglify())
  .pipe(rename("app.min.js"))
  .pipe(gulp.dest("js"));
});

gulp.task("compileSass", function () {
  return gulp.src("scss/application.scss")
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write("./"))
  .pipe(gulp.dest("css"));
});

gulp.task("watchFiles", function () {
  gulp.watch("scss/**/*.scss", ["compileSass"]);
  gulp.watch("js/main.js", ["concatScripts"]);
});

gulp.task("build", ["minifyScripts", "compileSass"], function () {
  return gulp.src(["css/application.css", "js/app.min.js"], { base: "./" })
  .pipe(gulp.dest("public/assets"));
});

gulp.task("serve", ["watchFiles"]);

gulp.task("default", ["clean"], function () {
  gulp.start("build");
});
