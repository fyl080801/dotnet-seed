import mod = require('SeedModules.AngularUI/modules/module');
import 'SeedModules.AngularUI/modules/factories/ngTableColumn';
import 'SeedModules.AngularUI/modules/factories/ngTableEventsChannel';
import 'SeedModules.AngularUI/modules/factories/ngTableGetDataBcShim';
import 'SeedModules.AngularUI/modules/factories/ngTableParams';
import 'SeedModules.AngularUI/modules/factories/ngTableRequest';
import { schemaFormParamsFactory } from 'SeedModules.AngularUI/modules/factories/schemaFormParams';
import 'SeedModules.AngularUI/modules/factories/delayTimer';
import 'SeedModules.AngularUI/modules/services/requestService';
import 'SeedModules.AngularUI/modules/services/utility';
import 'SeedModules.AngularUI/modules/directives/triggerInput';
import 'SeedModules.AngularUI/modules/directives/ajaxForm';
import 'SeedModules.AngularUI/modules/directives/fileInput';
import 'SeedModules.AngularUI/modules/directives/sfCompare';
import 'SeedModules.AngularUI/modules/directives/ngPager';
import 'SeedModules.AngularUI/modules/directives/ngTable';
import 'SeedModules.AngularUI/modules/directives/ngTableDynamic';
import 'SeedModules.AngularUI/modules/directives/ngTablePagination';
import 'SeedModules.AngularUI/modules/directives/ngTableSorterRow';
import 'SeedModules.AngularUI/modules/directives/ngTree';
import 'SeedModules.AngularUI/modules/directives/stopPropagation';
import 'SeedModules.AngularUI/modules/directives/tagInput';
import 'SeedModules.AngularUI/modules/directives/tenantHref';
import 'SeedModules.AngularUI/modules/directives/scrollspy';
import 'SeedModules.AngularUI/modules/filters/booleanText';
import 'SeedModules.AngularUI/modules/controllers/ngTable';
import 'SeedModules.AngularUI/modules/controllers/ngTableSorterRow';

mod.factory(
  'SeedModules.AngularUI/modules/factories/schemaFormParams',
  schemaFormParamsFactory
);
