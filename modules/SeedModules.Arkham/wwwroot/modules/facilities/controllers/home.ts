import mod = require('SeedModules.Arkham/modules/facilities/module');

class Controller {
  static $inject = [
    '$scope',
    '$modal',
    '$q',
    '$timeout',
    'app/services/popupService',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/ngTableRequest',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(
    private $scope: any,
    private $modal,
    private $q,
    private $timeout,
    private popupService,
    private requestService: AngularUI.services.IRequestService,
    private ngTableRequest,
    private schemaFormParams
  ) {
    $scope.$controller = this;

    $scope.search = {
      keyword: ''
    };

    $scope.tableParams = new ngTableRequest({
      // url: '/api/admin/users/query',
      // showLoading: false,
      // data: $scope.search
    }).ngTableParams();
  }

  create() {}

  keywordCallback() {}
}

mod.controller('SeedModules.Arkham/modules/facilities/controllers/home', Controller);
