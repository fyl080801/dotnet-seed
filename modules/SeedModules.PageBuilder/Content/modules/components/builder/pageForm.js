define(["require", "exports", "SeedModules.PageBuilder/modules/module", "angular", "SeedModules.AngularUI/modules/configs/enums/schemaTypes", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes", "rcss!/SeedModules.PageBuilder/css/page-builder.css"], function (require, exports, mod, angular, schemaTypes_1, defaultFormTypes_1) {
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
            $scope.form = {
                form: [
                    {
                        key: 'pagename',
                        title: '页面名称',
                        placeholder: '输入页面名称',
                        required: true
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
            $scope.editor = {
                form: [],
                schema: {},
                options: {},
                model: {}
            };
            $scope.field = {
                form: [],
                schema: {},
                model: {},
                options: {}
            };
        }
        PageFormClass.prototype.dropControl = function (scope) {
            scope.remove();
            if (scope.$modelValue.key) {
                if (scope.$modelValue.key && typeof scope.$modelValue.key === 'string') {
                    scope.$modelValue.key = scope.$modelValue.key.split('.');
                }
                var formProperty = this.$scope.editor.schema.properties;
                for (var i = 0; i < scope.$modelValue.key.length; i++) {
                    if (i === scope.$modelValue.key.length - 1) {
                        delete formProperty[scope.$modelValue.key[i]];
                    }
                    else {
                        formProperty = formProperty[scope.$modelValue.key[i]].properties;
                    }
                }
            }
        };
        PageFormClass.prototype.editControl = function (scope) {
            var self = this;
            var form = this.toolsBuilder.getControlProperties(scope.item['type']);
            var fieldSchema = {
                $id: scope.$id,
                form: [],
                schema: {
                    type: 'object',
                    properties: {
                        schema: {
                            type: 'object'
                        }
                    }
                },
                model: scope.item,
                options: {}
            };
            angular.forEach(form, function (fields, category) {
                var categoryPanel = {
                    type: defaultFormTypes_1.DefaultFormTypes.fieldset,
                    items: []
                };
                angular.forEach(fields, function (field, name) {
                    categoryPanel.items.push(angular.extend({ schema: {} }, field));
                });
                fieldSchema.form.push(categoryPanel);
            });
            this.$scope.field = fieldSchema;
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
        PageFormClass.prototype.initControl = function (item) {
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
                size: 'lg',
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