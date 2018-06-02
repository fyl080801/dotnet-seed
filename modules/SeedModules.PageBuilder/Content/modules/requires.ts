import mod = require('SeedModules.PageBuilder/modules/module');
import BuilderPageController = require('SeedModules.PageBuilder/modules/components/builder/page');
import ServerSettingsController = require('SeedModules.PageBuilder/modules/components/server/settings');

mod
  .controller(
    'SeedModules.PageBuilder/modules/components/builder/page',
    BuilderPageController
  )
  .controller(
    'SeedModules.PageBuilder/modules/components/server/settings',
    ServerSettingsController
  );
