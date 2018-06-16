import mod = require('SeedModules.PageBuilder/modules/module');
import angular = require('angular');

interface IBuilderToolboxScope extends ng.IScope {
  editor: AngularUI.SchemaForm.ISchemaForm;
  tools: PageBuilder.services.ControlCollection;
  toolsConfigs: AngularUI.tree.ITreeConfig<PageBuilder.services.IControl>;
}

class BuilderToolboxController {
  private uuid(len?, radix?) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
      ''
    );
    var uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  }

  static $inject = [
    '$scope',
    'SeedModules.PageBuilder/modules/providers/toolsBuilder'
  ];
  constructor(
    private $scope: IBuilderToolboxScope,
    private toolsBuilder: PageBuilder.services.IControlBuilderService
  ) {
    var self = this;
    // 设计器选项
    $scope.toolsConfigs = {
      beforeDrop: (
        eventInfo: AngularUI.tree.IEventInfo<PageBuilder.services.IControl>
      ) => {
        // 判断当前目标是否不是工具箱
        if (
          eventInfo.dest.nodesScope.$treeScope.$id ===
          eventInfo.source.nodesScope.$treeScope.$id
        )
          return false;

        // 找到工具箱控件
        var selectedTool = toolsBuilder.getControl(
          eventInfo.dest.nodesScope && eventInfo.source.nodeScope.item
            ? eventInfo.source.nodeScope.item.type
            : null
        );

        // 实际将控件添加到设计器
        if (selectedTool) {
          var destTool: AngularUI.SchemaForm.fields.FieldTypes = {
            type: selectedTool.type,
            container: selectedTool.container
              ? selectedTool.container
              : undefined
          };

          // 判断是否是容器
          if (
            typeof destTool.container === 'string' &&
            destTool.container.length > 0
          ) {
            destTool[destTool.container] = [];
          } else if (
            typeof destTool.container === 'boolean' &&
            destTool.container === true
          ) {
            destTool.container = 'items';
            destTool[destTool.container] = [];
          } else {
            destTool.key = '_' + destTool.type + '_' + self.uuid(10);
            $scope.editor.schema.type = 'object';
            $scope.editor.schema.properties =
              $scope.editor.schema.properties || {};
            $scope.editor.schema.properties[destTool.key] = {};
          }

          eventInfo.dest.nodesScope.$modelValue.splice(
            eventInfo.dest.index,
            0,
            destTool
          );
        }
        return false;
      }
    };

    // 构建工具箱
    $scope.tools = toolsBuilder.getControls();
  }
}

function directive(): ng.IDirective {
  return {
    replace: true,
    restrict: 'EA',
    templateUrl:
      '/SeedModules.PageBuilder/modules/components/toolbox/builderToolbox.html',
    scope: {
      editor: '='
    },
    controller: BuilderToolboxController
  };
}

mod.directive('builderToolbox', directive);
