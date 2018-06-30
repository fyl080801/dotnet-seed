define(['SeedModules.AngularUI/modules/module'], function (module) {
    'use strict';
    module.directive('scrollspy', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr, ctrl) {
                    element = $(element);
                    var content = element.children();
                    var elmHeight = element.height();
                    element.scroll(function () {
                        var scrollTop = element.scrollTop();
                        var offset = content.offset().top + content.height() - (scrollTop + elmHeight);
                        if (offset < parseInt(attr.offset)) {
                            scope.$broadcast('spyscrolled');
                        }
                    });
                }
            };
        }
    ]);
});
