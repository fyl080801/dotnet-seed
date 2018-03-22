define(['SeedModules.MindPlus/ui/mind/configs'], function(configs) {
  'use strict';

  configs.run([
    '$templateCache',
    function($templateCache) {
      // 重新定义editor模板，把备注的编辑和预览去掉
      $templateCache.put(
        'ui/directive/kityminderEditor/kityminderEditor.html',
        '<div class="minder-editor-container"><div class="top-tab" top-tab="minder" editor="editor" ng-if="minder"></div><div search-box minder="minder" ng-if="minder"></div><div class="minder-editor"></div><div class="navigator" navigator minder="minder" ng-if="minder"></div></div>'
      );
    }
  ]);
});
