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
                                                        key: 'source1.lname',
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
                                                        key: 'source1.fname',
                                                        type: defaultFormTypes_1.DefaultFormTypes.text,
                                                        title: '名'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                schema: {
                    type: schemaTypes_1.SchemaTypes.object,
                    properties: {
                        source1: {
                            type: 'object',
                            properties: {
                                fname: { type: 'string', required: true },
                                lname: { type: 'string' }
                            }
                        }
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
                            type: 'string'
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
                beforeDrop: function (eventInfo) {
                    if (eventInfo.dest.nodesScope.$treeScope.$id ===
                        eventInfo.source.nodesScope.$treeScope.$id)
                        return false;
                    var selectedTool = toolsBuilder.getTool(eventInfo.dest.nodesScope && eventInfo.source.nodeScope.item
                        ? eventInfo.source.nodeScope.item.type
                        : null);
                    if (selectedTool) {
                        var destTool = {
                            type: selectedTool.type,
                            container: selectedTool.container,
                            key: selectedTool.type
                        };
                        if (typeof selectedTool.container === 'string' &&
                            selectedTool.container.length > 0) {
                            destTool.container = selectedTool.container;
                            destTool[destTool.container] = [];
                        }
                        else if (typeof selectedTool.container === 'boolean' &&
                            selectedTool.container === true) {
                            destTool.container = 'items';
                            destTool['items'] = [];
                        }
                        eventInfo.dest.nodesScope.$modelValue.splice(eventInfo.dest.index, 0, destTool);
                    }
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
        PageFormClass.prototype.dropTool = function (scope) {
            scope.remove();
        };
        PageFormClass.prototype.editField = function (scope) {
            var form = this.toolsBuilder.getToolForm(scope.item['type']);
            var formDefine = [];
            angular.forEach(form, function (fields, category) {
                var categoryPanel = {
                    type: defaultFormTypes_1.DefaultFormTypes.fieldset,
                    items: []
                };
                angular.forEach(fields, function (field, name) {
                    categoryPanel.items.push(angular.extend({ schema: {} }, field));
                });
                formDefine.push(categoryPanel);
            });
            this.$scope.field = {
                form: formDefine,
                schema: {
                    type: 'object',
                    properties: { key: { type: 'string' } }
                },
                model: scope.item,
                options: {}
            };
        };
        PageFormClass.prototype.collapseAll = function () {
            this.$scope.$broadcast('angular-ui-tree:collapse-all');
        };
        PageFormClass.prototype.expandAll = function () {
            this.$scope.$broadcast('angular-ui-tree:expand-all');
        };
        PageFormClass.prototype.nodeToggle = function (scope) {
            scope.toggle();
        };
        PageFormClass.prototype.initTool = function (item) {
            if (item.items !== undefined) {
                item.container = 'items';
            }
        };
        PageFormClass.prototype.viewCode = function () {
            this.$modal.open({
                template: '<div><textarea style="width: 100%; height: 400px" ng-model="$data"></textarea></div>',
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: JSON.stringify(this.$scope.editor)
                }),
                size: 'lg'
            });
        };
        PageFormClass.prototype.preview = function () {
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/preview.html',
                size: 'full',
                windowClass: 'right',
                scope: this.$scope
            });
        };
        PageFormClass.prototype.back = function () {
            this.$state.go('admin.pagebuilder_page');
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