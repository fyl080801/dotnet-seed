var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    path = require('path'),
    minimist = require('minimist'),
    amdOptimize = require('amd-optimize'),
    fs = require('fs');

var options = minimist(process.argv.slice(2), {
    string: 'src',
    default: {
        src: process.env.NODE_ENV || ''
    }
});

gulp.task('build', function () {

    getFolders(options.src).map(function (folder) {
        getFiles(path.join(options.src, folder), '.ui.json').map(function (file) {
            var uidef = JSON.parse(fs.readFileSync(path.join(options.src, folder, file)));
            var uipath = path.join(options.src, folder, uidef.path);
        });
    });

    // var uiContent = path.join(options.src, 'Content', 'ui');
    // if (fs.existsSync(uiContent)) {

    //     // gulp.src(path.join(uiContent, '**/*.js'))
    //     //     .pipe(amdOptimize('', {}));
    //     // getFolders(uiContent)
    //     //     .map(function (folder) {
    //     //         console.log(folder);
    //     //     });
    // }
});

function getFolders(dir) {
    return fs
        .readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function getFiles(dir, ext) {
    return fs
        .readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isFile() && file.endsWith(ext);
        });
}