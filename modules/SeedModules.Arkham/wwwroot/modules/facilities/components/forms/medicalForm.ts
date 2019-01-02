const medicalSchema = {
  lastName: {
    title: '姓',
    type: 'string',
    required: false
  },
  firstName: {
    title: '名',
    type: 'string',
    required: false
  },
  nativePlace: {
    title: '籍贯',
    type: 'string',
    required: false
  },
  birthday: {
    title: '出生年月',
    type: 'string',
    required: false
  },
  sex: {
    title: '性别',
    type: 'boolean',
    required: false
  },
  nation: {
    title: '国家',
    type: 'string',
    required: false
  },
  nationality: {
    title: '国籍',
    type: 'string',
    required: false
  },
  homePlace: {
    title: '祖籍',
    type: 'string',
    required: false
  },
  bloodGroup: {
    title: '血型',
    type: 'number',
    required: false
  },
  rH: {
    title: 'RH',
    type: 'number',
    required: false
  },
  idType: {
    title: '证件类型',
    type: 'number',
    required: false
  },
  IdNumber: {
    title: '证件号',
    type: 'string',
    required: false
  },
  occupation: {
    title: '职业',
    type: 'string',
    required: false
  },
  marriageStatus: {
    title: '婚姻状况',
    type: 'string',
    required: false
  },
  leavePlace: {
    title: '居住地',
    type: 'string',
    required: false
  },
  LeaveZipCode: {
    title: '居住地邮编',
    type: 'string',
    required: false
  },
  registeredPlace: {
    title: '户口所在地',
    type: 'string',
    required: false
  },
  registeredZipCode: {
    title: '户口所在地邮编',
    type: 'string',
    required: false
  }
};

const medicalForm = [
  {
    type: 'section',
    htmlClass: 'row',
    items: [
      {
        type: 'section',
        htmlClass: 'col-md-6',
        items: [
          {
            type: 'section',
            htmlClass: 'row',
            items: [
              {
                type: 'section',
                htmlClass: 'col-md-6',
                items: ['lastName']
              },
              {
                type: 'section',
                htmlClass: 'col-md-6',
                items: ['firstName']
              }
            ]
          }
        ]
      }
      // 下一列
    ]
  },
  {
    type: 'section',
    htmlClass: 'row',
    items: [
      {
        type: 'section',
        htmlClass: 'col-md-6',
        items: ['leavePlace']
      },
      {
        type: 'section',
        htmlClass: 'col-md-6',
        items: ['registeredPlace']
      }
    ]
  }
];

export default { medicalSchema, medicalForm };
