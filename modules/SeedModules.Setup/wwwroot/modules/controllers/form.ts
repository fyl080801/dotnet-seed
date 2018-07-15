import mod = require('SeedModules.Setup/modules/module');

class Controller {
  selectProject() {
    this.$scope.projectFile.open();
  }

  initMsSql() {
    this.$scope.mssql.Server = '.';
    this.$scope.mssql.Username = 'sa';
    this.$scope.mssql.Database = 'seeddb';
    this.$scope.mssql.Password = 'qazwsxedc';
  }

  initMySql() {
    this.$scope.mysql.Server = 'localhost';
    this.$scope.mysql.Username = 'root';
    this.$scope.mysql.Database = 'seeddb';
    this.$scope.mysql.Password = '!QAZ2wsx';
    this.$scope.mysql.Port = 3306;
  }

  install() {
    switch (this.$scope.data.DatabaseProvider) {
      case 'SqlConnection':
        this.$scope.data.ConnectionString =
          'Data Source=' +
          this.$scope.mssql.Server +
          ';Initial Catalog=' +
          this.$scope.mssql.Database +
          ';User ID=' +
          this.$scope.mssql.Username +
          ';Password=' +
          this.$scope.mssql.Password +
          ';';
        break;
      case 'MySql': {
        this.$scope.data.ConnectionString =
          'server=' +
          this.$scope.mysql.Server +
          ';database=' +
          this.$scope.mysql.Database +
          ';uid=' +
          this.$scope.mysql.Username +
          ';pwd=' +
          this.$scope.mysql.Password +
          ';';

        if (this.$scope.mysql.Port && this.$scope.mysql.Port !== '') {
          this.$scope.data.ConnectionString =
            this.$scope.data.ConnectionString +
            'port=' +
            this.$scope.mysql.Port +
            ';';
        }

        if (!this.$scope.mysql.Ssl) {
          this.$scope.data.ConnectionString =
            this.$scope.data.ConnectionString + 'SslMode=none;';
        }

        break;
      }
      // case 'Sqlite': {
      //   $scope.data.ConnectionString = $scope.sqlite.Connection;
      //   break;
      // }
      default:
        this.$scope.data.ConnectionString = '';
        break;
    }

    this.$scope.setupForm
      .submit({
        data: {
          DatabaseProvider: this.$scope.data.DatabaseProvider,
          ConnectionString: this.$scope.data.ConnectionString
        }
      })
      .then(result => {
        this.$location.url('/');
        this.$window.location.reload();
      });
  }

  static $inject = [
    '$scope',
    '$modal',
    '$location',
    '$window',
    'app/services/popupService',
    'SeedModules.AngularUI/modules/services/requestService'
  ];
  constructor(
    private $scope,
    private $modal,
    private $location: ng.ILocationService,
    private $window: ng.IWindowService,
    private popupService: app.services.IPopupService,
    private requestService: AngularUI.services.IRequestService
  ) {
    $scope.me = this;

    $scope.setupForm = {
      url: '/api/setup'
    };

    $scope.projectFile = {};

    $scope.mysql = {};

    $scope.mssql = {};

    $scope.sqlite = {};

    $scope.data = {
      Name: 'seed',
      TablePrefix: 'seed',
      UserName: 'admin',
      Email: 'fyl080801@hotmail.com',
      Password: '!QAZ2wsx',
      PasswordConfirmation: '!QAZ2wsx'
    };

    $scope.databaseProviders = [
      {
        Provider: 'SqlConnection',
        Name: 'Microsoft SQLServer'
      },
      {
        Provider: 'MySql',
        Name: 'MySql Database'
      }
      // {
      //   Provider: 'Sqlite',
      //   Name: 'Sqlite'
      // }
    ];

    requestService
      .url('/api/setup')
      .get<any>()
      .result.then(result => {
        $scope.data.Name = result.name ? result.name : $scope.data.Name;
        $scope.data.TablePrefix = result.tablePrefix
          ? result.tablePrefix
          : $scope.data.TablePrefix;
        $scope.data.TenantCreated = result.tenantCreated;
      });
  }
}

mod.controller('SeedModules.Setup/modules/controllers/form', Controller);
