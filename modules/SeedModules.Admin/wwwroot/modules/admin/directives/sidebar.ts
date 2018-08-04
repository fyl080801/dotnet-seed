import mod = require('SeedModules.Admin/modules/admin/module');

class SidebarController {
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element) {
    $element = $($element);
    $scope.toggle = function() {
      var navItemShow = $element.find('.sidebar-item.sidebar-show');
      var navItem = $element.find('.sidebar-item');
      var navContent = $('.sidebar-content');
      if (!$element.hasClass('sidebar-mini')) {
        navItemShow.removeClass('sidebar-show');
        navItem.children('ul').removeAttr('style');
        $element.addClass('sidebar-mini');
        navContent.addClass('sidebar-mini');
      } else {
        $element.removeClass('sidebar-mini');
        navContent.removeClass('sidebar-mini');
      }
    };

    $scope.sidebar = $.extend($scope.sidebar, {
      toggle: $scope.toggle
    });
  }
}

function directive(): ng.IDirective {
  return {
    restrict: 'AE',
    replace: true,
    template:
      '<div class="sidebar"><div class="sidebar-top"><a href="" ng-click="toggle()"><i class="fas fa-bars fa-fw"></i></a></div><ul sidebar-nav nav-data="navData"></ul></div>',
    scope: {
      sidebar: '=',
      navData: '='
    },
    controller: SidebarController
  };
}

mod.directive('sidebar', directive);
