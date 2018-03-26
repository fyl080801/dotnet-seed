define(['SeedModules.MindPlus/ui/mind/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/mind/controllers/editor', [
    '$scope',
    '$stateParams',
    '$appConfig',
    '$timeout',
    '$modal',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.MindPlus/ui/mind/factories/minderInstance',
    function(
      $scope,
      $stateParams,
      $appConfig,
      $timeout,
      $modal,
      popupService,
      requestService,
      minderInstance
    ) {
      $scope.$appConfig = $appConfig;

      $scope.mind = null;

      $scope.currentNode = null;

      $scope.minderInstance = new minderInstance({
        renderTo: '.mind-container',
        events: {
          selectionchange: function(e) {
            $scope.currentNode = e.minder.getSelectedNode();
            $timeout(function() {
              $scope.$apply();
            });
          }
        }
      });

      $scope.load = function() {
        requestService
          .url('/api/mindplus/works/' + $stateParams.id)
          .options({
            showLoading: false
          })
          .get()
          .then(function(result) {
            $scope.mind = result;
            $scope.minderInstance.getRoot().setText(result.name);
            $scope.minderInstance.refresh();
          });
      };

      $scope.addChild = function() {
        $scope.minderInstance.execCommand('AppendChildNode', '新建任务');
      };

      $scope.addParent = function() {
        $scope.minderInstance.execCommand('AppendParentNode', '新建任务');
      };

      $scope.addCurrent = function() {
        $scope.minderInstance.execCommand('AppendSiblingNode', '新建任务');
      };

      $scope.arrangeUp = function() {
        $scope.minderInstance.execCommand('ArrangeUp');
      };

      $scope.arrangeDown = function() {
        $scope.minderInstance.execCommand('ArrangeDown');
      };

      $scope.edit = function() {
        $scope.minderInstance.execCommand('EditNode');
      };

      $scope.drop = function() {
        $scope.minderInstance.execCommand('RemoveNode');
      };
    }
  ]);
});
