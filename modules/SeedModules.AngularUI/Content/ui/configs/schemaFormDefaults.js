define(['SeedModules.AngularUI/ui/configs'], function(configs) {
  'use strict';

  configs.value('SeedModules.AngularUI/ui/configs/schemaFormDefaults', {
    schema: {},
    options: {
      validateOnRender: true,
      validationMessage: {
        0: '错误的类型: {{schema.type}} (应为 {{form.type}})',
        302: '{{title}} 不可为空',
        200: '字符串太短 (当前 {{viewValue.length}} 个字), 最小 {{schema.minLength}}'
      }
    }
  });
});
