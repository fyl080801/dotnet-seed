var gulp = require('gulp'),
  pump = require('pump'),
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
  rev = require('gulp-rev'),
  revCollector = require('sog-gulp-rev-collector'),
  fs = require('fs'),
  less = require('gulp-less'),
  typescript = require('gulp-typescript'),
  tsc = require('gulp-tsc');

var options = minimist(process.argv.slice(2), {
  string: 'src',
  default: {
    src: process.env.NODE_ENV || path.join(process.cwd(), 'src/Seed/modules')
  }
});

var getFolders = function(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};

var getFiles = function(dir, ext) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isFile() && file.endsWith(ext);
  });
};

var getAllFiles = function(dir, ext) {
  var files = [];
  if (!fs.statSync(dir).isFile()) {
    getFiles(dir, ext).map(function(file) {
      files.push(path.join(dir, file));
    });
    getFolders(dir).map(function(folder) {
      getAllFiles(path.join(dir, folder), ext).map(function(file) {
        files.push(file);
      });
    });
  }
  return files;
};

// 从模块定义文件中生成 amd-option
var resolveConfigs = function(modulePaths, moduleOptions, ext) {
  getAllFiles(moduleOptions.baseUrl, ext).map(function(fullname) {
    var option = JSON.parse(fs.readFileSync(fullname));
    var uipath = fullname
      .replace(/\\options.json/g, '')
      .replace(/\/options.json/g, '')
      .replace(/\\options.dist.json/g, '')
      .replace(/\/options.dist.json/g, '');

    modulePaths.push(uipath);

    for (var name in option.configs) {
      // 模块前缀，用于判断是否是一个模块引用
      var moduleprefix = uipath
        .replace(moduleOptions.baseUrl, '')
        .replace(path.join('Content/', ''), '')
        .replace(/\\/g, '/');

      var moduleName = moduleprefix.substring(0, moduleprefix.indexOf('/'));

      if (
        name !== moduleprefix + '/requires' &&
        name !== moduleprefix + '/module'
      ) {
        moduleOptions.paths[name] = '../../../modules/build';
        moduleOptions.exclude.push(name);
      }

      // 如果是已包含的模块需要映射路径 /Content
      if (
        (option.include && option.include.indexOf(name) >= 0) ||
        (!option.configs[name].path || option.configs[name].path.length <= 0)
      ) {
        if (option.configs[name].path && option.configs[name].path.length > 0)
          moduleOptions.paths[name] = option.configs[name].path.replace(
            moduleName,
            moduleName + '/Content'
          );
        moduleOptions.include.push(name);
      }
    }
  });
};

//
gulp.task('lessc', function() {
  gulp
    .src('modules/**/module.less') //*表示所有的scss文件
    .pipe(less())
    .pipe(gulp.dest('modules'));
});

//
gulp.task('tsc', function() {
  var tsProject = typescript.createProject('tsconfig.json');
  tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('modules'));
});

//
gulp.task('watch', function() {
  gulp.watch('modules/**/*.less', ['lessc']);
  //gulp.watch('modules/**/*.ts', ['tsc']);
});

//
gulp.task('build', function() {
  var modulePaths = [];
  var requiresOptions,
    moduleOptions = {
      baseUrl: path.join(options.src, '/'),
      removeCombined: true,
      fileExclusionRegExp: /^\./,
      paths: {},
      exclude: [],
      include: []
    };

  // 获取所有UI定义
  resolveConfigs(modulePaths, moduleOptions, 'options.json');
  resolveConfigs(modulePaths, moduleOptions, 'options.dist.json');

  // 直接把模块目录下所有的js路径都映射了
  getAllFiles(moduleOptions.baseUrl, '.js').map(function(fullname) {
    moduleOptions.paths[
      fullname
        .replace(moduleOptions.baseUrl, '')
        .replace(path.join('Content/', ''), '')
        .replace('.js', '')
        .replace(/\\/g, '/')
    ] = fullname.replace(moduleOptions.baseUrl, '').replace('.js', '');
  });

  // 去掉排除模块和包含模块的差集部分（包含的模块不要排除）
  for (var i = moduleOptions.exclude.length - 1; i >= 0; i--) {
    if (moduleOptions.include.indexOf(moduleOptions.exclude[i]) >= 0) {
      moduleOptions.exclude.splice(i, 1);
    }
  }
  moduleOptions.include = [];

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
    var sortpath = folder.replace(moduleOptions.baseUrl, '');
    var modulename = sortpath.substring(
      0,
      sortpath.indexOf(path.join('Content/', ''))
    );
    var distname = sortpath
      .replace(path.join(modulename, 'Content/', ''), '')
      .replace(/\//g, '.')
      .replace(/\\/g, '.');
    var targetPath = path.join(
      folder.substring(0, folder.lastIndexOf(path.join('/modules', ''))),
      'js'
    );
    var requireName = path.join(sortpath, 'requires').replace(/\\/g, '/');
    var moduleName = path.join(sortpath, 'module').replace(/\\/g, '/');

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
