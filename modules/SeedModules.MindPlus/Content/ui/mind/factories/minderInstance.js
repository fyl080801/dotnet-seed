define(['SeedModules.MindPlus/modules/mind/module', 'kityminder'], function(module) {
  'use strict';

  module.factory('SeedModules.MindPlus/modules/mind/factories/minderInstance', [
    function() {
      var minderInit = function(options) {
        var minder = new kityminder.Minder({
          renderTo: options.renderTo
        });

        for (var evt in options.events) {
          minder.on(evt, options.events[evt] || angular.noop);
        }

        // 双击事件
        minder.on('normal.dblclick', function(e) {});

        // 鼠标按下
        minder.on('normal.mousedown', function(e) {
          // 右键
          if (e.originEvent.button == 2) {
          }
        });

        return minder;
      };

      return minderInit;
    }
  ]);
});
