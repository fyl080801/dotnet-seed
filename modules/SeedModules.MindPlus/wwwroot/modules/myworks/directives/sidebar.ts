define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.directive('sidebar', [
    function() {
      return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div class="sidebar" ng-transclude></div>',
        link: function(scope, element, attrs, controller) {
          element = $(element);
          scope.$on('toggleSidebar', function(e, m) {
            var navItemShow = element.find('.sidebar-item.sidebar-show');
            var navItem = element.find('.sidebar-item');
            var navContent = $('.sidebar-content');
            if (!element.hasClass('sidebar-mini')) {
              navItemShow.removeClass('sidebar-show');
              navItem.children('ul').removeAttr('style');
              element.addClass('sidebar-mini');
              navContent.addClass('sidebar-min');
            } else {
              element.removeClass('sidebar-mini');
              navContent.removeClass('sidebar-min');
            }
          });
        }
      };
    }
  ]);
});
