define('SeedModules.PageBuilder/modules/boot', [
    'require',
    'exports',
    'angular',
    'app/application',
    'schema-form-bootstrap'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.pagebuilder.boot', ['schemaForm']);
});
define('SeedModules.AngularUI/modules/configs/enums/extendFormFields', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var ExtendFormFields;
    (function (ExtendFormFields) {
        ExtendFormFields['row'] = 'row';
        ExtendFormFields['column'] = 'column';
        ExtendFormFields['panel'] = 'panel';
        ExtendFormFields['container'] = 'container';
        ExtendFormFields['table'] = 'table';
        ExtendFormFields['switch'] = 'switch';
        ExtendFormFields['navbar'] = 'navbar';
    }(ExtendFormFields = exports.ExtendFormFields || (exports.ExtendFormFields = {})));
});
define('SeedModules.AngularUI/modules/configs/enums/defaultFormTypes', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var DefaultFormTypes;
    (function (DefaultFormTypes) {
        DefaultFormTypes['fieldset'] = 'fieldset';
        DefaultFormTypes['section'] = 'section';
        DefaultFormTypes['actions'] = 'actions';
        DefaultFormTypes['text'] = 'text';
        DefaultFormTypes['textarea'] = 'textarea';
        DefaultFormTypes['number'] = 'number';
        DefaultFormTypes['password'] = 'password';
        DefaultFormTypes['checkbox'] = 'checkbox';
        DefaultFormTypes['checkboxes'] = 'checkboxes';
        DefaultFormTypes['select'] = 'select';
        DefaultFormTypes['submit'] = 'submit';
        DefaultFormTypes['button'] = 'button';
        DefaultFormTypes['radios'] = 'radios';
        DefaultFormTypes['radiosInline'] = 'radios-inline';
        DefaultFormTypes['radiobuttons'] = 'radiobuttons';
        DefaultFormTypes['help'] = 'help';
        DefaultFormTypes['template'] = 'template';
        DefaultFormTypes['tab'] = 'tab';
        DefaultFormTypes['tabs'] = 'tabs';
        DefaultFormTypes['array'] = 'array';
        DefaultFormTypes['tabarray'] = 'tabarray';
        DefaultFormTypes['subforms'] = 'subforms';
    }(DefaultFormTypes = exports.DefaultFormTypes || (exports.DefaultFormTypes = {})));
});
define('SeedModules.PageBuilder/modules/providers/defaultTools', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/configs/enums/extendFormFields',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, extendFormFields_1, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var DefaultToolsConfig = function () {
        function DefaultToolsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.row,
                icon: 'fas fa-window-minimize',
                name: '行',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.column,
                icon: 'fas fa-columns',
                name: '列',
                container: true,
                fields: ['flex']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.container,
                name: '容器',
                icon: 'fas fa-expand',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.panel,
                name: '面板',
                icon: 'far fa-window-maximize',
                container: true,
                fields: [
                    'title',
                    'notitle',
                    'theme',
                    'titleIcon'
                ]
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.navbar,
                name: '导航栏',
                icon: 'fas fa-bars',
                container: true,
                fields: [
                    'htmlClass',
                    'theme'
                ]
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                name: '节点',
                icon: 'fab fa-delicious',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.tabs,
                name: '选项卡组',
                container: 'tabs',
                fields: []
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.tab,
                name: '选项卡',
                container: true,
                fields: [
                    'title',
                    'titleIcon'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                name: '文本输入',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly',
                    'placeholder',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.textarea,
                name: '文本域',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly',
                    'placeholder',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.select,
                name: '选择框',
                icon: 'fas fa-check-square',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly'
                ]
            });
        }
        DefaultToolsConfig.$inject = ['SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'];
        return DefaultToolsConfig;
    }();
    exports.DefaultToolsConfig = DefaultToolsConfig;
});
define('SeedModules.PageBuilder/modules/providers/defaultToolFields', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var DefaultToolFieldsConfig = function () {
        function DefaultToolFieldsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addControlProperty('基本', 'readonly', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '只读',
                key: 'readonly'
            });
            toolsBuilderProvider.addControlProperty('基本', 'title', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题',
                key: 'title'
            });
            toolsBuilderProvider.addControlProperty('基本', 'description', {
                type: 'textarea',
                title: '描述',
                key: 'description'
            });
            toolsBuilderProvider.addControlProperty('基本', 'notitle', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '隐藏标题',
                key: 'notitle'
            });
            toolsBuilderProvider.addControlProperty('基本', 'placeholder', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '水印',
                key: 'placeholder'
            });
            toolsBuilderProvider.addControlProperty('验证', 'required', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '必填',
                key: 'required'
            });
            toolsBuilderProvider.addControlProperty('验证', 'textRange', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                title: '字符长度',
                htmlClass: 'row',
                items: [
                    {
                        type: 'section',
                        htmlClass: 'col-xs-6',
                        items: [{
                                key: 'schema["minLength"]',
                                title: '最小长度',
                                type: 'number'
                            }]
                    },
                    {
                        type: 'section',
                        htmlClass: 'col-xs-6',
                        items: [{
                                key: 'schema["maxLength"]',
                                title: '最大长度',
                                type: 'number'
                            }]
                    }
                ]
            });
            toolsBuilderProvider.addControlProperty('布局', 'flex', {
                type: defaultFormTypes_1.DefaultFormTypes.number,
                title: '宽度',
                key: 'flex'
            });
            toolsBuilderProvider.addControlProperty('样式', 'htmlClass', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '自定义样式',
                key: 'htmlClass'
            });
            toolsBuilderProvider.addControlProperty('样式', 'theme', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '主题',
                key: 'theme'
            });
            toolsBuilderProvider.addControlProperty('样式', 'titleIcon', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题图标',
                key: 'titleIcon'
            });
        }
        DefaultToolFieldsConfig.$inject = ['SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'];
        return DefaultToolFieldsConfig;
    }();
    exports.DefaultToolFieldsConfig = DefaultToolFieldsConfig;
});
define('SeedModules.PageBuilder/modules/providers/toolsBuilder', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/boot',
    'angular',
    'SeedModules.PageBuilder/modules/providers/defaultTools',
    'SeedModules.PageBuilder/modules/providers/defaultToolFields'
], function (require, exports, boot, angular, defaultTools_1, defaultToolFields_1) {
    'use strict';
    exports.__esModule = true;
    var ToolsBuilderService = function () {
        function ToolsBuilderService(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
        }
        ToolsBuilderService.prototype.getControlProperties = function (type) {
            var self = this;
            var tool = this.getControl(type);
            if (!tool)
                return null;
            var form = {};
            angular.forEach(self.defaultToolFields, function (fields, category) {
                form[category] = form[category] || {};
                angular.forEach(tool.fields, function (field) {
                    if (typeof field === 'string' && fields[field]) {
                        form[category][field] = fields[field];
                    } else {
                        var controlField = field;
                        form[category][controlField.name] = fields[controlField.name];
                    }
                });
            });
            return form;
        };
        ToolsBuilderService.prototype.getControl = function (type) {
            var tools = this.getControls();
            var selectedTool = null;
            angular.forEach(tools, function (tool, category) {
                var selected = $.grep(tool, function (t, i) {
                    return type && type.length > 0 ? t.type === type : false;
                });
                if (selected.length > 0) {
                    selectedTool = selected[0];
                    return false;
                }
            });
            return selectedTool;
        };
        ToolsBuilderService.prototype.getControls = function () {
            return this.defaultTools;
        };
        return ToolsBuilderService;
    }();
    var ToolsBuilderProvider = function () {
        function ToolsBuilderProvider(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
            this.service = new ToolsBuilderService(this.defaultTools, this.defaultToolFields);
        }
        ToolsBuilderProvider.prototype.addControlProperty = function (category, name, form) {
            this.defaultToolFields[category] = this.defaultToolFields[category] || {};
            this.defaultToolFields[category][name] = form;
        };
        ToolsBuilderProvider.prototype.getControl = function (category, name) {
            if (!this.defaultTools[category])
                return null;
            var existed = $.grep(this.defaultTools[category], function (item, idx) {
                return item.name === name;
            });
            return existed && existed.length > 0 ? existed[0] : null;
        };
        ToolsBuilderProvider.prototype.addControl = function (category, tool) {
            this.defaultTools[category] = this.defaultTools[category] ? this.defaultTools[category] : [];
            var existed = $.grep(this.defaultTools[category], function (item, idx) {
                return item.name === tool.name;
            });
            tool.icon = tool.icon || 'fas fa-puzzle-piece';
            if (!existed || existed.length <= 0) {
                this.defaultTools[category].push(tool);
            } else {
                existed = angular.extend(existed, tool);
            }
        };
        ToolsBuilderProvider.prototype.$get = function () {
            return this.service;
        };
        ToolsBuilderProvider.$inject = [
            'SeedModules.PageBuilder/modules/configs/defaultTools',
            'SeedModules.PageBuilder/modules/configs/defaultToolFields'
        ];
        return ToolsBuilderProvider;
    }();
    var ConfigToolsClass = function () {
        function ConfigToolsClass(toolsBuilderProvider) {
        }
        ConfigToolsClass.$inject = ['SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'];
        return ConfigToolsClass;
    }();
    boot.constant('SeedModules.PageBuilder/modules/configs/defaultTools', {}).constant('SeedModules.PageBuilder/modules/configs/defaultToolFields', { 基本: [] }).provider('SeedModules.PageBuilder/modules/providers/toolsBuilder', ToolsBuilderProvider).config(defaultToolFields_1.DefaultToolFieldsConfig).config(defaultTools_1.DefaultToolsConfig);
});
define('SeedModules.PageBuilder/modules/configs/run', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var ConfigRouteClass = function () {
        function ConfigRouteClass($stateProvider) {
            $stateProvider.state('admin.pagebuilder_db', {
                url: '/pagebuilder_db',
                title: '数据库',
                templateUrl: '/SeedModules.PageBuilder/modules/components/database/master.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_page', {
                url: '/pagebuilder_page',
                title: '页面管理',
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/page.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_pageform', {
                url: '/pagebuilder_pageform/{id}',
                title: '页面编辑',
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/pageForm.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_datasource', {
                url: '/pagebuilder_datasource',
                title: '数据源管理',
                templateUrl: '/SeedModules.PageBuilder/modules/components/datasource/list.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_dsform', {
                url: '/pagebuilder_dsform',
                title: '数据源编辑',
                templateUrl: '/SeedModules.PageBuilder/modules/components/datasource/form.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_threetest', {
                url: '/pagebuilder_threetest',
                title: '三维测试',
                templateUrl: '/SeedModules.PageBuilder/modules/components/three/page.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
        }
        ConfigRouteClass.$inject = ['$stateProvider'];
        return ConfigRouteClass;
    }();
    var RunClass = function () {
        function RunClass($state, nav) {
            nav.add({
                text: '定制管理',
                icon: 'fab fa-fort-awesome fa-fw',
                order: 5,
                children: [
                    {
                        text: '数据库',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_db');
                        }
                    },
                    {
                        text: '页面管理',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_page');
                        }
                    },
                    {
                        text: '数据源管理',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_datasource');
                        }
                    },
                    {
                        text: '三维测试',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_threetest');
                        }
                    }
                ]
            });
        }
        RunClass.$inject = [
            '$state',
            'SeedModules.Admin/modules/admin/configs/nav'
        ];
        return RunClass;
    }();
    boot.config(ConfigRouteClass).run(RunClass);
});
define('SeedModules.PageBuilder/modules/module', [
    'require',
    'exports',
    'angular',
    'SeedModules.PageBuilder/modules/providers/toolsBuilder',
    'SeedModules.PageBuilder/modules/configs/run'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.pagebuilder', ['modules.pagebuilder.boot']);
});