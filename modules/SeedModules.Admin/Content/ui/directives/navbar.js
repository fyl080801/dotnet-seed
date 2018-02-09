define([
    'SeedModules.Admin/ui/module'
], function (module) {
    'use strict';

    module.directive('navbar', [
        function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'SeedModules.Admin/ui/directives/navbar.html',
                scope: {
                    navbar: '='
                },
                link: function (scope, element, attrs, controller) {
                    element.find('.admin-nav-item>a').on('click', function () {
                        var node = $(this);
                        var navItemShow = element.find('.admin-nav-item.admin-nav-show');
                        var navItem = element.find('.admin-nav-item');
                        if (!element.hasClass('admin-nav-mini')) {
                            if (node.next().css('display') == 'none') {
                                //展开未展开
                                navItem.children('ul').slideUp(300);
                                node.next('ul').slideDown(300);
                                node.parent('li').addClass('admin-nav-show').siblings('li').removeClass('admin-nav-show');
                            } else {
                                //收缩已展开
                                node.next('ul').slideUp(300);
                                navItemShow.removeClass('admin-nav-show');
                            }
                        }
                    });

                    scope.toggle = function () {
                        var navItemShow = element.find('.admin-nav-item.admin-nav-show');
                        var navItem = element.find('.admin-nav-item');
                        var navContent = $('.admin-nav-content');
                        if (!element.hasClass('admin-nav-mini')) {
                            navItemShow.removeClass('admin-nav-show');
                            navItem.children('ul').removeAttr('style');
                            element.addClass('admin-nav-mini');
                            navContent.addClass('admin-nav-min');
                        } else {
                            element.removeClass('admin-nav-mini');
                            navContent.removeClass('admin-nav-min');
                        }
                    }
                }
            };
        }
    ]);
});