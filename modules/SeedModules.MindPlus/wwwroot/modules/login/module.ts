import angular = require('angular');
import 'app/application';

class Config {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor($stateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $stateProvider.state('mindlogin', {
      url: '/',
      title: '登录',
      templateUrl: '/SeedModules.MindPlus/modules/login/views/login.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.MindPlus/modules/login/requires'
      ]
    });

    $urlRouterProvider.otherwise('/');
  }
}

export = angular.module('modules.mindPlus.login', ['ui.router']).config(Config);
