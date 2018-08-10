import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

// 表
export var tableform = schemaFormParams => {
  return {
    formParams: schemaFormParams.properties({
      name: {
        title: '表名',
        type: 'string',
        required: true
      },
      description: {
        title: '说明',
        type: 'string'
      },
      remark: {
        title: '中文名',
        type: 'string'
      }
    }),
    form: [
      {
        type: DefaultFormTypes.section,
        htmlClass: 'row',
        items: [
          {
            type: DefaultFormTypes.section,
            htmlClass: 'col-md-6',
            items: ['name']
          },
          {
            type: DefaultFormTypes.section,
            htmlClass: 'col-md-6',
            items: ['remark']
          }
        ]
      },
      {
        key: 'description',
        type: DefaultFormTypes.textarea
      }
    ]
  };
};
