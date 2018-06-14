define(['SeedModules.Admin/modules/admin/module'], function (module) {
    'use strict';
    module.directive('sidebarNav', [
        '$timeout',
        function ($timeout) {
            function link(scope, element, attrs, controller) {
                element = $(element);
                scope.isLeaf = function (item) {
                    return !item.children || item.children.length <= 0;
                };
                scope.warpClick = function (item, $event) {
                    if (!scope.isLeaf(item)) {
                        var sidebar = element.parent('.sidebar');
                        var node = $($event.currentTarget);
                        var navItemShow = sidebar.find('.sidebar-item.sidebar-show');
                        var navItem = sidebar.find('.sidebar-item');
                        if (!sidebar.hasClass('sidebar-mini')) {
                            if (node.next().css('display') == 'none') {
                                navItem.children('ul').slideUp(300);
                                node.next('ul').slideDown(300);
                                node
                                    .parent('li')
                                    .addClass('sidebar-show')
                                    .siblings('li')
                                    .removeClass('sidebar-show');
                            }
                            else {
                                node.next('ul').slideUp(300);
                                navItemShow.removeClass('sidebar-show');
                            }
                        }
                    }
                    else {
                        (item.itemClicked ? item.itemClicked : angular.noop)({
                            $item: item,
                            $event: $event
                        });
                    }
                };
            }
            return {
                restrict: 'AE',
                replace: true,
                template: '<ul><li class="sidebar-item" ng-repeat="item in navData" ng-include="\'/SeedModules.Admin/modules/admin/templates/navItem.html\'"></li></ul>',
                scope: {
                    navData: '='
                },
                link: link
            };
        }
    ]);
});
//# sourceMappingURL=sidebarNav.js.map