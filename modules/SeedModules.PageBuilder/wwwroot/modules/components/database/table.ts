import mod = require('SeedModules.PageBuilder/modules/module');
import angular = require('angular');
import { BuilderDefineTypes } from 'SeedModules.PageBuilder/modules/configs/enums';
import { tableform } from 'SeedModules.PageBuilder/modules/components/database/forms';

class ControllerClass {
  static $inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$modal',
    'app/services/popupService',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(
    private $scope,
    private $rootScope: ng.IRootScopeService,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService,
    private requestService: AngularUI.services.IRequestService,
    private schemaFormParams
  ) {
    $scope.vm = this;
    $scope.list = [];
  }

  load() {
    this.requestService
      .url('/api/pagebuilder/define/' + BuilderDefineTypes.表)
      .get()
      .result.then(result => {
        this.$scope.list = result;
      });
  }

  add() {
    this.$modal
      .open({
        templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '新建表',
              model: {}
            },
            tableform(new this.schemaFormParams())
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        this.requestService
          .url('/api/pagebuilder/define')
          .put({
            type: BuilderDefineTypes.表,
            properties: data
          })
          .result.then(result => {
            this.load();
          });
      });
  }

  edit(row) {
    this.$modal
      .open({
        templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '编辑表',
              model: $.extend({}, row.properties)
            },
            tableform(new this.schemaFormParams())
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        this.requestService
          .url('/api/pagebuilder/define')
          .put({
            id: row.id,
            type: BuilderDefineTypes.表,
            properties: data
          })
          .result.then(result => {
            this.load();
          });
      });
  }

  drop(row) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/pagebuilder/define/' + row.id)
        .drop()
        .result.then(result => {
          this.load();
        });
    });
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/database/table',
  ControllerClass
);
