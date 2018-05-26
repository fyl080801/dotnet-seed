import 'SeedModules.Admin/modules/admin/directives/sidebar';
import 'SeedModules.Admin/modules/admin/directives/sidebarNav';
import 'SeedModules.Admin/modules/admin/controllers/admin';
import 'SeedModules.Admin/modules/admin/controllers/dashboard';
import 'SeedModules.Admin/modules/admin/controllers/users';
import 'SeedModules.Admin/modules/admin/controllers/roles';
import 'SeedModules.Admin/modules/admin/controllers/members';
import admin = require('SeedModules.Admin/modules/admin/module');
import { SettingsController } from 'SeedModules.Admin/modules/admin/controllers/settings';

admin.controller(
  'SeedModules.Admin/modules/admin/controllers/settings',
  SettingsController
);
