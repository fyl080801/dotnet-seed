define(["require", "exports", "SeedModules.MindPlus/modules/myworks/module", "pell", "rcss!/SeedModules.MindPlus/js/pell/pell.min.css"], function (require, exports, mod, pell_1) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
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
                onChange: function (html) { },
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
    }());
    mod.controller('SeedModules.MindPlus/modules/myworks/components/workitem/document', ControllerClass);
});
//# sourceMappingURL=document.js.map