const browserify = require("browserify");
const gulp = require("gulp");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const concat = require("gulp-concat");
const uncss = require("gulp-uncss");

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

// Concat all the css files into one ready to be uncss'd and inlined

gulp.task("static-css", function () {
    return gulp.src("./client/css/**/*")
        .pipe(concat(names.cssFilename))
        .pipe(gulp.dest(getPath("css")));
});

// Remove unused CSS classes using the index.html document for reference
// This task should be run separately after the css task has finished

gulp.task("static-optimize-css", function () {
    return gulp.src(getPath("css/byw.style.min.css"))
        .pipe(uncss({
            html: [getPath("index.html")]
        }))
        .pipe(gulp.dest(getPath("css")));
});

// The tasks that create the client bundle

const staticTasks = [
    "static-assets",
    "static-client-bundle",
    "static-css"
];

gulp.task("static", staticTasks);
