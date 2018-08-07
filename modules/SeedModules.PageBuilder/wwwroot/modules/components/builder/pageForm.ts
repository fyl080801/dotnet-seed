import mod = require('SeedModules.PageBuilder/modules/module');
import angular = require('angular');
import { SchemaTypes } from 'SeedModules.AngularUI/modules/configs/enums/schemaTypes';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';

interface IPageFormScope extends ng.IScope {
  editor: AngularUI.SchemaForm.ISchemaForm;
  form: AngularUI.SchemaForm.ISchemaForm;
  field: AngularUI.SchemaForm.ISchemaForm;
  pg: PageFormClass;
}

class PageFormClass {
  dropControl(
    scope: AngularUI.tree.ITreeNodeScope<AngularUI.SchemaForm.fields.FieldTypes>
  ) {
    scope.remove();
    if (scope.$modelValue.key) {
      if (scope.$modelValue.key && typeof scope.$modelValue.key === 'string') {
        scope.$modelValue.key = scope.$modelValue.key.split('.');
      }
      var formProperty = this.$scope.editor.schema.properties;
      for (var i = 0; i < scope.$modelValue.key.length; i++) {
        if (i === scope.$modelValue.key.length - 1) {
          delete formProperty[scope.$modelValue.key[i]];
        } else {
          formProperty = formProperty[scope.$modelValue.key[i]].properties;
        }
      }
    }
  }

  editControl(
    scope: AngularUI.tree.ITreeNodeScope<AngularUI.SchemaForm.fields.FieldTypes>
  ) {
    var self = this;
    var form = this.toolsBuilder.getControlProperties(scope.item['type']);
    var fieldSchema: AngularUI.SchemaForm.ISchemaForm = {
      $id: scope.$id,
      form: [],
      schema: {
        type: 'object',
        properties: {
          schema: {
            type: 'object'
          }
        }
      },
      model: scope.item,
      options: {}
    };
    angular.forEach(form, (fields, category) => {
      var categoryPanel = {
        type: DefaultFormTypes.fieldset,
        items: []
      };
      angular.forEach(fields, (field, name) => {
        categoryPanel.items.push(angular.extend({ schema: {} }, field));
      });
      fieldSchema.form.push(categoryPanel);
    });

    this.$scope.field = fieldSchema;
  }

  collapseAll() {
    this.$scope.$broadcast('angular-ui-tree:collapse-all');
  }

  expandAll() {
    this.$scope.$broadcast('angular-ui-tree:expand-all');
  }

  nodeToggle(scope) {
    scope.toggle();
  }

  initControl(item) {
    if (item.items !== undefined) {
      item.container = 'items';
    }
  }

  viewCode() {
    this.$modal.open({
      template:
        '<div><textarea style="width: 100%; height: 400px" ng-model="$data"></textarea></div>',
      scope: angular.extend(this.$rootScope.$new(), {
        $data: JSON.stringify(this.$scope.editor)
      }),
      size: 'lg'
    });
  }

  preview() {
    this.$modal.open({
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/preview.html',
      size: '9',
      windowClass: 'right',
      scope: this.$scope
    });
  }

  back() {
    this.$state.go('admin.pagebuilder_page');
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
    private toolsBuilder: PageBuilder.services.IControlBuilderService,
    private ngTableParams
  ) {
    $scope.pg = this;

    // 页面属性
    $scope.form = {
      form: [
        {
          key: 'pagename',
          title: '页面名称',
          placeholder: '输入页面名称',
          required: true
        }
      ],
      schema: {
        type: SchemaTypes.object,
        properties: {
          pagename: {
            // 必须定义一个type
            type: 'string'
          }
        }
      },
      options: {},
      model: {}
    };

    // 设计器
    $scope.editor = {
      form: [],
      schema: {},
      options: {},
      model: {}
    };

    // 字段
    $scope.field = {
      form: [],
      schema: {},
      model: {},
      options: {}
    };
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/pageForm',
  PageFormClass
);
