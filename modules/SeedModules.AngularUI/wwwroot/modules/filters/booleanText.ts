import mod = require('SeedModules.AngularUI/modules/module');

mod.filter('booleanText', [
  () => {
    return val => {
      if (
        val === undefined ||
        val === null ||
        val === 0 ||
        val === false ||
        val === 'false' ||
        val === 'False'
      ) {
        return '否';
      } else {
        return '是';
      }
    };
  }
]);
