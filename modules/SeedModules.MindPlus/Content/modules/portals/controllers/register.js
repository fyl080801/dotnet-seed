define(["require", "exports", "SeedModules.MindPlus/modules/portals/module", "SeedModules.AngularUI/modules/configs/enums/schemaTypes", "SeedModules.AngularUI/modules/configs/enums/dataTypes", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, mod, schemaTypes_1, dataTypes_1, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
        function ControllerClass($scope, $appConfig) {
            this.$scope = $scope;
            this.$appConfig = $appConfig;
            $scope.vm = this;
            $scope.sfform = {
                form: [
                    {
                        key: 'username',
                        placeholder: '请输入用户名/手机号'
                    },
                    {
                        key: 'password',
                        type: defaultFormTypes_1.DefaultFormTypes.password,
                        placeholder: '请输入密码'
                    },
                    {
                        key: 'passwordConfirm',
                        type: defaultFormTypes_1.DefaultFormTypes.password,
                        placeholder: '请输入确认密码'
                    }
                ],
                model: {},
                options: {},
                schema: {
                    type: schemaTypes_1.SchemaTypes.object,
                    properties: {
                        username: {
                            type: dataTypes_1.DataTypes.string,
                            title: '用户名',
                            required: true
                        },
                        password: { type: dataTypes_1.DataTypes.string, title: '密码', required: true },
                        passwordConfirm: {
                            type: dataTypes_1.DataTypes.string,
                            title: '密码确认',
                            required: true
                        }
                    }
                }
            };
        }
        ControllerClass.$inject = ['$scope', '$appConfig'];
        return ControllerClass;
    }());
    mod.controller('SeedModules.MindPlus/modules/portals/controllers/register', ControllerClass);
});
//# sourceMappingURL=register.js.map