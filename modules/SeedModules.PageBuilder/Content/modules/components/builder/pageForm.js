define(["require", "exports", "SeedModules.PageBuilder/modules/module", "angular", "SeedModules.AngularUI/modules/configs/enums/schemaTypes", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes", "SeedModules.AngularUI/modules/configs/enums/extendFormFields", "rcss!/SeedModules.PageBuilder/css/page-builder.css"], function (require, exports, mod, angular, schemaTypes_1, defaultFormTypes_1, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var PageFormClass = (function () {
        function PageFormClass($scope, $rootScope, $state, $modal, toolsBuilder, ngTableParams) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$modal = $modal;
            this.toolsBuilder = toolsBuilder;
            this.ngTableParams = ngTableParams;
            $scope.pg = this;
            $scope.editor = {
                form: [
                    {
                        type: extendFormFields_1.ExtendFormFields.panel,
                        title: 'aaaaaaaaa',
                        theme: 'success',
                        items: [
                            {
                                type: extendFormFields_1.ExtendFormFields.container,
                                items: [
                                    {
                                        type: extendFormFields_1.ExtendFormFields.row,
                                        items: [
                                            {
                                                type: extendFormFields_1.ExtendFormFields.column,
                                                flex: 6,
                                                items: [
                                                    {
                                                        key: 'source1.lastName',
                                                        type: defaultFormTypes_1.DefaultFormTypes.text,
                                                        title: '姓'
                                                    }
                                                ]
                                            },
                                            {
                                                type: extendFormFields_1.ExtendFormFields.column,
                                                flex: 6,
                                                items: [
                                                    {
                                                        key: 'source1.firstName',
                                                        type: defaultFormTypes_1.DefaultFormTypes.text,
                                                        title: '名'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 'source1.description',
                                        type: defaultFormTypes_1.DefaultFormTypes.text,
                                        title: '描述'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: extendFormFields_1.ExtendFormFields.panel,
                        title: '面板2',
                        theme: 'info',
                        items: [
                            {
                                type: defaultFormTypes_1.DefaultFormTypes.section,
                                items: [
                                    {
                                        key: 'category',
                                        type: 'select',
                                        title: '分类'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: extendFormFields_1.ExtendFormFields.panel,
                        title: '表格',
                        theme: 'default',
                        items: [
                            {
                                type: extendFormFields_1.ExtendFormFields.navbar,
                                theme: 'default',
                                htmlClass: 'navbar-static-top',
                                items: []
                            },
                            {
                                type: extendFormFields_1.ExtendFormFields.table,
                                tableParams: new ngTableParams(),
                                tableColumns: [
                                    { field: 'name', title: '姓名' },
                                    { field: 'tel', title: '电话' },
                                    { field: 'mail', title: '邮箱' }
                                ]
                            }
                        ]
                    }
                ],
                schema: {
                    type: schemaTypes_1.SchemaTypes.object,
                    properties: {
                        source1: { type: 'object' }
                    }
                },
                options: {},
                model: {}
            };
            $scope.form = {
                form: [
                    {
                        key: 'pagename',
                        title: '页面名称',
                        placeholder: '输入页面名称'
                    }
                ],
                schema: {
                    type: schemaTypes_1.SchemaTypes.object,
                    properties: {
                        pagename: {
                            type: 'string',
                            required: true
                        }
                    }
                },
                options: {},
                model: {}
            };
            $scope.field = {
                form: [],
                schema: {
                    type: 'object',
                    properties: {}
                },
                model: {},
                options: {}
            };
            $scope.toolsConfigs = {
                accept: function (source, destination, destinationIndex) {
                    return false;
                },
                beforeDrop: function (eventInfo) {
                    console.log(eventInfo.dest);
                    return false;
                }
            };
            $scope.tools = [];
            var tools = toolsBuilder.getTools();
            angular.forEach(tools, function (tool, idx) {
                $scope.tools.push({
                    category: idx,
                    items: tool
                });
            });
        }
        PageFormClass.prototype.collapseAll = function () {
            this.$scope.$broadcast('angular-ui-tree:collapse-all');
        };
        PageFormClass.prototype.expandAll = function () {
            this.$scope.$broadcast('angular-ui-tree:expand-all');
        };
        PageFormClass.prototype.nodeToggle = function (scope) {
            scope.toggle();
        };
        PageFormClass.prototype.back = function () {
            this.$state.go('admin.pagebuilder_page');
        };
        PageFormClass.prototype.preview = function () {
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/preview.html',
                size: 'full',
                windowClass: 'right',
                scope: this.$scope
            });
        };
        PageFormClass.$inject = [
            '$scope',
            '$rootScope',
            '$state',
            '$modal',
            'SeedModules.PageBuilder/modules/providers/toolsBuilder',
            'SeedModules.AngularUI/modules/factories/ngTableParams'
        ];
        return PageFormClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/pageForm', PageFormClass);
});
//# sourceMappingURL=pageForm.js.map