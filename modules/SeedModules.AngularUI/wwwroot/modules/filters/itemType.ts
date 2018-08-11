import mod = require('SeedModules.AngularUI/modules/module');

function filter() {
  return (val: object, type: string) => {
    var result = {};
    $.each(val, (name, val) => {
      if (typeof val === type) {
        result[name] = val;
      }
    });
    return result;
  };
}

mod.filter('itemType', filter);
