import boot = require('SeedModules.AngularUI/modules/boot');

var schemaFormDefaults = {
  schema: {},
  options: {
    validateOnRender: true,
    validationMessage: {
      0: '错误的类型: {{schema.type}} (应为 {{form.type}})',
      302: '{{title}} 不可为空',
      101: '值 {{viewValue}} 小于最小值 {{schema.minimum}}',
      103: '值 {{viewValue}} 大于最大值 {{schema.maximum}}',
      200: '字符串太短 (当前 {{viewValue.length}} 个字), 最小 {{schema.minLength}}',
      201: '字符串太长 (当前 {{viewValue.length}} 个字), 最大 {{schema.maxLength}}',
      202: '输入的格式不正确'
    }
  }
};

boot.value(
  'SeedModules.AngularUI/modules/configs/schemaFormDefaults',
  schemaFormDefaults
);
