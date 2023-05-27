/**
 * @author Raju Bepary <raju174829@gmail.com>
 * @package gulp-complier
 * @version 1.0.0
 * @license MIT
 */

/**
 * Load  src, dest, watch, series, parallel From Gulp
 */
const { src, dest, watch, series, parallel } = require("gulp");

/**
 * Load CSS plugins
 */
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

/**
 * Load JS plugins
 */
var uglify = require("gulp-uglify");
var babelify = require("babelify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var stripDebug = require("gulp-strip-debug");

/**
 * Load Image Plugins
 */
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
/**
 * Load Utility plugins
 */
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var options = require("gulp-options");
var gulpif = require("gulp-if");

/**
 * Load Browers plugins
 */
var browserSync = require("browser-sync").create();

/**
 * @this paths    This is project assets variable obeject.
 * Change source, destation folder name and default file name.
 */
const paths = {
  server: {
    baseFolder: "./",
  },
  style: {
    srcFile: "src/scss/style.scss",
    watch: "src/scss/**/*.scss",
    destation: "./assets/css/",
    mapUrl: "./",
  },
  js: {
    srcFile: "script.js",
    file: "script",
    folder: "src/js/",
    watch: "src/js/**/*.js",
    destation: "./assets/js/",
    mapUrl: "./",
  },
  images: {
    srcFile: "src/images/**/*",
    watch: "src/images/**/*.*",
    destation: "./assets/images/",
  },
};

/**
 * @function browser_sync() Init the browserSync option
 * @exports browser_sync    Run gulp browser_sync command in terminal to run this task.
 */
const browser_sync = () => {
  browserSync.init({
    server: {
      baseDir: paths.server.baseFolder,
    },
  });
};
exports.browser_sync = browser_sync;

/**
 * @function reload() Init the browserSync reload option
 * @exports reload    Run gulp reload command in terminal to run this task.
 */
const reload = (done) => {
  browserSync.reload();
  done();
};
exports.reload = reload;

/**
 * @function css() Compile sass file to minified css
 * @exports css    Run gulp css command in terminal to run this task.
 */
const css = (done) => {
  src(paths.style.srcFile)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed",
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions", "> 5%", "Firefox ESR"],
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write(paths.style.mapUrl))
    .pipe(dest(paths.style.destation))
    .pipe(browserSync.stream());
  done();
};
exports.css = css;

/**
 * @this jsFiles  This is an array of all javascript files.
 * @array jsFiles Array item get from @this paths project assets variable obeject
 */
const jsFiles = [paths.js.srcFile];

/**
 * @function js() Compile ES6 javaScript file to minified venella JavaScript.
 * @remember      @this js() Compile also jQuery file.
 * @exports js    Run gulp js command in terminal to run this task.
 */
const js = (done) => {
  jsFiles.map((entry) => {
    return browserify({
      entries: [paths.js.folder + entry],
    })
      .transform(babelify, { presets: ["@babel/preset-env"] })
      .bundle()
      .pipe(source(entry))
      .pipe(
        rename({
          extname: ".min.js",
        })
      )
      .pipe(buffer())
      .pipe(gulpif(options.has("production"), stripDebug()))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write(paths.js.mapUrl))
      .pipe(dest(paths.js.destation))
      .pipe(browserSync.stream());
  });
  done();
};
exports.js = js;

/**
 * @function images() Compile image[jpg,png] file to webp images
 * @exports images    Run gulp images command in terminal to run this task.
 */
const images = (done) => {
  src(paths.images.srcFile)
    .pipe(plumber())
    .pipe(imagemin({ quality: 75, progressive: true }))
    .pipe(webp())
    .pipe(dest(paths.images.destation));
  done();
};
exports.images = images;

/**
 * @function gulp_default() Run all task in paraller way.
 * @exports default         Run gulp command in terminal to run this task.
 */
const gulp_default = parallel(this.css, this.js, this.images);
exports.default = gulp_default;

/**
 * @function watch_files() Check change all file and folder run all task with reload.
 * @exports watch_files    Run gulp watch_files command in terminal to run this task.
 */
const watch_files = () => {
  watch(paths.style.watch, series(this.css, this.reload));
  watch(paths.js.watch, series(this.js, this.reload));
  watch(paths.images.watch, series(this.images, this.reload));
  src(paths.js.destation + paths.js.file + ".min.js").pipe(
    notify({ message: "Gulp is Watching, Happy Coding!" })
  );
};
exports.watch_files = watch_files;

/**
 * @function gulp_watch() Check change all file and folder run all task with browserSync.
 * @exports watch    Run gulp watch command in terminal to run this task.
 */
const gulp_watch = parallel(this.browser_sync, this.watch_files);
exports.watch = gulp_watch;
