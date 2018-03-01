define(['SeedModules.AngularUI/ui/providers'], function(module) {
  'use strict';

  module.provider('SeedModules.AngularUI/ui/providers/ngTableDefaultGetData', [
    function() {
      var provider = this;
      provider.$get = ngTableDefaultGetData;
      provider.filterFilterName = 'filter';
      provider.sortingFilterName = 'orderBy';

      ///////////

      ngTableDefaultGetData.$inject = ['$filter'];

      /**
       * @ngdoc service
       * @name ngTableDefaultGetData
       * @description A default implementation of the getData function that will apply the `filter`, `orderBy` and
       * paging values from the `ngTableParams` instance supplied to the data array supplied.
       *
       * The outcome will be to return the resulting array and to assign the total item count after filtering
       * to the `total` of the `ngTableParams` instance supplied
       */
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
          var pagedData = orderedData.slice(
            (params.page() - 1) * params.count(),
            params.page() * params.count()
          );
          params.total(orderedData.length); // set total for recalc pagination
          return pagedData;
        }
      }
    }
  ]);
});
