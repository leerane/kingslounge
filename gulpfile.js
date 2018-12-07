"use strict";

/* Name variables */

var name = {
  jsFile: "main.js",
  cssFile: "styles.css",
  scssFile: "styles.scss",
  libsFile: "libs.js",
  configFile: "_config.scss",
  spriteFile: "_sprite.scss",
  lastAttrFile: "_last-attr.scss"
};

/* Path variables */

var path = {
  sourcePath: "./source",
  buildPath: "./build",
  scssPath: "/sass",
  cssPath: "/css",
  jsPath: "/js",
  imgPath: "/img",
  imgOriginalPath: "/original",
  svgPath: "/svg",
  spritePath: "/sprite",
  jsModulesPath: "/modules",
  libsPath: "/libs",
  blocksPath: "/blocks",
  utilityPath: "/utility",
  fontsPath: "/fonts",
  fontsPattern: "/**/*.{woff,woff2}",
  imgPattern: "/**/*.{jpg,jpeg,png,gif}",
  scssPattern: "/**/*.{scss,sass}",
  svgPattern: "/*.svg",
  _scssPattern: "/**/_*.{scss,sass}",
  _lastAttrPattern: "/" + name.lastAttrFile,
  _configFilePattern: "/" + name.configFile,
  scssFilePattern: "/" + name.scssFile,
  _spriteFilePattern: "/" + name.spriteFile,
  pugPattern: "/**/!(_)*.pug",
  htmlPattern: "/**/!(_)*.html",
  jsPattern: "/**/!(_)*.js",
  levels: ["blocks"]
};

/* Packages */

var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var csscomb = require("gulp-csscomb");
var pug = require("gulp-pug");
var sourcemaps = require("gulp-sourcemaps");
var htmlbeautify = require("gulp-html-beautify");
var gulpBemCss = require("gulp-bem-css");
var concat = require("gulp-concat");
var merge = require("gulp-merge");
var cheerio = require("gulp-cheerio");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var uglify = require("gulp-uglify");
var svgSprite = require("gulp-svg-sprites");
var svgmin = require("gulp-svgmin");
var svgo = require("gulp-svgo");
var imagemin = require("gulp-imagemin");
var size = require("gulp-size");
var util = require("gulp-util");
var jsbeautify = require("js-beautify");
var mergeStream = require("merge-stream");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var imageminMozjpeg = require("imagemin-mozjpeg");
var imageminPngquant = require("imagemin-pngquant");
var imageminWebp = require("imagemin-webp");
var webp = require("gulp-webp");
var clean = require("del");
var glob = require("gulp-sass-glob");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

/* Tasks */

// Server
gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: path.buildPath
    },
    notify: false,
    uf: false
  });

  browserSync.watch(path.buildPath).on("change", reload);
});

// HTML
gulp.task("html", () => {
  return gulp.src(path.sourcePath + path.htmlPattern, { since: gulp.lastRun("html") })
    .pipe(plumber())
    .pipe(gulp.dest(path.buildPath))
    .pipe(browserSync.stream());
});

// SCSS to CSS
gulp.task("sass-styles", () => {
  return gulp.src(path.sourcePath + path.scssPath + '/' + name.scssFile)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(path.buildPath + path.cssPath))
    .pipe(postcss([cssnano({ minifyFontWeight: false })]))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.buildPath + path.cssPath))
    .pipe(browserSync.stream());
});

// gulp.task("sass-glob", () => {
//   return gulp.src(path.sourcePath + path.scssPath + path.utilityPath + path._configFilePattern, { since: gulp.lastRun("sass-glob")})
//     .pipe(clean(path.sourcePath + path.scssPath + path.scssFilePattern))
//     .pipe(glob())
//     .pipe(gulp.dest(path.sourcePath + path.scssPath + path.scssFilePattern))
//     .pipe(reload({ stream: true }));
// });

gulp.task("styles", gulp.series("sass-styles"));

// JavaScript
gulp.task("js", () => {
  return gulp.src(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, {
    base: process.cwd()
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat(name.jsFile))
    .pipe(gulp.dest(path.buildPath + path.jsPath))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.buildPath + path.jsPath))
    .pipe(reload({ stream: true }));
});

// JavaScript libs
gulp.task("libs-js", () => {
  return gulp.src(path.sourcePath + path.libsPath + path.jsPattern, { since: gulp.lastRun("libs-js") })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.buildPath + path.jsPath + path.libsPath))
});

// Compress images
gulp.task("compress", () => {
  return gulp.src(path.sourcePath + path.imgPath + path.imgPattern, { since: gulp.lastRun("compress") })
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imageminMozjpeg({
        quality: 98
      }),
      imagemin.optipng({
        optimizationLevel: 3
      })
    ]))
    .pipe(gulp.dest(path.buildPath + path.imgPath))
    .pipe(imagemin([
      imageminWebp({
          quality: 98
        })
    ]))
    .pipe(rename({
      extname: ".webp"
    }))
    .pipe(gulp.dest(path.buildPath + path.imgPath));
});

// SVG sprite
gulp.task("sprite", () => {
  return gulp.src(path.sourcePath + path.imgPath + path.svgPath + "/to-sprite" + path.svgPattern)
    .pipe(svgSprite({
      mode: "symbols",
      svgPath: path.sourcePath + path.imgPath + path.svgPath + path.spritePath,
      svg: {
        symbols: "sprite.svg"
      },
      preview: false
    }))
    .pipe(cheerio({
      run: function ($) {
        var elements = [

        ];
        var excludeElements = {
          g: elements.map((e) => { return e + " g"}),
          path: elements.map((e) => { return e + " path"}),
          stroke: elements.map((e) => { return e + " [stroke]"}),
          style: elements.map((e) => { return e + " [style]"})
        };
        $("symbol g").not(excludeElements.g.toString()).attr("fill", "currentColor");
        $("symbol path").not(excludeElements.path.toString()).attr("fill", "currentColor");
        $("symbol [stroke]").not(excludeElements.stroke.toString()).attr("stroke", "currentColor");
        $("symbol [style]").not(excludeElements.style.toString()).attr("style", "fill: currentColor");
        $("title").remove();
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(gulp.dest(path.buildPath + path.imgPath + path.svgPath));
});

// Sort SCSS files
gulp.task("sort-sass", () => {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(csscomb("csscomb.json"))
    .pipe(gulp.dest(path.sourcePath + path.scssPath))
});

// Sort HTML files
gulp.task("sort-html", () => {
  gulp.src(path.sourcePath + path.htmlPattern)
    .pipe(htmlbeautify())
    .pipe(gulp.dest(path.buildPath))
});

// PUG
gulp.task("pug", () => {
  return gulp.src(path.sourcePath + path.pugPattern, { since: gulp.lastRun("pug") })
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.buildPath))
    .pipe(reload({ stream: true }));
});

// BEM to CSS
gulp.task("bem-css", () => {
  gulp.src(path.sourcePath + path.htmlPattern)
    .pipe(gulpBemCss({
      folder: path.sourcePath + path.scssPath + path.blocksPath,
      extension: "scss",
      elementSeparator: "__",
      modifierSeparator: "--"
    }))
    .pipe(gulp.dest(path.sourcePath))
});

// Copy the rest to build path
gulp.task("copy", () => {
  return gulp.src([
    path.sourcePath + path.imgPath + path.svgPath + path.svgPattern,
    path.sourcePath + path.fontsPath + path.fontsPattern
  ], {
    base: path.sourcePath,
    since: gulp.lastRun("copy")
  })
    .pipe(gulp.dest(path.buildPath));
});

// Sort both SCSS and HTML files
gulp.task("beautify", gulp.series("sort-sass", "sort-html"));

// Clean build
gulp.task("build:clean", () => {
  return clean(path.buildPath);
});

// Build
gulp.task("build", gulp.series("copy", "sprite", "compress", "html", "styles", "libs-js", "js"));

// Watch changes
gulp.task("watch", () => {
  gulp.watch(path.sourcePath + path.scssPath + path.scssPattern, gulp.series("styles")).on('change', reload);
  gulp.watch(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, gulp.series("js")).on('change', reload);
  gulp.watch(path.sourcePath + path.htmlPattern, gulp.series("html")).on('change', reload);
});

// Build and watch
gulp.task("build:watch", gulp.series("build", gulp.parallel("browser-sync", "watch")));
