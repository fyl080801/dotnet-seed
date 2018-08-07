define('SeedModules.MindPlus/modules/portals/controllers/index', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/portals/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var ControllerClass = function () {
        function ControllerClass($scope, $appConfig) {
            this.$scope = $scope;
            this.$appConfig = $appConfig;
            $scope.vm = this;
            $scope.$appConfig = $appConfig;
            $scope.myInterval = 5000;
            $scope.slides = [];
            for (var i = 0; i < 4; i++) {
                this.addSlide();
            }
        }
        ControllerClass.prototype.addSlide = function () {
            var newWidth = 600 + this.$scope.slides.length + 1;
            this.$scope.slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: [
                    'More',
                    'Extra',
                    'Lots of',
                    'Surplus'
                ][this.$scope.slides.length % 4] + ' ' + [
                    'Cats',
                    'Kittys',
                    'Felines',
                    'Cutes'
                ][this.$scope.slides.length % 4]
            });
        };
        ControllerClass.$inject = [
            '$scope',
            '$appConfig'
        ];
        return ControllerClass;
    }();
    mod.controller('SeedModules.MindPlus/modules/portals/controllers/index', ControllerClass);
});
define('SeedModules.AngularUI/modules/configs/enums/schemaTypes', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var SchemaTypes;
    (function (SchemaTypes) {
        SchemaTypes['object'] = 'object';
    }(SchemaTypes = exports.SchemaTypes || (exports.SchemaTypes = {})));
});
define('SeedModules.AngularUI/modules/configs/enums/dataTypes', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var DataTypes;
    (function (DataTypes) {
        DataTypes['string'] = 'string';
        DataTypes['number'] = 'number';
        DataTypes['integer'] = 'integer';
        DataTypes['boolean'] = 'boolean';
        DataTypes['object'] = 'object';
        DataTypes['array'] = 'array';
    }(DataTypes = exports.DataTypes || (exports.DataTypes = {})));
});
define('SeedModules.MindPlus/modules/portals/controllers/register', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/portals/module',
    'SeedModules.AngularUI/modules/configs/enums/schemaTypes',
    'SeedModules.AngularUI/modules/configs/enums/dataTypes',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, mod, schemaTypes_1, dataTypes_1, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var ControllerClass = function () {
        function ControllerClass($scope, $appConfig, popupService) {
            this.$scope = $scope;
            this.$appConfig = $appConfig;
            this.popupService = popupService;
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
                        password: {
                            type: dataTypes_1.DataTypes.string,
                            title: '密码',
                            required: true
                        },
                        passwordConfirm: {
                            type: dataTypes_1.DataTypes.string,
                            title: '密码确认',
                            required: true
                        }
                    }
                }
            };
        }
        ControllerClass.prototype.regist = function () {
            this.popupService.information('我就晚上有时间\uFF0C辣么多功能得一点点来呀');
        };
        ControllerClass.$inject = [
            '$scope',
            '$appConfig',
            'app/services/popupService'
        ];
        return ControllerClass;
    }();
    mod.controller('SeedModules.MindPlus/modules/portals/controllers/register', ControllerClass);
});
define('SeedModules.MindPlus/modules/portals/requires', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/portals/controllers/index',
    'SeedModules.MindPlus/modules/portals/controllers/register'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});