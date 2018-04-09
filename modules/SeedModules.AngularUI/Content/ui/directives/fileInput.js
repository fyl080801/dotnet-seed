define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.directive('fileInput', [
    function() {
      return {
        restrict: 'AE',
        replace: true,
        template: '<input name="{{name}}" type="file">',
        scope: {
          fileInput: '=',
          name: '@',
          fileChanged: '&',
          fileClear: '&'
        },
        link: function(scope, element, attr, ctrl) {
          var jqElement = $(element);

          jqElement.on('change', function() {
            scope.fileInput.fileName = jqElement.val();
            scope.$apply();
            (scope.fileChanged || angular.noop)();
          });

          scope.fileInput = $.extend({}, scope.fileInput);

          scope.fileInput.open = function() {
            jqElement.trigger('click');
          };

          scope.fileInput.clear = function() {
            jqElement.val('');
            scope.fileInput.fileName = '';
            (scope.fileClear || angular.noop)();
          };
        }
      };
    }
  ]);
});
