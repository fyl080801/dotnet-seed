define(["require", "exports", "SeedModules.MindPlus/modules/myworks/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
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
                            stateParams: {
                                parentid: ''
                            }
                        },
                        {
                            text: '已关注'
                        },
                        {
                            text: '全部'
                        }
                    ]
                },
                {
                    icon: 'fas fa-list-ul',
                    text: '工作项',
                    children: [
                        {
                            text: '我的工作项'
                        },
                        {
                            text: '已关注'
                        },
                        {
                            text: '全部'
                        }
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
            this.popupService.confirm('是否退出？').ok(function () {
                _this.requestService
                    .url('/api/account/logout')
                    .options({
                    dataOnly: true
                })
                    .post()
                    .result.then(function () {
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
    }());
    mod.controller('SeedModules.MindPlus/modules/myworks/controllers/home', Controller);
});

//# sourceMappingURL=home.js.map
