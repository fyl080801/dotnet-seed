import angular = require('angular');
import 'app/application';
import 'SeedModules.PageBuilder/modules/configs/run';

export = angular.module('modules.pagebuilder', ['modules.pagebuilder.boot']);
