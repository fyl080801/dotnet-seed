define(['SeedModules.Saas/modules/module'], function (module) {
    'use strict';
    module.filter('tenantState', [
        function () {
            var map = ['未初始化', '初始化中', '运行中', '已禁用', '异常'];
            return function (val) {
                return map[val];
            };
        }
    ]);
});
//# sourceMappingURL=tenantState.js.map