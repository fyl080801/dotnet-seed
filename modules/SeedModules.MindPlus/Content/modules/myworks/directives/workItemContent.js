define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.directive('workItemContent', [
    'SeedModules.AngularUI/modules/services/requestService',
    function(requestService) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl:
          '/SeedModules.MindPlus/modules/myworks/templates/workItemContent.html',
        scope: {
          workItem: '=workItemContent'
        },
        link: function(scope, element, attrs, ctl) {
          element = $(element);

          var newArea = element.find('.dir-workitem-new'),
            contentArea = element.find('.dir-workitem-content');

          scope.$on('spyscrolled', function(evt) {});
        }
      };
    }
  ]);
});
