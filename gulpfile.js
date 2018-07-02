const browserify = require("browserify");
const gulp = require("gulp");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const concat = require("gulp-concat");

const names = require("./build-settings/build-settings");

const buildPath = "./s3-build";
const getPath = function (name) {
    return `${buildPath}/${name}`;
};

// Build the server side rendering of the page. This is then used to generate
// the index.html file and then removed

gulp.task("static-build", function () {

    return browserify("./build-settings/build.js")
        .transform("babelify", { presets: ["es2015", "react"] })
        .bundle()
        .pipe(source("static-index-build.js"))
        .pipe(buffer())
        .pipe(gulp.dest(buildPath));

});

// Build the client side app. This gets included in a <script></script> tag at the bottom of index.html

gulp.task("static-client-bundle", function () {
    return browserify("./client/app/index.js")
        .transform("babelify", { presets: ["es2015", "react"] })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(buildPath));
});

// Copy static assets to the build folder

gulp.task("static-assets", function () {
    return gulp.src("./client/assets/**/*")
        .pipe(gulp.dest(getPath("assets")));
});

// Copy static api files to build folder

gulp.task("static-api", function () {
    return gulp.src("./static-api/**/*")
        .pipe(gulp.dest(getPath("static-api")));
});

// Concat all the css files into one ready to be uncss'd and inlined

gulp.task("static-css", function () {
    return gulp.src("./client/css/**/*.css")
        .pipe(concat(names.cssFilename))
        .pipe(gulp.dest(getPath("css")));
});

// Copy the css assets required / expected by Leaflet

gulp.task("static-css-image-copy", function () {
    return gulp.src("./client/css/images/*")
        .pipe(gulp.dest(getPath("css/images")));
});

// The tasks that create the client bundle

gulp.task("static", gulp.series(gulp.parallel(
    "static-assets",
    "static-client-bundle",
    "static-css",
    "static-css-image-copy",
    "static-api"
)));
