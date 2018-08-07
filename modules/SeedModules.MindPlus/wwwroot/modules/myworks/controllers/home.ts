import mod = require('SeedModules.MindPlus/modules/myworks/module');

class Controller {
  menuClicked(item) {
    if (item.state) this.$state.go(item.state, item.stateParamse || {});
  }

  blurSearch() {
    this.$scope.globalSearching = false;
  }

  focusSearch() {
    this.$scope.globalSearching = true;
  }

  logout() {
    this.popupService.confirm('是否退出？').ok(() => {
      this.requestService
        .url('/api/account/logout')
        .options({
          dataOnly: true
        })
        .post()
        .result.then(() => {
          this.$window.location.reload();
        });
    });
  }

  static $inject = [
    '$scope',
    '$state',
    '$window',
    'SeedModules.AngularUI/modules/services/utility',
    'app/services/popupService',
    'SeedModules.AngularUI/modules/services/requestService'
  ];
  constructor(
    private $scope,
    private $state: ng.ui.IStateService,
    private $window: ng.IWindowService,
    private utility,
    private popupService: app.services.IPopupService,
    private requestService: AngularUI.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.globalSearching = false;

    $scope.menus = [
      {
        icon: 'fas fa-briefcase',
        text: '工作',
        children: [
          {
            text: '我的工作',
            state: 'home.works',
            stateParams: {
              parentid: ''
            }
          },
          {
            text: '已关注'
          },
          {
            text: '全部'
          }
        ]
      },
      {
        icon: 'fas fa-list-ul',
        text: '工作项',
        children: [
          {
            text: '我的工作项'
          },
          {
            text: '已关注'
          },
          {
            text: '全部'
          }
        ]
      },
      {
        icon: 'fas fa-clipboard-list',
        text: '工作模板'
      },
      {
        icon: 'fas fa-cog',
        text: '设置'
      },
      {
        icon: 'fas fa-trash-alt',
        text: '回收站',
        state: 'home.trash'
      }
    ];
  }
}

mod.controller(
  'SeedModules.MindPlus/modules/myworks/controllers/home',
  Controller
);
