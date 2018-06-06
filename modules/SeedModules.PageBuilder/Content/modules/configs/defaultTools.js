define(["require", "exports", "SeedModules.PageBuilder/modules/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var defaultTools = {
        布局: [
            {
                name: '行',
                icon: '',
                type: 'row'
            },
            {
                name: '面板',
                icon: '',
                type: 'panel'
            },
            {
                name: '工具栏',
                icon: '',
                type: 'tools'
            },
            {
                name: '选项卡',
                icon: '',
                type: 'tabs'
            }
        ]
    };
    boot.constant('SeedModules.PageBuilder/modules/configs/defaultTools', defaultTools);
});
//# sourceMappingURL=defaultTools.js.map