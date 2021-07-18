const { series, src, dest, watch } = require('gulp');

const htmlClean = require("gulp-htmlclean");
const less = require("gulp-less");
const cssClean = require("gulp-clean-css");
const stripDebug = require("gulp-strip-debug");
const uglify = require("gulp-uglify")
const imgMin = require("gulp-imagemin")
const connect = require("gulp-connect")

const folder = {
        src: "./src",
        dist: "./dest"
    }
    //The task of handing HTML
function html() {
    return src(folder.src + "/*.html")
        .pipe(htmlClean())
        .pipe(dest(folder.dist + "/"))
        .pipe(connect.reload())
}

//The task of handing css
function css() {
    return src(folder.src + "/css/*.less")
        .pipe(less())
        .pipe(cssClean())
        .pipe(dest(folder.dist + "/css/"))
        .pipe(connect.reload())
}

//处理js文件的任务
function js() {
    return src(folder.src + "/js/*.js")
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(dest(folder.dist + "/js/"))
        .pipe(connect.reload())
}

//处理图片压缩的任务
function image() {
    return src(folder.src + "/source/*.jpg")
        .pipe(imgMin())
        .pipe(dest(folder.dist + "/source/"))
}

// 服务器
function server() {
    return connect.server({
        port: 8080,
        livereload: true, //自动刷新
    })
}
watch(folder.src + "/*.html", function(cb) {
    html();
    cb();
})
watch(folder.src + "/css/*.less", function(cb) {
    css();
    cb();
})
watch(folder.src + "/js/*.js", function(cb) {
    js();
    cb();
})

exports.default = series(html, css, js, image, server)