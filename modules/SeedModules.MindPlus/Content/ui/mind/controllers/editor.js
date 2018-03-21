define(['SeedModules.MindPlus/ui/mind/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/mind/controllers/editor', [
    '$scope',
    '$appConfig',
    function($scope, $appConfig) {
      $scope.$appConfig = $appConfig;
      $scope.currentNode = null;

      $scope.initEditor = function(editor, minder) {
        window.editor = editor;
        window.minder = minder;
      };

      // var minder = new kityminder.Minder({
      //   renderTo: '.mind-container'
      // });

      // // 触发选择事件
      // minder.on('selectionchange', function(e) {
      //   $scope.currentNode = e.minder.getSelectedNode();
      // });

      // // 双击事件
      // minder.on('normal.dblclick', function(e) {});

      // // 鼠标按下
      // minder.on('normal.mousedown', function(e) {
      //   // 右键
      //   if (e.originEvent.button == 2) {
      //   }
      // });
    }
  ]);
});
