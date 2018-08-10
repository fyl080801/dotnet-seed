define(["require", "exports", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    exports.tableform = function (schemaFormParams) {
        return {
            formParams: schemaFormParams.properties({
                name: {
                    title: '表名',
                    type: 'string',
                    required: true
                },
                description: {
                    title: '说明',
                    type: 'string'
                },
                remark: {
                    title: '中文名',
                    type: 'string'
                }
            }),
            form: [
                {
                    type: defaultFormTypes_1.DefaultFormTypes.section,
                    htmlClass: 'row',
                    items: [
                        {
                            type: defaultFormTypes_1.DefaultFormTypes.section,
                            htmlClass: 'col-md-6',
                            items: ['name']
                        },
                        {
                            type: defaultFormTypes_1.DefaultFormTypes.section,
                            htmlClass: 'col-md-6',
                            items: ['remark']
                        }
                    ]
                },
                {
                    key: 'description',
                    type: defaultFormTypes_1.DefaultFormTypes.textarea
                }
            ]
        };
    };
});
//# sourceMappingURL=forms.js.map