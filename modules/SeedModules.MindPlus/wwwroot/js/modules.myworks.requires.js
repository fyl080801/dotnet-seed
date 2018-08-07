define('SeedModules.MindPlus/modules/myworks/directives/sidebar', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.directive('sidebar', [function () {
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                template: '<div class="sidebar" ng-transclude></div>',
                link: function (scope, element, attrs, controller) {
                    element = $(element);
                    scope.$on('toggleSidebar', function (e, m) {
                        var navItemShow = element.find('.sidebar-item.sidebar-show');
                        var navItem = element.find('.sidebar-item');
                        var navContent = $('.sidebar-content');
                        if (!element.hasClass('sidebar-mini')) {
                            navItemShow.removeClass('sidebar-show');
                            navItem.children('ul').removeAttr('style');
                            element.addClass('sidebar-mini');
                            navContent.addClass('sidebar-min');
                        } else {
                            element.removeClass('sidebar-mini');
                            navContent.removeClass('sidebar-min');
                        }
                    });
                }
            };
        }]);
});
define('SeedModules.MindPlus/modules/myworks/directives/workItemContent', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.directive('workItemContent', [
        'SeedModules.AngularUI/modules/services/requestService',
        function (requestService) {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: '/SeedModules.MindPlus/modules/myworks/templates/workItemContent.html',
                scope: { workItem: '=workItemContent' },
                link: function (scope, element, attrs, ctl) {
                    scope.status = 'loading';
                    scope.load = function () {
                        requestService.url('/api/mindplus/workitem/' + scope.workItem.id + '/content').options({ showLoading: false }).get().result.then(function (result) {
                            if (result.content && result.content !== '') {
                                scope.status = 'show';
                            } else {
                                scope.status = 'new';
                            }
                        });
                    };
                    scope.editContent = function () {
                        scope.status = 'editing';
                    };
                    scope.$on('spyscrolled', function (evt) {
                    });
                }
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/home', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/myworks/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var Controller = function () {
        function Controller($scope, $state, $window, utility, popupService, requestService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$window = $window;
            this.utility = utility;
            this.popupService = popupService;
            this.requestService = requestService;
            $scope.vm = this;
            $scope.globalSearching = false;
            $scope.menus = [
                {
                    icon: 'fas fa-briefcase',
                    text: '工作',
                    children: [
                        {
                            text: '我的工作',
                            state: 'home.works',
                            stateParams: { parentid: '' }
                        },
                        { text: '已关注' },
                        { text: '全部' }
                    ]
                },
                {
                    icon: 'fas fa-list-ul',
                    text: '工作项',
                    children: [
                        { text: '我的工作项' },
                        { text: '已关注' },
                        { text: '全部' }
                    ]
                },
                {
                    icon: 'fas fa-clipboard-list',
                    text: '工作模板'
                },
                {
                    icon: 'fas fa-cog',
                    text: '设置'
                },
                {
                    icon: 'fas fa-trash-alt',
                    text: '回收站',
                    state: 'home.trash'
                }
            ];
        }
        Controller.prototype.menuClicked = function (item) {
            if (item.state)
                this.$state.go(item.state, item.stateParamse || {});
        };
        Controller.prototype.blurSearch = function () {
            this.$scope.globalSearching = false;
        };
        Controller.prototype.focusSearch = function () {
            this.$scope.globalSearching = true;
        };
        Controller.prototype.logout = function () {
            var _this = this;
            this.popupService.confirm('是否退出\uFF1F').ok(function () {
                _this.requestService.url('/api/account/logout').options({ dataOnly: true }).post().result.then(function () {
                    _this.$window.location.reload();
                });
            });
        };
        Controller.$inject = [
            '$scope',
            '$state',
            '$window',
            'SeedModules.AngularUI/modules/services/utility',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return Controller;
    }();
    mod.controller('SeedModules.MindPlus/modules/myworks/controllers/home', Controller);
});
define('SeedModules.MindPlus/modules/myworks/controllers/mymind', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/mymind', [
        '$appEnvironment',
        function ($appEnvironment) {
            $appEnvironment.currentWork = null;
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/works', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/works', [
        '$scope',
        '$modal',
        '$state',
        '$stateParams',
        '$appConfig',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $modal, $state, $stateParams, $appConfig, popupService, requestService, ngTableRequest, schemaFormParams) {
            $scope.$appConfig = $appConfig;
            $scope.tableParams = new ngTableRequest({
                url: '/api/mindplus/works/query?parent=' + $stateParams.parentid,
                showLoading: false
            }).ngTableParams();
            $scope.formParams = new schemaFormParams().properties({
                name: {
                    title: '名称',
                    type: 'string',
                    required: true
                },
                description: {
                    title: '描述',
                    type: 'string'
                }
            });
            $scope.form = [
                'name',
                {
                    key: 'description',
                    type: 'textarea',
                    placeholder: '描述信息'
                }
            ];
            $scope.create = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '新建项目',
                        formParams: $scope.formParams,
                        form: $scope.form,
                        model: {}
                    }
                }).result.then(function (data) {
                    data.parentId = $stateParams.parentid;
                    requestService.url('/api/mindplus/works').post(data).result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
            $scope.addfolder = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '新建文件夹',
                        formParams: $scope.formParams,
                        form: ['name'],
                        model: {}
                    }
                }).result.then(function (data) {
                    data.isFolder = true;
                    data.parentId = $stateParams.parentid;
                    requestService.url('/api/mindplus/works').post(data).result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
            $scope.back = function () {
                requestService.url('/api/mindplus/works/' + $stateParams.parentid).options({ showLoading: false }).get().result.then(function (result) {
                    $state.go('home.works', { parentid: result.parentId });
                });
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/trash', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/trash', [
        '$scope',
        function ($scope) {
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/workspace', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/workspace', [
        '$scope',
        '$modal',
        '$state',
        '$stateParams',
        '$appConfig',
        '$appEnvironment',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $modal, $state, $stateParams, $appConfig, $appEnvironment, popupService, requestService, ngTableRequest, schemaFormParams) {
            $scope.current = null;
            $scope.workMenu = [
                {
                    text: '任务',
                    icon: 'fas fa-tasks fa-fw',
                    children: [
                        {
                            icon: 'fas fa-fw',
                            text: '脑图',
                            itemClicked: function (item) {
                                window.location.href = $appConfig.siteSettings.prefix + '/SeedModules.MindPlus/Home/Mind#/mindeditor/' + $stateParams.id;
                            }
                        },
                        {
                            icon: 'fas fa-fw',
                            text: '任务列表',
                            itemClicked: function () {
                                $state.go('workspace.list', { id: $stateParams.id });
                            }
                        },
                        {
                            icon: 'fas fa-fw',
                            text: '任务板'
                        },
                        {
                            icon: 'fas fa-fw',
                            text: '进度'
                        }
                    ]
                },
                {
                    text: '设置',
                    icon: 'fas fa-cogs fa-fw',
                    children: [
                        {
                            icon: 'fas fa-fw',
                            text: '任务设置',
                            itemClicked: function () {
                                $state.go('workspace.settings', { id: $stateParams.id });
                            }
                        },
                        {
                            icon: 'fas fa-fw',
                            text: '标签设置',
                            itemClicked: function () {
                                $state.go('workspace.tags', { id: $stateParams.id });
                            }
                        }
                    ]
                }
            ];
            $scope.load = function () {
                requestService.url('/api/mindplus/works/' + $stateParams.id).options({ showLoading: false }).get().result.then(function (result) {
                    $scope.current = result;
                    $appEnvironment.currentWork = result;
                });
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/workItem', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/workItem', [
        '$scope',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, requestService, schemaFormParams) {
            $scope.formParams = new schemaFormParams().properties({
                title: {
                    title: '任务名称',
                    type: 'string',
                    required: true
                }
            });
            $scope.formFields = [{
                    key: 'title',
                    placeholder: '输入任务名称'
                }];
            $scope.works = [];
            $scope.queryCities = [
                {
                    value: 1,
                    text: 'Amsterdam',
                    continent: 'Europe'
                },
                {
                    value: 4,
                    text: 'Washington',
                    continent: 'America'
                },
                {
                    value: 7,
                    text: 'Sydney',
                    continent: 'Australia'
                },
                {
                    value: 10,
                    text: 'Beijing',
                    continent: 'Asia'
                },
                {
                    value: 13,
                    text: 'Cairo',
                    continent: 'Africa'
                }
            ];
            $scope.loadWorks = function (item) {
                if (item && item.children && item.children.length > 0)
                    return;
                if (!item && $scope.works.length > 0)
                    return;
                requestService.url('/api/mindplus/works/tree?parent=' + (item ? item.id : '')).options({ showLoading: false }).get().result.then(function (result) {
                    for (var idx in result) {
                        result[idx].children = result[idx].isFolder ? [] : null;
                    }
                    if (item) {
                        item.children = result;
                    } else {
                        $scope.works = result;
                    }
                });
            };
            $scope.workSelected = function (item) {
                $scope.$data.work = item;
            };
            $scope.submit = function () {
                $scope.$data.model.mindWorkId = $scope.$data.work.id;
                $scope.$close($scope.$data.model);
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/workItems', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/workItems', [
        '$scope',
        '$stateParams',
        '$modal',
        '$appEnvironment',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/services/utility',
        function ($scope, $stateParams, $modal, $appEnvironment, requestService, utility) {
            $scope.list = [];
            $scope.finished = null;
            $scope.initWorkItem = function (item) {
                item.titleStyle = { 'padding-left': ((item.level || 1) - 1) * 30 + 'px' };
            };
            $scope.load = function () {
                requestService.url('/api/mindplus/workitem/inwork/' + $stateParams.id + '?keyword=' + ($scope.finished !== null ? '&finished=' + $scope.finished : '')).options({ showLoading: false }).get().result.then(function (result) {
                    utility.toTree(result).key('id').parentKey('parentId').onEach(function (idx, item) {
                        item.$$isExpand = true;
                    }).then(function (tree) {
                        $scope.list = tree;
                    });
                });
            };
            $scope.create = function () {
                $modal.open({
                    templateUrl: '/SeedModules.MindPlus/modules/myworks/views/workItem.html',
                    size: 'lg',
                    data: {
                        title: '新建任务',
                        model: {},
                        work: $appEnvironment.currentWork
                    }
                }).result.then(function (data) {
                    requestService.url('/api/mindplus/workitem').post(data).result.then(function (result) {
                        $scope.load();
                    });
                });
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/settings', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/settings', [
        '$scope',
        function ($scope) {
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/controllers/tags', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/tags', [
        '$scope',
        '$stateParams',
        '$modal',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $stateParams, $modal, popupService, requestService, ngTableRequest, schemaFormParams) {
            $scope.list = [];
            var formParams = new schemaFormParams().properties({
                name: {
                    title: '名称',
                    type: 'string',
                    required: true
                },
                color: {
                    title: '颜色',
                    type: 'string',
                    required: true
                }
            });
            var form = [
                'name',
                {
                    key: 'color',
                    type: 'simplecolor'
                }
            ];
            $scope.load = function () {
                requestService.url('/api/mindplus/tags/query').options({ showLoading: false }).post({}).result.then(function (result) {
                    $scope.list = result;
                });
            };
            $scope.create = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    data: {
                        title: '新建标签',
                        formParams: formParams,
                        form: form,
                        model: {}
                    }
                }).result.then(function (data) {
                    requestService.url('/api/mindplus/tags').post($.extend(data, { mindWorkId: $stateParams.id })).result.then(function (result) {
                        $scope.load();
                    });
                });
            };
            $scope.edit = function (row) {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    data: {
                        title: '编辑标签',
                        formParams: formParams,
                        form: form,
                        model: $.extend({}, row)
                    }
                }).result.then(function (data) {
                    requestService.url('/api/mindplus/tags/' + row.id).put($.extend(data, { mindWorkId: $stateParams.id })).result.then(function (result) {
                        $scope.load();
                    });
                });
            };
            $scope.drop = function (row) {
                popupService.confirm('是否删除标签\uFF1F').ok(function () {
                    requestService.url('/api/mindplus/tags/' + row.id).drop().result.then(function (result) {
                        $scope.load();
                    });
                });
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/components/work/work', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/components/work/work', [
        '$scope',
        '$state',
        '$stateParams',
        '$modal',
        'SeedModules.AngularUI/modules/services/requestService',
        function ($scope, $state, $stateParams, $modal, requestService) {
            $scope.current = null;
            $scope.loadDetails = function () {
                requestService.url('/api/mindplus/works/' + $stateParams.id).options({ showLoading: false }).get().result.then(function (result) {
                    $scope.current = result;
                });
            };
            $scope.settings = function () {
                $modal.open({ templateUrl: '/SeedModules.MindPlus/modules/myworks/components/work/workSettings.html' });
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/components/workitem/master', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/components/workitem/master', [
        '$scope',
        '$state',
        '$stateParams',
        '$modal',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $state, $stateParams, $modal, popupService, requestService, schemaFormParams) {
            $scope.status = [];
            $scope.workitems = [];
            $scope.views = {
                'home.work.workitems.board': {
                    state: 'home.work.workitems.board',
                    text: '看板视图',
                    icon: 'glyphicon glyphicon-blackboard'
                },
                'home.work.workitems.mind': {
                    state: 'home.work.workitems.mind',
                    text: '脑图',
                    icon: 'glyphicon glyphicon-cloud'
                },
                'home.work.workitems.document': {
                    state: 'home.work.workitems.document',
                    text: '文档视图',
                    icon: 'glyphicon glyphicon-file'
                },
                'home.work.workitems.gantt': {
                    state: 'home.work.workitems.gantt',
                    text: '甘特图',
                    icon: 'glyphicon glyphicon-tasks'
                }
            };
            $scope.loadWorkItems = function () {
                requestService.url('/api/mindplus/workitem/inwork/' + $stateParams.id + '?keyword=' + ($scope.finished !== null ? '&finished=' + $scope.finished : '')).options({ showLoading: false }).get().result.then(function (result) {
                    $scope.workitems = result;
                });
            };
            $scope.createWorkItem = function () {
                $modal.open({
                    templateUrl: '/SeedModules.MindPlus/modules/myworks/views/workItem.html',
                    size: 'lg',
                    data: {
                        title: '新建任务',
                        model: {},
                        work: $scope.current
                    }
                }).result.then(function (data) {
                    requestService.url('/api/mindplus/workitem').post(data).result.then(function (result) {
                        $scope.loadWorkItems();
                    });
                });
            };
            $scope.loadStatus = function () {
                requestService.url('/api/mindplus/works/' + $stateParams.id + '/status').options({ showLoading: false }).get().result.then(function (result) {
                    $scope.status = result;
                });
            };
            $scope.addStatus = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '添加状态',
                        formParams: new schemaFormParams().properties({
                            name: {
                                title: '状态名称',
                                type: 'string',
                                required: true
                            }
                        }),
                        form: ['name']
                    },
                    size: 'sm'
                }).result.then(function (data) {
                    requestService.url('/api/mindplus/works/' + $stateParams.id + '/status').post(data).result.then(function (result) {
                        $scope.loadStatus();
                    });
                });
            };
            $scope.editStatus = function (item) {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '编辑状态',
                        formParams: new schemaFormParams().properties({
                            name: {
                                title: '状态名称',
                                type: 'string',
                                required: true
                            }
                        }),
                        model: $.extend({}, item),
                        form: ['name']
                    },
                    size: 'sm'
                }).result.then(function (data) {
                    requestService.url('/api/mindplus/works/status').put(data).result.then(function (result) {
                        $scope.loadStatus();
                    });
                });
            };
            $scope.deleteStatus = function (item) {
                popupService.confirm('是否删除\uFF1F').ok(function () {
                    requestService.url('/api/mindplus/works/status/' + item.id).drop().result.then(function (result) {
                        $scope.loadStatus();
                    });
                });
            };
            $scope.expand = function (all) {
                $scope.$broadcast('expandWorkItem', all);
            };
            $scope.reduce = function () {
                $scope.$broadcast('reduceWorkItem', null);
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/components/workitem/document', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/myworks/module',
    'pell',
    'rcss!/SeedModules.MindPlus/js/pell/pell.min.css'
], function (require, exports, mod, pell_1) {
    'use strict';
    exports.__esModule = true;
    var ControllerClass = function () {
        function ControllerClass($scope, $element, $timeout, popupService, utility, requestService) {
            this.$scope = $scope;
            this.$element = $element;
            this.$timeout = $timeout;
            this.popupService = popupService;
            this.utility = utility;
            this.requestService = requestService;
            pell_1.init({
                element: $element.find('[pell-area]').get(0),
                defaultParagraphSeparator: 'div',
                styleWithCSS: false,
                onChange: function (html) {
                },
                actions: [],
                classes: {
                    actionbar: 'pell-actionbar',
                    button: 'pell-button',
                    content: 'pell-content',
                    selected: 'pell-button-selected'
                }
            });
        }
        ControllerClass.$inject = [
            '$scope',
            '$element',
            '$timeout',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/utility',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return ControllerClass;
    }();
    mod.controller('SeedModules.MindPlus/modules/myworks/components/workitem/document', ControllerClass);
});
define('SeedModules.MindPlus/modules/myworks/components/workitem/board', ['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/components/workitem/board', [
        '$scope',
        '$state',
        '$stateParams',
        'SeedModules.AngularUI/modules/services/requestService',
        function ($scope, $state, $stateParams, requestService) {
        }
    ]);
});
define('SeedModules.MindPlus/modules/myworks/requires', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/myworks/directives/sidebar',
    'SeedModules.MindPlus/modules/myworks/directives/workItemContent',
    'SeedModules.MindPlus/modules/myworks/controllers/home',
    'SeedModules.MindPlus/modules/myworks/controllers/mymind',
    'SeedModules.MindPlus/modules/myworks/controllers/works',
    'SeedModules.MindPlus/modules/myworks/controllers/trash',
    'SeedModules.MindPlus/modules/myworks/controllers/workspace',
    'SeedModules.MindPlus/modules/myworks/controllers/workItem',
    'SeedModules.MindPlus/modules/myworks/controllers/workItems',
    'SeedModules.MindPlus/modules/myworks/controllers/settings',
    'SeedModules.MindPlus/modules/myworks/controllers/tags',
    'SeedModules.MindPlus/modules/myworks/components/work/work',
    'SeedModules.MindPlus/modules/myworks/components/workitem/master',
    'SeedModules.MindPlus/modules/myworks/components/workitem/document',
    'SeedModules.MindPlus/modules/myworks/components/workitem/board'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});