define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.service('SeedModules.AngularUI/modules/services/utility', [
    '$q',
    '$timeout',
    function($q, $timeout) {
      function convertToTree(data, defer) {
        // 移除原有children和parent
        for (var i = 0; i < data.length; i++) {
          var item1 = data[i];
          delete item1[defer.childrenProperty];
          delete item1.$parent;
        }

        // 将键值映射成键值对
        var map = {};
        for (var j = 0; j < data.length; j++) {
          var item2 = data[j];
          map[item2[defer.keyProperty]] = defer.warp ? { $data: item2 } : item2;
        }

        // 构建树
        var val = [];
        for (var k = 0; k < data.length; k++) {
          var item3 = defer.warp ? { $data: data[k] } : data[k];
          var parent = defer.warp
            ? map[item3.$data[defer.parentKeyProperty]]
            : map[item3[defer.parentKeyProperty]];
          if (parent) {
            item3.$parent = parent;
            (
              parent[defer.childrenProperty] ||
              (parent[defer.childrenProperty] = [])
            ).push(item3);
          } else {
            val.push(item3);
          }
          defer.onEachFunction(k, item3);
        }

        return val;
      }

      function doEachTree(tree, defer) {
        for (var i in tree) {
          defer.onEachFunction(tree[i]);
          if (tree[i][defer.childrenProperty])
            doEachTree(tree[i][defer.childrenProperty], defer);
        }
      }

      this.uid = function() {
        return Date.parse(new Date()) / 1000 + '';
      };

      /**
       * 列表转tree
       * key()-主键, parentKey()-父级字段, children()-children属性
       * @param {*} data
       * @param {*} warp
       */
      this.toTree = function(data, warp) {
        var defer = $q.defer();
        defer.childrenProperty = 'children';
        defer.keyProperty = 'value';
        defer.parentKeyProperty = 'parent';
        defer.warp = warp;
        defer.onEachFunction = function(idx, item) {};
        defer.promise.children = function(property) {
          defer.childrenProperty = property;
          return defer.promise;
        };
        defer.promise.key = function(property) {
          defer.keyProperty = property;
          return defer.promise;
        };
        defer.promise.parentKey = function(property) {
          defer.parentKeyProperty = property;
          return defer.promise;
        };
        defer.promise.onEach = function(fn) {
          if ($.isFunction(fn)) {
            defer.onEachFunction = fn;
          }
          return defer.promise;
        };
        $timeout(function() {
          if (!data) {
            defer.resolve([]);
          } else {
            defer.resolve(convertToTree(data, defer));
          }
        });
        return defer.promise;
      };

      this.eachTree = function(tree) {
        var defer = $q.defer();
        defer.childrenProperty = 'children';

        defer.promise.children = function(property) {
          defer.childrenProperty = property;
          return defer.promise;
        };

        defer.promise.onEach = function(fn) {
          if ($.isFunction(fn)) {
            defer.onEachFunction = fn;
          }
          return defer.promise;
        };

        $timeout(function() {
          defer.resolve(doEachTree(tree, defer));
        });

        return defer.promise;
      };
    }
  ]);
});
