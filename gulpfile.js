var gulp = require('gulp'),
  rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  ngmin = require('gulp-ngmin'),
  replace = require('gulp-replace'),
  path = require('path'),
  process = require('process'),
  minimist = require('minimist'),
  amdOptimize = require('amd-optimize'),
  fs = require('fs');

var options = minimist(process.argv.slice(2), {
  string: 'src',
  default: {
    src: process.env.NODE_ENV || path.join(process.cwd(), 'src/Seed/modules')
  }
});

gulp.task('build', function() {
  var modulePaths = [];
  var requiresOptions,
    moduleOptions = {
      baseUrl: path.join(options.src, '/'),
      paths: {},
      exclude: []
    };

  getFolders(moduleOptions.baseUrl).map(function(folder) {
    getFiles(path.join(moduleOptions.baseUrl, folder), '.modules.json').map(function(
      file
    ) {
      var uidef = JSON.parse(
        fs.readFileSync(path.join(moduleOptions.baseUrl, folder, file))
      );
      var uipath = path.join(
        moduleOptions.baseUrl,
        folder,
        uidef.path ? uidef.path : 'Content/modules'
      );

      modulePaths.push(uipath);

      for (var name in uidef.references) {
        if (!uidef.references[name].isDist) {
          moduleOptions.paths[name] = 'SeedModules.AngularUI/Content/main';
          moduleOptions.exclude.push(name);
        }
      }

      getAllFiles(uipath, '.js').map(function(fullname) {
        moduleOptions.paths[
          fullname
            .replace(moduleOptions.baseUrl, '')
            .replace(path.join('Content/', ''), '')
            .replace('.js', '')
            .replace(/\\/g, '/')
        ] = fullname.replace(moduleOptions.baseUrl, '').replace('.js', '');
      });
    });
  });

  requiresOptions = JSON.parse(JSON.stringify(moduleOptions));

  modulePaths.map(function(folder) {
    requiresOptions.exclude.push(
      folder
        .replace(moduleOptions.baseUrl, '')
        .replace(path.join('Content/', ''), '')
        .replace(/\\/g, '/') + '/module'
    );
  });

  modulePaths.map(function(folder) {
    var distname = folder
      .replace(moduleOptions.baseUrl, '')
      .replace(/\//g, '.')
      .replace(/\\/g, '.');
    var targetPath = path.join(
      folder.substring(0, folder.lastIndexOf(path.join('/modules', ''))),
      'js'
    );
    var requireName = path
      .join(folder.replace(moduleOptions.baseUrl, ''), 'requires')
      .replace(/\\/g, '/');
    var moduleName = path
      .join(folder.replace(moduleOptions.baseUrl, ''), 'module')
      .replace(/\\/g, '/');

    // requires
    gulp
      .src(path.join(folder, '**/*.js'))
      .pipe(amdOptimize(requireName, requiresOptions))
      .pipe(
        replace(
          requireName.replace(/\\/g, '/'),
          requireName.replace(/\\/g, '/').replace('/Content/', '/')
        )
      )
      .pipe(concat(distname + '.requires.js'))
      .pipe(gulp.dest(targetPath))
      .pipe(concat(distname + '.requires.min.js'))
      .pipe(
        uglify({
          outSourceMap: false
        })
      )
      .pipe(gulp.dest(targetPath));

    // module
    gulp
      .src(path.join(folder, '**/*.js'))
      .pipe(amdOptimize(moduleName, moduleOptions))
      .pipe(
        replace(
          moduleName.replace(/\\/g, '/'),
          moduleName.replace(/\\/g, '/').replace('/Content/', '/')
        )
      )
      .pipe(concat(distname + '.module.js'))
      .pipe(gulp.dest(targetPath))
      .pipe(concat(distname + '.module.min.js'))
      .pipe(
        uglify({
          outSourceMap: false
        })
      )
      .pipe(gulp.dest(targetPath));
  });
});

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

function getFiles(dir, ext) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isFile() && file.endsWith(ext);
  });
}

function getAllFiles(dir, ext) {
  var files = [];
  getFiles(dir, ext).map(function(file) {
    files.push(path.join(dir, file));
  });
  getFolders(dir).map(function(folder) {
    getAllFiles(path.join(dir, folder), ext).map(function(file) {
      files.push(file);
    });
  });
  return files;
}
