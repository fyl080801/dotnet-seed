import angular = require('angular');
import 'app/application';
import 'SeedModules.PageBuilder/modules/providers/toolsBuilder';
import 'SeedModules.PageBuilder/modules/configs/builderDefaults';
import 'SeedModules.PageBuilder/modules/configs/run';

export = angular.module('modules.pagebuilder', ['modules.pagebuilder.boot']);
