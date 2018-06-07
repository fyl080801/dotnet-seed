import angular = require('angular');
import 'app/application';
import 'SeedModules.PageBuilder/modules/configs/run';
import 'SeedModules.PageBuilder/modules/configs/defaultTools';
import 'SeedModules.PageBuilder/modules/providers/toolsBuilder';

export = angular.module('modules.pagebuilder', ['modules.pagebuilder.boot']);
