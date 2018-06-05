import boot = require('SeedModules.PageBuilder/modules/boot');

let defaultTools = {
  布局: [
    {
      name: '行'
    }
  ]
};

boot.constant(
  'SeedModules.PageBuilder/modules/configs/defaultTools',
  defaultTools
);
//boot.config(ConfigRouteClass);
