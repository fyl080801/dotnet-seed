define(['SeedModules.AngularUI/ui/configs'], function(configs) {
  'use strict';

  var settings = JSON.parse(
    document.getElementById('seed-ui').getAttribute('data-site')
  );

  configs.value('SeedModules.AngularUI/ui/configs/ngTableDefaults', {
    params: {
      count: settings.pageSize
    },
    settings: {
      counts: settings.pageCounts.split(/[,?]/)
    }
  });
});
