import mod = require('SeedModules.Admin/modules/admin/module');
import angular = require('angular');

class SidebarNavController {
  static $inject = ['$scope', '$element', '$timeout'];
  constructor(private $scope, private $element, private $timeout) {
    $element = $($element);
    $scope.isLeaf = item => {
      return !item.children || item.children.length <= 0;
    };

    $scope.warpClick = (item, $event: Event) => {
      if (!$scope.isLeaf(item)) {
        var sidebar = $element.parent('.sidebar');
        var node = $($event.currentTarget);
        var navItemShow = sidebar.find('.sidebar-item.sidebar-show');
        var navItem = sidebar.find('.sidebar-item');
        if (!sidebar.hasClass('sidebar-mini')) {
          if (node.next().css('display') == 'none') {
            // 展开未展开
            navItem.children('ul').slideUp(300);
            node.next('ul').slideDown(300);
            node
              .parent('li')
              .addClass('sidebar-show')
              .siblings('li')
              .removeClass('sidebar-show');
          } else {
            // 收缩已展开
            node.next('ul').slideUp(300);
            navItemShow.removeClass('sidebar-show');
          }
        }
      } else {
        (item.itemClicked ? item.itemClicked : angular.noop)({
          $item: item,
          $event: $event
        });
      }
    };
  }
}

function directive(): ng.IDirective {
  return {
    restrict: 'AE',
    replace: true,
    template:
      '<ul><li class="sidebar-item" ng-repeat="item in navData" ng-include="\'/SeedModules.Admin/modules/admin/templates/navItem.html\'"></li></ul>',
    scope: {
      navData: '='
    },
    controller: SidebarNavController
  };
}

mod.directive('sidebarNav', directive);
