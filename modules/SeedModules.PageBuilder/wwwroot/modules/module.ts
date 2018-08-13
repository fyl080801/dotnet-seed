import angular = require('angular');
import 'SeedModules.PageBuilder/modules/providers/toolsBuilder';
import 'SeedModules.PageBuilder/modules/providers/actionSource';
import 'SeedModules.PageBuilder/modules/configs/run';

export = angular.module('modules.pagebuilder', ['modules.pagebuilder.boot']);
