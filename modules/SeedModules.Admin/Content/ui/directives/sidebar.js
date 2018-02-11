define([
    'SeedModules.Admin/ui/module'
], function (module) {
    'use strict';

    module.directive('sidebar', [
        function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'SeedModules.Admin/ui/directives/sidebar.html',
                scope: {
                    sidebar: '='
                },
                link: function (scope, element, attrs, controller) {
                    element.find('.sidebar-item>a').on('click', function () {
                        var node = $(this);
                        var navItemShow = element.find('.sidebar-item.sidebar-show');
                        var navItem = element.find('.sidebar-item');
                        if (!element.hasClass('sidebar-mini')) {
                            if (node.next().css('display') == 'none') {
                                //展开未展开
                                navItem.children('ul').slideUp(300);
                                node.next('ul').slideDown(300);
                                node.parent('li').addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
                            } else {
                                //收缩已展开
                                node.next('ul').slideUp(300);
                                navItemShow.removeClass('sidebar-show');
                            }
                        }
                    });

                    scope.toggle = function () {
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
                }
            };
        }
    ]);
});