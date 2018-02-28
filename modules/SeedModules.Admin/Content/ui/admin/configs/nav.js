define(['SeedModules.Admin/ui/admin/configs'], function(configs) {
  'use strict';

  configs.provider('SeedModules.Admin/ui/admin/configs/nav', [
    function() {
      var me = this;
      var defaultOrder = 65535;
      var navData = [];

      this.add = function(nav) {
        nav.order = nav.order ? nav.order : defaultOrder;
        navData.push(nav);
      };

      this.$get = function() {
        return {
          add: me.add,
          tree: function() {
            navData.sort(orderBy('order'));
            return navData;
          }
        };
      };

      function orderBy(name) {
        if (!name)
          return function() {
            return -1;
          };
        return function(o, p) {
          var a, b;
          if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
              return 0;
            }
            if (typeof a === typeof b) {
              return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
          } else {
            throw '菜单排序异常';
          }
        };
      }
    }
  ]);
});
