define(["require", "exports", "SeedModules.AngularUI/modules/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    boot.provider('SeedModules.AngularUI/modules/providers/ngTableDefaultGetData', [
        function () {
            var provider = this;
            provider.$get = ngTableDefaultGetData;
            provider.filterFilterName = 'filter';
            provider.sortingFilterName = 'orderBy';
            ngTableDefaultGetData.$inject = ['$filter'];
            function ngTableDefaultGetData($filter) {
                return getData;
                function getData(data, params) {
                    if (data == null) {
                        return [];
                    }
                    var fData = params.hasFilter()
                        ? $filter(provider.filterFilterName)(data, params.filter(true))
                        : data;
                    var orderBy = params.orderBy();
                    var orderedData = orderBy.length
                        ? $filter(provider.sortingFilterName)(fData, orderBy)
                        : fData;
                    var pagedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    return pagedData;
                }
            }
        }
    ]);
});
//# sourceMappingURL=ngTableDefaultGetData.js.map