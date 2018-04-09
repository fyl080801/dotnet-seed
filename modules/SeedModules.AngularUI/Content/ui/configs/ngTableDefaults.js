define(['SeedModules.AngularUI/modules/configs'], function(configs) {
  'use strict';

  var settings = JSON.parse(
    document.getElementById('seed-ui').getAttribute('data-site')
  );

  configs.value('SeedModules.AngularUI/modules/configs/ngTableDefaults', {
    params: {
      count: settings.pageSize
    },
    settings: {
      counts: settings.pageCounts.split(/[,?]/)
    }
  });
});
