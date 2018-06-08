define(["require", "exports", "SeedModules.PageBuilder/modules/module", "SeedModules.AngularUI/modules/configs/enums/schemaTypes", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes", "SeedModules.AngularUI/modules/configs/enums/extendFormFields", "rcss!/SeedModules.PageBuilder/css/page-builder.css"], function (require, exports, mod, schemaTypes_1, defaultFormTypes_1, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var PageFormClass = (function () {
        function PageFormClass($scope, $state, $modal) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            $scope.pagename = '';
            $scope.form = [
                {
                    type: extendFormFields_1.ExtendFormFields.panel,
                    title: 'aaaaaaaaa',
                    theme: 'success',
                    items: [
                        {
                            key: 'aaa',
                            type: defaultFormTypes_1.DefaultFormTypes.text,
                            title: 'aaaa'
                        }
                    ]
                }
            ];
            $scope.model = {};
            $scope.schema = {
                type: schemaTypes_1.SchemaTypes.object,
                properties: {}
            };
            $scope.options = {};
        }
        PageFormClass.prototype.back = function () {
            this.$state.go('admin.pagebuilder_page');
        };
        PageFormClass.prototype.refresh = function () {
            this.$scope.$broadcast('schemaFormRedraw');
        };
        PageFormClass.$inject = ['$scope', '$state', '$modal'];
        return PageFormClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/pageForm', PageFormClass);
});
//# sourceMappingURL=pageForm.js.map