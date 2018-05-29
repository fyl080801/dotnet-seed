import boot = require('SeedModules.AngularUI/modules/boot');

var settings = JSON.parse(
  document.getElementById('seed-ui').getAttribute('data-site')
);

var ngTableDefaults = {
  options: {},
  schema: {},
  params: {
    count: settings.pageSize
  },
  settings: {
    counts: settings.pageCounts.split(/[,?]/)
  }
};

export = ngTableDefaults;

boot.value(
  'SeedModules.AngularUI/modules/configs/ngTableDefaults',
  ngTableDefaults
);
