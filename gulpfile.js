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
    var uiContent = path.join(options.src, 'Content', 'ui');
    if (fs.existsSync(uiContent)) {

        gulp.src(path.join(uiContent, '**/*.js'))
            .pipe(amdOptimize('', {}));
        // getFolders(uiContent)
        //     .map(function (folder) {
        //         console.log(folder);
        //     });
    }
});

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            var fullPath = path.join(dir, file);
            return fs.statSync(fullPath).isDirectory() && file === 'ui';
        });
}