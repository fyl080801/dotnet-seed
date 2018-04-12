define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.service('SeedModules.AngularUI/modules/services/utility', [
    '$q',
    '$timeout',
    function($q, $timeout) {
      function convertToTree(data, defer) {
        for (var i = 0; i < data.length; i++) {
          var item1 = data[i];
          defer.onEachFunction(i, item1);
          delete item1[defer.childrenProperty];
        }

        var map = {};
        for (var j = 0; j < data.length; j++) {
          var item2 = data[j];
          map[item2[defer.keyProperty]] = item2;
        }

        var val = [];
        for (var k = 0; k < data.length; k++) {
          var item3 = data[k];
          var parent = map[item3[defer.parentKeyProperty]];
          if (parent) {
            (
              parent[defer.childrenProperty] ||
              (parent[defer.childrenProperty] = [])
            ).push(item3);
          } else {
            val.push(item3);
          }
        }

        return val;
      }

      this.uid = function() {
        return Date.parse(new Date()) / 1000 + '';
      };

      /**
       * 列表转tree
       * key()-主键, parentKey()-父级字段, children()-children属性
       * @param {*} data
       */
      this.toTree = function(data) {
        var defer = $q.defer();
        defer.childrenProperty = 'children';
        defer.keyProperty = 'value';
        defer.parentKeyProperty = 'parent';
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
    }
  ]);
});
