define(['SeedModules.Saas/modules/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Saas/modules/controllers/tenants', [
    '$scope',
    '$modal',
    'app.services.popupService',
    'SeedModules.AngularUI/modules/factories/ngTableRequest',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/schemaFormParams',
    function(
      $scope,
      $modal,
      popupService,
      ngTableRequest,
      requestService,
      schemaFormParams
    ) {
      $scope.tableParams = new ngTableRequest({
        url: '/api/tenant',
        showLoading: false
      }).ngTableParams();

      $scope.formParams = new schemaFormParams().properties({
        name: {
          title: '名称',
          type: 'string',
          required: true
        },
        requestUrlPrefix: {
          title: 'Url前缀',
          type: 'string'
        },
        requestUrlHost: {
          title: '主机',
          type: 'string'
        },
        databaseProvider: {
          title: '数据库类型',
          type: 'string',
          required: true
        },
        tablePrefix: {
          title: '表前缀',
          type: 'string',
          required: true
        },
        // mysql
        mySqlConnectionString: {
          title: '连接字符串',
          type: 'string',
          required: true
        },
        // mssql
        mssql_Server: {
          title: '服务地址',
          type: 'string',
          required: true
        },
        mssql_Database: {
          title: '数据库名称',
          type: 'string',
          required: true
        },
        mssql_Username: {
          title: '用户名',
          type: 'string',
          required: true
        },
        mssql_Password: {
          title: '密码',
          type: 'string',
          required: true
        }
      });

      $scope.form = [
        'name',
        {
          type: 'section',
          htmlClass: 'row',
          items: [
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['requestUrlPrefix']
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['requestUrlHost']
            }
          ]
        },
        {
          type: 'section',
          htmlClass: 'row',
          items: [
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: [
                {
                  key: 'databaseProvider',
                  type: 'select',
                  titleMap: [
                    { value: 'SqlConnection', name: 'Microsoft SQLServer' },
                    { value: 'MySql', name: 'MySql Database' }
                  ]
                }
              ]
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['tablePrefix']
            }
          ]
        },
        {
          key: 'mySqlConnectionString',
          condition: "model.databaseProvider==='MySql'"
        },
        {
          type: 'section',
          htmlClass: 'row',
          condition: "model.databaseProvider==='SqlConnection'",
          items: [
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['mssql_Server']
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['mssql_Database']
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['mssql_Username']
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: [
                {
                  key: 'mssql_Password',
                  type: 'password'
                }
              ]
            }
          ]
        }
      ];

      $scope.checkedAll = false;
      $scope.checked = {};

      $scope.checkAll = function() {
        $scope.checkedAll = !$scope.checkedAll;
        if ($scope.checkedAll) {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.name] = true;
          });
        } else {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.name] = false;
          });
        }
      };

      $scope.onCheck = function() {
        $scope.checkedAll = true;
        $.each($scope.tableParams.data, function(idx, item) {
          if (!$scope.checked[item.name]) {
            $scope.checkedAll = false;
            return false;
          }
        });
      };

      $scope.create = function() {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/modules/views/schemaConfirm.html',
            data: {
              title: '租户信息',
              formParams: $scope.formParams,
              form: $scope.form,
              model: {}
            }
          })
          .result.then(function(data) {
            switch (data.databaseProvider) {
              case 'SqlConnection':
                data.connectionString =
                  'Data Source=' +
                  data.mssql_Server +
                  ';Initial Catalog=' +
                  data.mssql_Database +
                  ';User ID=' +
                  data.mssql_Username +
                  ';Password=' +
                  data.mssql_Password +
                  ';';
                break;
              case 'MySql':
                data.connectionString = data.mySqlConnectionString;
                break;
              default:
                data.connectionString = '';
                break;
            }

            requestService
              .url('/api/tenant/info')
              .post(data)
              .then(function(result) {
                $scope.tableParams.reload();
              });
          });
      };

      $scope.drop = function() {
        popupService.confirm('是否删除？').ok(function() {});
      };
    }
  ]);
});
