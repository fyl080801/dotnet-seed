import boot = require('SeedModules.AngularUI/modules/boot');

class NgTableDefaultGetDataProvider implements ng.IServiceProvider {
  /**
   * @ngdoc service
   * @name ngTableDefaultGetData
   * @description A default implementation of the getData function that will apply the `filter`, `orderBy` and
   * paging values from the `ngTableParams` instance supplied to the data array supplied.
   *
   * The outcome will be to return the resulting array and to assign the total item count after filtering
   * to the `total` of the `ngTableParams` instance supplied
   */
  $get($filter) {
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
      var pagedData = orderedData.slice(
        (params.page() - 1) * params.count(),
        params.page() * params.count()
      );
      params.total(orderedData.length); // set total for recalc pagination
      return pagedData;
    }
  }

  private filterFilterName = 'filter';
  private sortingFilterName = 'orderBy';
  constructor() {
    this.$get.$inject = ['$filter'];
  }
}

boot.provider(
  'SeedModules.AngularUI/modules/providers/ngTableDefaultGetData',
  NgTableDefaultGetDataProvider
);
