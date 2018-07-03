define('modules/sample/components/home', [
    'require',
    'exports',
    'modules/sample/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var HomeController = function () {
        function HomeController($scope) {
            this.$scope = $scope;
            $scope['text'] = 'aaaaaaa';
        }
        HomeController.$inject = ['$scope'];
        return HomeController;
    }();
    mod.controller('modules/sample/components/home', HomeController);
});
define('modules/sample/components/jexcel', [
    'require',
    'exports',
    'modules/sample/module',
    'jquery',
    'jquery.jexcel'
], function (require, exports, mod, $) {
    'use strict';
    exports.__esModule = true;
    var CellType;
    (function (CellType) {
        CellType['实时'] = 'real';
        CellType['日'] = 'day';
        CellType['月'] = 'month';
        CellType['年'] = 'year';
        CellType['公式'] = 'exp';
    }(CellType || (CellType = {})));
    var Controller = function () {
        function Controller($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            $scope.vm = this;
            $scope.data = [[
                    {
                        text: 'Furnace',
                        'tag:': 'kV',
                        type: CellType.实时,
                        value: '',
                        unit: '',
                        fun: function (data) {
                        }
                    },
                    {
                        text: 'Furnace1',
                        'tag:': 'kV1',
                        type: CellType.实时,
                        value: '',
                        unit: '',
                        fun: function (data) {
                        }
                    }
                ]];
            $scope.datatext = JSON.stringify($scope.data);
            this.table = $('#mytable');
            this.table.jexcel({ data: $scope.data });
        }
        Controller.prototype.update = function () {
            try {
                this.$scope.data = eval(this.$scope.datatext);
                this.table.jexcel('setData', this.$scope.data, false);
            } catch (e) {
                console.error(e);
            }
        };
        Controller.$inject = [
            '$scope',
            '$element'
        ];
        return Controller;
    }();
    mod.controller('modules/sample/components/jexcel', Controller);
});
define('modules/sample/controllers/index', [
    'require',
    'exports',
    'modules/sample/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var Controller = function () {
        function Controller() {
        }
        return Controller;
    }();
    mod.controller('modules/sample/controllers/index', Controller);
});
define('modules/sample/requires', [
    'require',
    'exports',
    'modules/sample/components/home',
    'modules/sample/components/jexcel',
    'modules/sample/controllers/index'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});