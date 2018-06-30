define(["require", "exports", "SeedModules.AngularUI/modules/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var NgTableDefaultGetDataProvider = (function () {
        function NgTableDefaultGetDataProvider() {
            this.filterFilterName = 'filter';
            this.sortingFilterName = 'orderBy';
            this.$get.$inject = ['$filter'];
        }
        NgTableDefaultGetDataProvider.prototype.$get = function ($filter) {
            return getData;
            function getData(data, params) {
                if (data == null) {
                    return [];
                }
                var fData = params.hasFilter()
                    ? $filter(this.filterFilterName)(data, params.filter(true))
                    : data;
                var orderBy = params.orderBy();
                var orderedData = orderBy.length
                    ? $filter(this.sortingFilterName)(fData, orderBy)
                    : fData;
                var pagedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                params.total(orderedData.length);
                return pagedData;
            }
        };
        return NgTableDefaultGetDataProvider;
    }());
    boot.provider('SeedModules.AngularUI/modules/providers/ngTableDefaultGetData', NgTableDefaultGetDataProvider);
});

//# sourceMappingURL=ngTableDefaultGetData.js.map
