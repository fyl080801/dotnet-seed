var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    replace = require('gulp-replace'),
    path = require('path'),
    minimist = require('minimist'),
    amdOptimize = require('amd-optimize'),
    fs = require('fs');

var options = minimist(process.argv.slice(2), {
    string: 'src',
    default: {
        src: process.env.NODE_ENV || 'D:\\Source\\GitHub\\dotnet-seed\\src\\Seed\\modules'
    }
});

gulp.task('build', function () {
    var modulePaths = [];
    var requiresOptions,
        moduleOptions = {
            baseUrl: options.src,
            paths: {},
            exclude: []
        };

    getFolders(options.src).map(function (folder) {
        getFiles(path.join(options.src, folder), '.ui.json').map(function (file) {
            var uidef = JSON.parse(fs.readFileSync(path.join(options.src, folder, file)));
            var uipath = path.join(options.src, folder, (uidef.path ? uidef.path : 'Content/ui'));

            modulePaths.push(uipath);

            for (var name in uidef.references) {
                if (!uidef.references[name].isDist) {
                    moduleOptions.paths[name] = 'SeedModules.AngularUI/Content/main';
                    moduleOptions.exclude.push(name);
                }
            }

            getAllFiles(uipath, '.js').map(function (fullname) {
                moduleOptions.paths[fullname.replace(/\\/g, '/').replace(options.src + '/', '').replace(/\\/g, '/').replace('Content/', '').replace('.js', '')] = fullname.replace(options.src, '').replace(/\\/g, '/').replace('.js', '');
            });
        });
    });

    requiresOptions = JSON.parse(JSON.stringify(moduleOptions));

    modulePaths.map(function (folder) {
        requiresOptions.exclude.push(folder.replace(/\\/g, '/').replace(options.src + '/', '').replace(/\\/g, '/').replace('Content/', '') + '/module');
    });

    modulePaths.map(function (folder) {
        var distname = folder.replace(options.src + '/', '').replace(/\//g, '.');
        var targetPath = path.join(folder.substring(0, folder.lastIndexOf('/ui')), 'js');
        var requireName = path.join(folder.replace(options.src + '/', ''), 'requires');
        var moduleName = path.join(folder.replace(options.src + '/', ''), 'module');

        gulp.src(path.join(folder, '**/*.js'))
            .pipe(amdOptimize(requireName, requiresOptions))
            .pipe(replace(requireName.replace(/\\/g, '/'), requireName.replace(/\\/g, '/').replace('/Content/', '/')))
            .pipe(concat(distname + '.requires.js'))
            .pipe(gulp.dest(targetPath))
            .pipe(concat(distname + '.requires.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(targetPath));

        gulp.src(path.join(folder, '**/*.js'))
            .pipe(amdOptimize(moduleName, moduleOptions))
            .pipe(replace(moduleName.replace(/\\/g, '/'), moduleName.replace(/\\/g, '/').replace('/Content/', '/')))
            .pipe(concat(distname + '.module.js'))
            .pipe(gulp.dest(targetPath))
            .pipe(concat(distname + '.module.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(targetPath));
    });
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

function getAllFiles(dir, ext) {
    var files = [];
    getFiles(dir, ext).map(function (file) {
        files.push(path.join(dir, file));
    });
    getFolders(dir).map(function (folder) {
        getAllFiles(path.join(dir, folder), ext).map(function (file) {
            files.push(file);
        });
    });
    return files;
}