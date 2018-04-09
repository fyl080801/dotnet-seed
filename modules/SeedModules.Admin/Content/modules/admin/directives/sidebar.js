define(['SeedModules.Admin/modules/admin/module'], function(module) {
  'use strict';

  module.directive('sidebar', [
    function() {
      return {
        restrict: 'AE',
        replace: true,
        template:
          '<div class="sidebar"><div class="sidebar-top"><a href="{{homeHref}}"><i class="fas fa-home fa-fw"></i> <span>{{homeTitle}}</span></a></div><ul sidebar-nav nav-data="navData"></ul></div>',
        scope: {
          sidebar: '=',
          navData: '=',
          homeHref: '@',
          homeTitle: '@'
        },
        link: function(scope, element, attrs, controller) {
          scope.toggle = function() {
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
          };

          scope.sidebar = $.extend(scope.sidebar, {
            toggle: scope.toggle
          });
        }
      };
    }
  ]);
});
