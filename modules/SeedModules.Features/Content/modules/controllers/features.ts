import mod = require('SeedModules.Features/modules/module');

interface IFeaturesScope extends ng.IScope {
  keyword: string;
  list: any[];
  requesting: AngularUI.services.IRequestContext<any>;
  features: FeaturesController;
}

class FeaturesController {
  setEnable(feature, enabled) {
    var self = this;
    if (enabled !== undefined) {
      feature.enabled = enabled;
    }
    this.requestService
      .url('/api/features/' + feature.descriptor.id)
      .patch({
        enabled: feature.enabled
      })
      .result.then(function(result) {
        self.load();
      });
  }

  load() {
    var self = this;
    this.$scope.requesting = this.requestService
      .url('/api/features?keyword=' + this.$scope.keyword)
      .options({
        showLoading: false
      })
      .get();

    this.$scope.requesting.result.then(result => {
      self.$scope.list = result.list;
    });
  }

  cancelLoad() {
    if (this.$scope.requesting) {
      this.$scope.requesting.cancel();
    }
  }

  static $inject = [
    '$scope',
    'SeedModules.AngularUI/modules/services/requestService'
  ];
  constructor(
    private $scope: IFeaturesScope,
    private requestService: AngularUI.services.IRequestService
  ) {
    $scope.keyword = '';
    $scope.list = [];
    $scope.features = this;
  }
}

mod.controller(
  'SeedModules.Features/modules/controllers/features',
  FeaturesController
);
