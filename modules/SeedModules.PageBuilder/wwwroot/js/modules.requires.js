define('SeedModules.PageBuilder/modules/components/builder/page', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var PageController = function () {
        function PageController($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.page = this;
            $scope.search = { keyword: '' };
            $scope.pages = [];
        }
        PageController.prototype.keywordCallback = function () {
        };
        PageController.prototype.preview = function (id) {
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/preview.html',
                size: 'lg'
            });
        };
        PageController.prototype.add = function () {
            this.$state.go('admin.pagebuilder_pageform');
        };
        PageController.prototype.edit = function (id) {
            this.$state.go('admin.pagebuilder_pageform', { id: id });
        };
        PageController.prototype.drop = function () {
            this.popupService.confirm('是否删除\uFF1F').ok(function () {
            });
        };
        PageController.$inject = [
            '$scope',
            '$state',
            '$modal',
            'app/services/popupService'
        ];
        return PageController;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/builder/page', PageController);
});
define('SeedModules.PageBuilder/modules/components/server/settings', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var SettingsController = function () {
        function SettingsController($scope) {
            this.$scope = $scope;
        }
        SettingsController.$inject = ['$scope'];
        return SettingsController;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/server/settings', SettingsController);
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
define('SeedModules.PageBuilder/modules/components/builder/pageForm', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module',
    'angular',
    'SeedModules.AngularUI/modules/configs/enums/schemaTypes',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes',
    'rcss!/SeedModules.PageBuilder/css/page-builder.css'
], function (require, exports, mod, angular, schemaTypes_1, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var PageFormClass = function () {
        function PageFormClass($scope, $rootScope, $state, $modal, toolsBuilder, ngTableParams) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$modal = $modal;
            this.toolsBuilder = toolsBuilder;
            this.ngTableParams = ngTableParams;
            $scope.pg = this;
            $scope.form = {
                form: [{
                        key: 'pagename',
                        title: '页面名称',
                        placeholder: '输入页面名称',
                        required: true
                    }],
                schema: {
                    type: schemaTypes_1.SchemaTypes.object,
                    properties: { pagename: { type: 'string' } }
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
                    } else {
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
                    properties: { schema: { type: 'object' } }
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
                scope: angular.extend(this.$rootScope.$new(), { $data: JSON.stringify(this.$scope.editor) }),
                size: 'lg'
            });
        };
        PageFormClass.prototype.preview = function () {
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/preview.html',
                size: '9',
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
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/builder/pageForm', PageFormClass);
});
define('SeedModules.PageBuilder/modules/components/builder/preview', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var PreviewController = function () {
        function PreviewController($scope) {
            this.$scope = $scope;
        }
        PreviewController.prototype.init = function () {
            this.$scope.$emit('schemaFormRedraw');
        };
        PreviewController.$inject = ['$scope'];
        return PreviewController;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/builder/preview', PreviewController);
});
define('SeedModules.PageBuilder/modules/components/toolbox/builderToolbox', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var BuilderToolboxController = function () {
        function BuilderToolboxController($scope, toolsBuilder) {
            this.$scope = $scope;
            this.toolsBuilder = toolsBuilder;
            var self = this;
            $scope.toolsConfigs = {
                beforeDrop: function (eventInfo) {
                    if (eventInfo.dest.nodesScope.$treeScope.$id === eventInfo.source.nodesScope.$treeScope.$id)
                        return false;
                    var selectedTool = toolsBuilder.getControl(eventInfo.dest.nodesScope && eventInfo.source.nodeScope.item ? eventInfo.source.nodeScope.item.type : null);
                    if (selectedTool) {
                        var destTool = {
                            type: selectedTool.type,
                            title: selectedTool.name,
                            container: selectedTool.container ? selectedTool.container : undefined
                        };
                        if (typeof destTool.container === 'string' && destTool.container.length > 0) {
                            destTool[destTool.container] = [];
                        } else if (typeof destTool.container === 'boolean' && destTool.container === true) {
                            destTool.container = 'items';
                            destTool[destTool.container] = [];
                        } else {
                            destTool.key = '_' + destTool.type + '_' + self.uuid(10);
                            $scope.editor.schema.type = 'object';
                            $scope.editor.schema.properties = $scope.editor.schema.properties || {};
                            $scope.editor.schema.properties[destTool.key] = { type: 'string' };
                        }
                        eventInfo.dest.nodesScope.$modelValue.splice(eventInfo.dest.index, 0, destTool);
                    }
                    return false;
                }
            };
            $scope.tools = toolsBuilder.getControls();
        }
        BuilderToolboxController.prototype.uuid = function (len, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++)
                    uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
                    }
                }
            }
            return uuid.join('');
        };
        BuilderToolboxController.$inject = [
            '$scope',
            'SeedModules.PageBuilder/modules/providers/toolsBuilder'
        ];
        return BuilderToolboxController;
    }();
    function directive() {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: '/SeedModules.PageBuilder/modules/components/toolbox/builderToolbox.html',
            scope: { editor: '=' },
            controller: BuilderToolboxController
        };
    }
    mod.directive('builderToolbox', directive);
});
define('SeedModules.PageBuilder/modules/components/datasource/list', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var ListController = function () {
        function ListController($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.dslist = this;
        }
        ListController.prototype.add = function () {
            this.$state.go('admin.pagebuilder_dsform');
        };
        ListController.$inject = [
            '$scope',
            '$state',
            '$modal',
            'app/services/popupService'
        ];
        return ListController;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/list', ListController);
});
define('SeedModules.PageBuilder/modules/components/datasource/form', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var FormController = function () {
        function FormController($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.dsform = this;
        }
        FormController.prototype.cancel = function () {
            this.$state.go('admin.pagebuilder_datasource');
        };
        FormController.$inject = [
            '$scope',
            '$state',
            '$modal',
            'app/services/popupService'
        ];
        return FormController;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/form', FormController);
});
define('SeedModules.PageBuilder/modules/components/datasource/baseinfo', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, mod, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var ControllerClass = function () {
        function ControllerClass($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.vm = this;
            $scope.sfForm = {
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
                                items: [{
                                        key: 'sourceType',
                                        type: defaultFormTypes_1.DefaultFormTypes.select
                                    }]
                            }
                        ]
                    },
                    {
                        type: defaultFormTypes_1.DefaultFormTypes.textarea,
                        key: 'description'
                    }
                ],
                model: {},
                options: {},
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            title: '名称',
                            required: true
                        },
                        description: {
                            type: 'string',
                            title: '描述'
                        },
                        sourceType: {
                            type: 'string',
                            title: '类型',
                            required: true
                        }
                    }
                }
            };
        }
        ControllerClass.$inject = [
            '$scope',
            '$state',
            '$modal',
            'app/services/popupService'
        ];
        return ControllerClass;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/baseinfo', ControllerClass);
});
define('SeedModules.PageBuilder/modules/components/datasource/fields', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var ControllerClass = function () {
        function ControllerClass($scope) {
            this.$scope = $scope;
        }
        ControllerClass.$inject = ['$scope'];
        return ControllerClass;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/fields', ControllerClass);
});
define('SeedModules.PageBuilder/modules/configs/enums', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var BuilderDefineTypes;
    (function (BuilderDefineTypes) {
        BuilderDefineTypes[BuilderDefineTypes['页面'] = 0] = '页面';
        BuilderDefineTypes[BuilderDefineTypes['表'] = 1] = '表';
        BuilderDefineTypes[BuilderDefineTypes['数据源'] = 2] = '数据源';
    }(BuilderDefineTypes = exports.BuilderDefineTypes || (exports.BuilderDefineTypes = {})));
});
define('SeedModules.PageBuilder/modules/components/database/table', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module',
    'angular',
    'SeedModules.PageBuilder/modules/configs/enums'
], function (require, exports, mod, angular, enums_1) {
    'use strict';
    exports.__esModule = true;
    var ControllerClass = function () {
        function ControllerClass($scope, $rootScope, $state, $modal, popupService, requestService, schemaFormParams) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            this.requestService = requestService;
            this.schemaFormParams = schemaFormParams;
            $scope.vm = this;
            $scope.list = [];
            $scope.search = { keyword: '' };
        }
        ControllerClass.prototype.load = function () {
            var _this = this;
            this.requestService.url('/api/pagebuilder/define/' + enums_1.BuilderDefineTypes.表).get().result.then(function (result) {
                _this.$scope.list = result;
            });
        };
        ControllerClass.prototype.add = function () {
            var _this = this;
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/database/tableForm.html',
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: {
                        title: '编辑表',
                        model: {}
                    }
                }),
                size: 'lg'
            }).result.then(function (data) {
                _this.requestService.url('/api/pagebuilder/define').put({
                    type: enums_1.BuilderDefineTypes.表,
                    properties: data
                }).result.then(function (result) {
                    _this.load();
                });
            });
        };
        ControllerClass.prototype.edit = function (row) {
            var _this = this;
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/database/tableForm.html',
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: {
                        title: '编辑表',
                        model: $.extend({}, row.properties)
                    }
                }),
                size: 'lg'
            }).result.then(function (data) {
                _this.requestService.url('/api/pagebuilder/define').put({
                    id: row.id,
                    type: enums_1.BuilderDefineTypes.表,
                    properties: data
                }).result.then(function (result) {
                    _this.load();
                });
            });
        };
        ControllerClass.prototype.drop = function (row) {
            var _this = this;
            this.popupService.confirm('是否删除\uFF1F').ok(function () {
                _this.requestService.url('/api/pagebuilder/define/' + row.id).drop().result.then(function (result) {
                    _this.load();
                });
            });
        };
        ControllerClass.$inject = [
            '$scope',
            '$rootScope',
            '$state',
            '$modal',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return ControllerClass;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/database/table', ControllerClass);
});
define('SeedModules.PageBuilder/modules/components/database/forms', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, defaultFormTypes_1) {
    'use strict';
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
                'description'
            ]
        };
    };
});
define('SeedModules.PageBuilder/modules/components/database/tableForm', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module',
    'SeedModules.PageBuilder/modules/components/database/forms'
], function (require, exports, mod, forms_1) {
    'use strict';
    exports.__esModule = true;
    var Controller = function () {
        function Controller($scope, schemaFormParams) {
            this.$scope = $scope;
            this.schemaFormParams = schemaFormParams;
            $scope.$data = $.extend($scope.$data || {}, forms_1.tableform(new schemaFormParams()));
        }
        Controller.$inject = [
            '$scope',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return Controller;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/database/tableForm', Controller);
});
define('SeedModules.PageBuilder/modules/components/three/page', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module',
    'three'
], function (require, exports, mod, THREE) {
    'use strict';
    exports.__esModule = true;
    var PointerLockControls = function () {
        function PointerLockControls(camera) {
            var _this = this;
            camera.rotation.set(0, 0, 0);
            this._pitchObject = new THREE.Object3D();
            this._pitchObject.add(camera);
            this._yawObject = new THREE.Object3D();
            this._yawObject.position.y = 10;
            this._yawObject.add(this._pitchObject);
            this._PI_2 = Math.PI / 2;
            this._onMouseMove = function (event) {
                if (!_this.enabled)
                    return;
                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                _this._yawObject.rotation.y -= movementX * 0.002;
                _this._pitchObject.rotation.x -= movementY * 0.002;
                _this._pitchObject.rotation.x = Math.max(-_this._PI_2, Math.min(_this._PI_2, _this._pitchObject.rotation.x));
            };
            document.addEventListener('mousemove', this._onMouseMove, false);
            this.enabled = false;
            this.getDirection = function () {
                var direction = new THREE.Vector3(0, 0, -1);
                var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
                return function (v) {
                    rotation.set(_this._pitchObject.rotation.x, _this._yawObject.rotation.y, 0);
                    v.copy(direction).applyEuler(rotation);
                    return v;
                };
            }();
        }
        PointerLockControls.prototype.dispose = function () {
            document.removeEventListener('mousemove', this._onMouseMove, false);
        };
        PointerLockControls.prototype.getObject = function () {
            return this._yawObject;
        };
        PointerLockControls.prototype.getDirection = function (v) {
            return v;
        };
        PointerLockControls.prototype._onMouseMove = function (event) {
        };
        return PointerLockControls;
    }();
    var Controller = function () {
        function Controller($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            $scope.vm = this;
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, $element.innerWidth() / 600, 0.1, 1000);
            $scope.controlsEnabled = false;
            var moveForward = false;
            var moveBackward = false;
            var moveLeft = false;
            var moveRight = false;
            var canJump = false;
            var prevTime = performance.now();
            var velocity = new THREE.Vector3();
            var direction = new THREE.Vector3();
            var vertex = new THREE.Vector3();
            var color = new THREE.Color();
            var raycaster;
            var objects = [];
            var onKeyDown = function (event) {
                switch (event.keyCode) {
                case 38:
                case 87:
                    moveForward = true;
                    break;
                case 37:
                case 65:
                    moveLeft = true;
                    break;
                case 40:
                case 83:
                    moveBackward = true;
                    break;
                case 39:
                case 68:
                    moveRight = true;
                    break;
                case 32:
                    if (canJump === true)
                        velocity.y += 350;
                    canJump = false;
                    break;
                }
            };
            var onKeyUp = function (event) {
                switch (event.keyCode) {
                case 38:
                case 87:
                    moveForward = false;
                    break;
                case 37:
                case 65:
                    moveLeft = false;
                    break;
                case 40:
                case 83:
                    moveBackward = false;
                    break;
                case 39:
                case 68:
                    moveRight = false;
                    break;
                }
            };
            var pointerlockchange = function (event) {
                if (document.pointerLockElement === document.body || document['mozPointerLockElement'] === document.body || document['webkitPointerLockElement'] === document.body) {
                    $scope.controlsEnabled = true;
                    controls.enabled = true;
                } else {
                    controls.enabled = false;
                    $scope.controlsEnabled = false;
                }
            };
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
            raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
            var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
            floorGeometry.rotateX(-Math.PI / 2);
            var position = floorGeometry.attributes.position;
            for (var i = 0, l = position.count; i < l; i++) {
                vertex.fromBufferAttribute(position, i);
                vertex.x += Math.random() * 20 - 10;
                vertex.y += Math.random() * 2;
                vertex.z += Math.random() * 20 - 10;
                position.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }
            floorGeometry = floorGeometry.toNonIndexed();
            position = floorGeometry.attributes.position;
            var colors = [];
            for (var i = 0, l = position.count; i < l; i++) {
                color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                colors.push(color.r, color.g, color.b);
            }
            floorGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            var floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            scene.add(floor);
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize($element.innerWidth(), 600);
            $element.append(renderer.domElement);
            var geometry = new THREE.CubeGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 65280 });
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            camera.position.z = 5;
            $scope.scene = scene;
            $scope.camera = camera;
            $scope.renderer = renderer;
            $scope.cube = cube;
            var controls = new PointerLockControls(camera);
            scene.add(controls.getObject());
            this.controls = controls;
            function render() {
                requestAnimationFrame(render);
                update();
            }
            function update() {
                if ($scope.controlsEnabled === true) {
                    raycaster.ray.origin.copy(controls.getObject().position);
                    raycaster.ray.origin.y -= 10;
                    var intersections = raycaster.intersectObjects(objects);
                    var onObject = intersections.length > 0;
                    var time = performance.now();
                    var delta = (time - prevTime) / 1000;
                    velocity.x -= velocity.x * 10 * delta;
                    velocity.z -= velocity.z * 10 * delta;
                    velocity.y -= 9.8 * 100 * delta;
                    direction.z = Number(moveForward) - Number(moveBackward);
                    direction.x = Number(moveLeft) - Number(moveRight);
                    direction.normalize();
                    if (moveForward || moveBackward)
                        velocity.z -= direction.z * 400 * delta;
                    if (moveLeft || moveRight)
                        velocity.x -= direction.x * 400 * delta;
                    if (onObject === true) {
                        velocity.y = Math.max(0, velocity.y);
                        canJump = true;
                    }
                    controls.getObject().translateX(velocity.x * delta);
                    controls.getObject().translateY(velocity.y * delta);
                    controls.getObject().translateZ(velocity.z * delta);
                    if (controls.getObject().position.y < 10) {
                        velocity.y = 0;
                        controls.getObject().position.y = 10;
                        canJump = true;
                    }
                    prevTime = time;
                }
                renderer.render(scene, camera);
            }
            render();
        }
        Controller.prototype.lockpointer = function () {
            var element = document.body;
            var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
            if (havePointerLock) {
                element.requestPointerLock = element.requestPointerLock || element['mozRequestPointerLock'] || element['webkitRequestPointerLock'];
                element.requestPointerLock();
                this.controls.enabled = true;
                this.$scope.controlsEnabled = true;
            }
        };
        Controller.prototype.keydown = function ($event) {
            switch ($event.keyCode) {
            case 27:
                this.controls.enabled = false;
                this.$scope.controlsEnabled = false;
                break;
            default:
                break;
            }
        };
        Controller.$inject = [
            '$scope',
            '$element'
        ];
        return Controller;
    }();
    mod.controller('SeedModules.PageBuilder/modules/components/three/page', Controller);
});
define('SeedModules.PageBuilder/modules/controllers/pageCommon', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var PageCommonController = function () {
        function PageCommonController($scope) {
            this.$scope = $scope;
            $scope.pageCommon = this;
        }
        PageCommonController.prototype.datasource = function (id) {
        };
        PageCommonController.$inject = ['$scope'];
        return PageCommonController;
    }();
    mod.controller('SeedModules.PageBuilder/modules/controllers/pageCommon', PageCommonController);
});
define('SeedModules.PageBuilder/modules/requires', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/components/builder/page',
    'SeedModules.PageBuilder/modules/components/server/settings',
    'SeedModules.PageBuilder/modules/components/builder/pageForm',
    'SeedModules.PageBuilder/modules/components/builder/preview',
    'SeedModules.PageBuilder/modules/components/toolbox/builderToolbox',
    'SeedModules.PageBuilder/modules/components/datasource/list',
    'SeedModules.PageBuilder/modules/components/datasource/form',
    'SeedModules.PageBuilder/modules/components/datasource/baseinfo',
    'SeedModules.PageBuilder/modules/components/datasource/fields',
    'SeedModules.PageBuilder/modules/components/database/table',
    'SeedModules.PageBuilder/modules/components/database/tableForm',
    'SeedModules.PageBuilder/modules/components/three/page',
    'SeedModules.PageBuilder/modules/controllers/pageCommon'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});