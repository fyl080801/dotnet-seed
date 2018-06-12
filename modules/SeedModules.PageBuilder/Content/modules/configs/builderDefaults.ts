import boot = require('SeedModules.PageBuilder/modules/boot');
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

let defaultTools = {};
let defaultToolFields = {
  基本: []
};

boot
  .constant(
    'SeedModules.PageBuilder/modules/configs/defaultTools',
    defaultTools
  )
  .constant(
    'SeedModules.PageBuilder/modules/configs/defaultToolFields',
    defaultToolFields
  );
