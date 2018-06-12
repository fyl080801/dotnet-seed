import mod = require('SeedModules.PageBuilder/modules/module');
import angular = require('angular');
import { SchemaTypes } from 'SeedModules.AngularUI/modules/configs/enums/schemaTypes';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';

interface ISchemaInfo {
  form: Array<AngularUI.SchemaForm.fields.FieldTypes | string>;
  schema: AngularUI.SchemaForm.ISchema;
  options: AngularUI.SchemaForm.IOptions;
  model: any;
}

interface IPageFormScope extends ng.IScope {
  pagename: string;
  editor: ISchemaInfo;
  form: ISchemaInfo;
  field: ISchemaInfo;
  tools: any[];
  toolsConfigs;
  formConfigs;
  pg: PageFormClass;
}

class PageFormClass {
  collapseAll() {
    this.$scope.$broadcast('angular-ui-tree:collapse-all');
  }

  expandAll() {
    this.$scope.$broadcast('angular-ui-tree:expand-all');
  }

  nodeToggle(scope) {
    scope.toggle();
  }

  back() {
    this.$state.go('admin.pagebuilder_page');
  }

  preview() {
    this.$modal.open({
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/preview.html',
      size: 'full',
      windowClass: 'right',
      scope: this.$scope
    });
  }

  static $inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$modal',
    'SeedModules.PageBuilder/modules/providers/toolsBuilder',
    'SeedModules.AngularUI/modules/factories/ngTableParams'
  ];
  constructor(
    private $scope: IPageFormScope,
    private $rootScope: ng.IRootScopeService,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private toolsBuilder: PageBuilder.services.IToolsBuilderService,
    private ngTableParams
  ) {
    $scope.pg = this;

    // 设计器
    $scope.editor = {
      form: [
        {
          type: ExtendFormFields.panel,
          title: 'aaaaaaaaa',
          theme: 'success',
          items: [
            {
              type: ExtendFormFields.container,
              items: [
                {
                  type: ExtendFormFields.row,
                  items: [
                    {
                      type: ExtendFormFields.column,
                      flex: 6,
                      items: [
                        {
                          key: 'source1.lastName',
                          type: DefaultFormTypes.text,
                          title: '姓'
                        }
                      ]
                    },
                    {
                      type: ExtendFormFields.column,
                      flex: 6,
                      items: [
                        {
                          key: 'source1.firstName',
                          type: DefaultFormTypes.text,
                          title: '名'
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'source1.description',
                  type: DefaultFormTypes.text,
                  title: '描述'
                }
              ]
            }
          ]
        },
        {
          type: ExtendFormFields.panel,
          title: '面板2',
          theme: 'info',
          items: [
            {
              type: DefaultFormTypes.section,
              items: [
                {
                  key: 'category',
                  type: 'select',
                  title: '分类'
                }
              ]
            }
          ]
        },
        {
          type: ExtendFormFields.panel,
          title: '表格',
          theme: 'default',
          items: [
            {
              type: ExtendFormFields.navbar,
              theme: 'default',
              htmlClass: 'navbar-static-top',
              items: []
            },
            {
              type: ExtendFormFields.table,
              tableParams: new ngTableParams(),
              tableColumns: [
                { field: 'name', title: '姓名' },
                { field: 'tel', title: '电话' },
                { field: 'mail', title: '邮箱' }
              ]
            }
          ]
        }
      ],
      schema: {
        type: SchemaTypes.object,
        properties: {
          source1: { type: 'object' }
        }
      },
      options: {},
      model: {}
    };

    // 页面属性
    $scope.form = {
      form: [
        {
          key: 'pagename',
          title: '页面名称',
          placeholder: '输入页面名称'
        }
      ],
      schema: {
        type: SchemaTypes.object,
        properties: {
          pagename: {
            type: 'string',
            required: true
          }
        }
      },
      options: {},
      model: {}
    };

    $scope.field = {
      form: [],
      schema: {
        type: 'object',
        properties: {}
      },
      model: {},
      options: {}
    };

    // 设计器选项
    $scope.toolsConfigs = {
      accept: (source, destination, destinationIndex: number) => {
        return false;
      },
      beforeDrop: (eventInfo: AngularUI.tree.ITreeNodeEvent) => {
        console.log(eventInfo.dest);

        return false;
      }
    };

    // 构建工具箱
    $scope.tools = [];

    var tools = toolsBuilder.getTools();
    angular.forEach(tools, (tool, idx) => {
      $scope.tools.push({
        category: idx,
        items: tool
      });
    });
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/pageForm',
  PageFormClass
);
