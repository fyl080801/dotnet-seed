define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var BuilderToolboxController = (function () {
        function BuilderToolboxController($scope, toolsBuilder) {
            this.$scope = $scope;
            this.toolsBuilder = toolsBuilder;
            var self = this;
            $scope.toolsConfigs = {
                beforeDrop: function (eventInfo) {
                    if (eventInfo.dest.nodesScope.$treeScope.$id ===
                        eventInfo.source.nodesScope.$treeScope.$id)
                        return false;
                    var selectedTool = toolsBuilder.getControl(eventInfo.dest.nodesScope && eventInfo.source.nodeScope.item
                        ? eventInfo.source.nodeScope.item.type
                        : null);
                    if (selectedTool) {
                        var destTool = {
                            type: selectedTool.type,
                            title: selectedTool.name,
                            container: selectedTool.container
                                ? selectedTool.container
                                : undefined
                        };
                        if (typeof destTool.container === 'string' &&
                            destTool.container.length > 0) {
                            destTool[destTool.container] = [];
                        }
                        else if (typeof destTool.container === 'boolean' &&
                            destTool.container === true) {
                            destTool.container = 'items';
                            destTool[destTool.container] = [];
                        }
                        else {
                            destTool.key = '_' + destTool.type + '_' + self.uuid(10);
                            $scope.editor.schema.type = 'object';
                            $scope.editor.schema.properties =
                                $scope.editor.schema.properties || {};
                            $scope.editor.schema.properties[destTool.key] = {
                                type: 'string'
                            };
                        }
                        eventInfo.dest.nodesScope.$modelValue.splice(eventInfo.dest.index, 0, destTool);
                    }
                    return false;
                }
            };
            $scope.tools = toolsBuilder.getControls();
        }
        BuilderToolboxController.prototype.uuid = function (len, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++)
                    uuid[i] = chars[0 | (Math.random() * radix)];
            }
            else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | (Math.random() * 16);
                        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        };
        BuilderToolboxController.$inject = [
            '$scope',
            'SeedModules.PageBuilder/modules/providers/toolsBuilder'
        ];
        return BuilderToolboxController;
    }());
    function directive() {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: '/SeedModules.PageBuilder/modules/components/toolbox/builderToolbox.html',
            scope: {
                editor: '='
            },
            controller: BuilderToolboxController
        };
    }
    mod.directive('builderToolbox', directive);
});

//# sourceMappingURL=builderToolbox.js.map
