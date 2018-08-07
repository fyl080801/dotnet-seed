(function () {
    'use strict';
    angular.module('ui.tree', []).constant('treeConfig', {
        treeClass: 'angular-ui-tree',
        emptyTreeClass: 'angular-ui-tree-empty',
        dropzoneClass: 'angular-ui-tree-dropzone',
        hiddenClass: 'angular-ui-tree-hidden',
        nodesClass: 'angular-ui-tree-nodes',
        nodeClass: 'angular-ui-tree-node',
        handleClass: 'angular-ui-tree-handle',
        placeholderClass: 'angular-ui-tree-placeholder',
        dragClass: 'angular-ui-tree-drag',
        dragThreshold: 3,
        defaultCollapsed: false,
        appendChildOnHover: true
    });
}());
(function () {
    'use strict';
    angular.module('ui.tree').controller('TreeHandleController', [
        '$scope',
        '$element',
        function ($scope, $element) {
            this.scope = $scope;
            $scope.$element = $element;
            $scope.$nodeScope = null;
            $scope.$type = 'uiTreeHandle';
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').controller('TreeNodeController', [
        '$scope',
        '$element',
        function ($scope, $element) {
            this.scope = $scope;
            $scope.$element = $element;
            $scope.$modelValue = null;
            $scope.$parentNodeScope = null;
            $scope.$childNodesScope = null;
            $scope.$parentNodesScope = null;
            $scope.$treeScope = null;
            $scope.$handleScope = null;
            $scope.$type = 'uiTreeNode';
            $scope.$$allowNodeDrop = false;
            $scope.collapsed = false;
            $scope.expandOnHover = false;
            $scope.init = function (controllersArr) {
                var treeNodesCtrl = controllersArr[0];
                $scope.$treeScope = controllersArr[1] ? controllersArr[1].scope : null;
                $scope.$parentNodeScope = treeNodesCtrl.scope.$nodeScope;
                $scope.$modelValue = treeNodesCtrl.scope.$modelValue[$scope.$index];
                $scope.$parentNodesScope = treeNodesCtrl.scope;
                treeNodesCtrl.scope.initSubNode($scope);
                $element.on('$destroy', function () {
                    treeNodesCtrl.scope.destroySubNode($scope);
                });
            };
            $scope.index = function () {
                return $scope.$parentNodesScope.$modelValue.indexOf($scope.$modelValue);
            };
            $scope.dragEnabled = function () {
                return !($scope.$treeScope && !$scope.$treeScope.dragEnabled);
            };
            $scope.isSibling = function (targetNode) {
                return $scope.$parentNodesScope == targetNode.$parentNodesScope;
            };
            $scope.isChild = function (targetNode) {
                var nodes = $scope.childNodes();
                return nodes && nodes.indexOf(targetNode) > -1;
            };
            $scope.prev = function () {
                var index = $scope.index();
                if (index > 0) {
                    return $scope.siblings()[index - 1];
                }
                return null;
            };
            $scope.siblings = function () {
                return $scope.$parentNodesScope.childNodes();
            };
            $scope.childNodesCount = function () {
                return $scope.childNodes() ? $scope.childNodes().length : 0;
            };
            $scope.hasChild = function () {
                return $scope.childNodesCount() > 0;
            };
            $scope.childNodes = function () {
                return $scope.$childNodesScope && $scope.$childNodesScope.$modelValue ? $scope.$childNodesScope.childNodes() : null;
            };
            $scope.accept = function (sourceNode, destIndex) {
                return $scope.$childNodesScope && $scope.$childNodesScope.$modelValue && $scope.$childNodesScope.accept(sourceNode, destIndex);
            };
            $scope.remove = function () {
                return $scope.$parentNodesScope.removeNode($scope);
            };
            $scope.toggle = function () {
                $scope.collapsed = !$scope.collapsed;
                $scope.$treeScope.$callbacks.toggle($scope.collapsed, $scope);
            };
            $scope.collapse = function () {
                $scope.collapsed = true;
            };
            $scope.expand = function () {
                $scope.collapsed = false;
            };
            $scope.depth = function () {
                var parentNode = $scope.$parentNodeScope;
                if (parentNode) {
                    return parentNode.depth() + 1;
                }
                return 1;
            };
            function countSubTreeDepth(scope) {
                if (!scope) {
                    return 0;
                }
                var thisLevelDepth = 0, childNodes = scope.childNodes(), childNode, childDepth, i;
                if (!childNodes || childNodes.length === 0) {
                    return 0;
                }
                for (i = childNodes.length - 1; i >= 0; i--) {
                    childNode = childNodes[i], childDepth = 1 + countSubTreeDepth(childNode);
                    thisLevelDepth = Math.max(thisLevelDepth, childDepth);
                }
                return thisLevelDepth;
            }
            $scope.maxSubDepth = function () {
                return $scope.$childNodesScope ? countSubTreeDepth($scope.$childNodesScope) : 0;
            };
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').controller('TreeNodesController', [
        '$scope',
        '$element',
        '$timeout',
        function ($scope, $element, $timeout) {
            this.scope = $scope;
            $scope.$element = $element;
            $scope.$modelValue = null;
            $scope.$nodeScope = null;
            $scope.$treeScope = null;
            $scope.$type = 'uiTreeNodes';
            $scope.$nodesMap = {};
            $scope.nodropEnabled = false;
            $scope.maxDepth = 0;
            $scope.cloneEnabled = false;
            $scope.initSubNode = function (subNode) {
                if (!subNode.$modelValue) {
                    return null;
                }
                $scope.$nodesMap[subNode.$modelValue.$$hashKey] = subNode;
            };
            $scope.destroySubNode = function (subNode) {
                if (!subNode.$modelValue) {
                    return null;
                }
                $scope.$nodesMap[subNode.$modelValue.$$hashKey] = null;
            };
            $scope.accept = function (sourceNode, destIndex) {
                return $scope.$treeScope.$callbacks.accept(sourceNode, $scope, destIndex);
            };
            $scope.beforeDrag = function (sourceNode) {
                return $scope.$treeScope.$callbacks.beforeDrag(sourceNode);
            };
            $scope.isParent = function (node) {
                return node.$parentNodesScope == $scope;
            };
            $scope.hasChild = function () {
                return $scope.$modelValue.length > 0;
            };
            $scope.removeNode = function (node) {
                var index = $scope.$modelValue.indexOf(node.$modelValue);
                if (index > -1) {
                    $timeout(function () {
                        $scope.$modelValue.splice(index, 1)[0];
                    });
                    return $scope.$treeScope.$callbacks.removed(node);
                }
                return null;
            };
            $scope.insertNode = function (index, nodeData) {
                $timeout(function () {
                    $scope.$modelValue.splice(index, 0, nodeData);
                });
            };
            $scope.childNodes = function () {
                var i, nodes = [];
                if ($scope.$modelValue) {
                    for (i = 0; i < $scope.$modelValue.length; i++) {
                        nodes.push($scope.$nodesMap[$scope.$modelValue[i].$$hashKey]);
                    }
                }
                return nodes;
            };
            $scope.depth = function () {
                if ($scope.$nodeScope) {
                    return $scope.$nodeScope.depth();
                }
                return 0;
            };
            $scope.outOfDepth = function (sourceNode) {
                var maxDepth = $scope.maxDepth || $scope.$treeScope.maxDepth;
                if (maxDepth > 0) {
                    return $scope.depth() + sourceNode.maxSubDepth() + 1 > maxDepth;
                }
                return false;
            };
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').controller('TreeController', [
        '$scope',
        '$element',
        function ($scope, $element) {
            this.scope = $scope;
            $scope.$element = $element;
            $scope.$nodesScope = null;
            $scope.$type = 'uiTree';
            $scope.$emptyElm = null;
            $scope.$dropzoneElm = null;
            $scope.$callbacks = null;
            $scope.dragEnabled = true;
            $scope.emptyPlaceholderEnabled = true;
            $scope.maxDepth = 0;
            $scope.dragDelay = 0;
            $scope.cloneEnabled = false;
            $scope.nodropEnabled = false;
            $scope.dropzoneEnabled = false;
            $scope.isEmpty = function () {
                return $scope.$nodesScope && $scope.$nodesScope.$modelValue && $scope.$nodesScope.$modelValue.length === 0;
            };
            $scope.place = function (placeElm) {
                $scope.$nodesScope.$element.append(placeElm);
                $scope.$emptyElm.remove();
            };
            this.resetEmptyElement = function () {
                if ((!$scope.$nodesScope.$modelValue || $scope.$nodesScope.$modelValue.length === 0) && $scope.emptyPlaceholderEnabled) {
                    $element.append($scope.$emptyElm);
                } else {
                    $scope.$emptyElm.remove();
                }
            };
            this.resetDropzoneElement = function () {
                if ((!$scope.$nodesScope.$modelValue || $scope.$nodesScope.$modelValue.length !== 0) && $scope.dropzoneEnabled) {
                    $element.append($scope.$dropzoneElm);
                } else {
                    $scope.$dropzoneElm.remove();
                }
            };
            $scope.resetEmptyElement = this.resetEmptyElement;
            $scope.resetDropzoneElement = this.resetDropzoneElement;
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').directive('uiTree', [
        'treeConfig',
        '$window',
        function (treeConfig, $window) {
            return {
                restrict: 'A',
                scope: true,
                controller: 'TreeController',
                link: function (scope, element, attrs, ctrl) {
                    var callbacks = {
                            accept: null,
                            beforeDrag: null
                        }, config = {}, tdElm, $trElm, emptyElmColspan;
                    angular.extend(config, treeConfig);
                    if (config.treeClass) {
                        element.addClass(config.treeClass);
                    }
                    if (element.prop('tagName').toLowerCase() === 'table') {
                        scope.$emptyElm = angular.element($window.document.createElement('tr'));
                        $trElm = element.find('tr');
                        if ($trElm.length > 0) {
                            emptyElmColspan = angular.element($trElm).children().length;
                        } else {
                            emptyElmColspan = 1000000;
                        }
                        tdElm = angular.element($window.document.createElement('td')).attr('colspan', emptyElmColspan);
                        scope.$emptyElm.append(tdElm);
                    } else {
                        scope.$emptyElm = angular.element($window.document.createElement('div'));
                        scope.$dropzoneElm = angular.element($window.document.createElement('div'));
                    }
                    if (config.emptyTreeClass) {
                        scope.$emptyElm.addClass(config.emptyTreeClass);
                    }
                    if (config.dropzoneClass) {
                        scope.$dropzoneElm.addClass(config.dropzoneClass);
                    }
                    scope.$watch('$nodesScope.$modelValue.length', function (val) {
                        if (!angular.isNumber(val)) {
                            return;
                        }
                        ctrl.resetEmptyElement();
                        ctrl.resetDropzoneElement();
                    }, true);
                    scope.$watch(attrs.dragEnabled, function (val) {
                        if (typeof val == 'boolean') {
                            scope.dragEnabled = val;
                        }
                    });
                    scope.$watch(attrs.emptyPlaceholderEnabled, function (val) {
                        if (typeof val == 'boolean') {
                            scope.emptyPlaceholderEnabled = val;
                            ctrl.resetEmptyElement();
                        }
                    });
                    scope.$watch(attrs.nodropEnabled, function (val) {
                        if (typeof val == 'boolean') {
                            scope.nodropEnabled = val;
                        }
                    });
                    scope.$watch(attrs.dropzoneEnabled, function (val) {
                        if (typeof val == 'boolean') {
                            scope.dropzoneEnabled = val;
                            ctrl.resetDropzoneElement();
                        }
                    });
                    scope.$watch(attrs.cloneEnabled, function (val) {
                        if (typeof val == 'boolean') {
                            scope.cloneEnabled = val;
                        }
                    });
                    scope.$watch(attrs.maxDepth, function (val) {
                        if (typeof val == 'number') {
                            scope.maxDepth = val;
                        }
                    });
                    scope.$watch(attrs.dragDelay, function (val) {
                        if (typeof val == 'number') {
                            scope.dragDelay = val;
                        }
                    });
                    callbacks.accept = function (sourceNodeScope, destNodesScope, destIndex) {
                        return !(destNodesScope.nodropEnabled || destNodesScope.$treeScope.nodropEnabled || destNodesScope.outOfDepth(sourceNodeScope));
                    };
                    callbacks.beforeDrag = function (sourceNodeScope) {
                        return true;
                    };
                    callbacks.expandTimeoutStart = function () {
                    };
                    callbacks.expandTimeoutCancel = function () {
                    };
                    callbacks.expandTimeoutEnd = function () {
                    };
                    callbacks.removed = function (node) {
                    };
                    callbacks.dropped = function (event) {
                    };
                    callbacks.dragStart = function (event) {
                    };
                    callbacks.dragMove = function (event) {
                    };
                    callbacks.dragStop = function (event) {
                    };
                    callbacks.beforeDrop = function (event) {
                    };
                    callbacks.toggle = function (collapsed, sourceNodeScope) {
                    };
                    scope.$watch(attrs.uiTree, function (newVal, oldVal) {
                        angular.forEach(newVal, function (value, key) {
                            if (callbacks[key]) {
                                if (typeof value === 'function') {
                                    callbacks[key] = value;
                                }
                            }
                        });
                        scope.$callbacks = callbacks;
                    }, true);
                }
            };
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').directive('uiTreeHandle', [
        'treeConfig',
        function (treeConfig) {
            return {
                require: '^uiTreeNode',
                restrict: 'A',
                scope: true,
                controller: 'TreeHandleController',
                link: function (scope, element, attrs, treeNodeCtrl) {
                    var config = {};
                    angular.extend(config, treeConfig);
                    if (config.handleClass) {
                        element.addClass(config.handleClass);
                    }
                    if (scope != treeNodeCtrl.scope) {
                        scope.$nodeScope = treeNodeCtrl.scope;
                        treeNodeCtrl.scope.$handleScope = scope;
                    }
                }
            };
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').directive('uiTreeNode', [
        'treeConfig',
        'UiTreeHelper',
        '$window',
        '$document',
        '$timeout',
        '$q',
        function (treeConfig, UiTreeHelper, $window, $document, $timeout, $q) {
            return {
                require: [
                    '^uiTreeNodes',
                    '^uiTree'
                ],
                restrict: 'A',
                controller: 'TreeNodeController',
                link: function (scope, element, attrs, controllersArr) {
                    var config = {}, hasTouch = 'ontouchstart' in window, firstMoving, dragInfo, pos, placeElm, hiddenPlaceElm, dragElm, scrollContainerElm, unhover, treeScope = null, elements, dragDelaying = true, dragStarted = false, dragTimer = null, body = document.body, html = document.documentElement, document_height, document_width, dragStart, tagName, dragMove, dragEnd, dragStartEvent, dragMoveEvent, dragEndEvent, dragCancelEvent, dragDelay, bindDragStartEvents, bindDragMoveEvents, unbindDragMoveEvents, keydownHandler, isHandleChild, el, isUiTreeRoot, treeOfOrigin;
                    angular.extend(config, treeConfig);
                    if (config.nodeClass) {
                        element.addClass(config.nodeClass);
                    }
                    scope.init(controllersArr);
                    scope.collapsed = !!UiTreeHelper.getNodeAttribute(scope, 'collapsed') || treeConfig.defaultCollapsed;
                    scope.expandOnHover = !!UiTreeHelper.getNodeAttribute(scope, 'expandOnHover');
                    scope.scrollContainer = UiTreeHelper.getNodeAttribute(scope, 'scrollContainer') || attrs.scrollContainer || null;
                    scope.sourceOnly = scope.nodropEnabled || scope.$treeScope.nodropEnabled;
                    scope.$watch(attrs.collapsed, function (val) {
                        if (typeof val == 'boolean') {
                            scope.collapsed = val;
                        }
                    });
                    scope.$watch('collapsed', function (val) {
                        UiTreeHelper.setNodeAttribute(scope, 'collapsed', val);
                        attrs.$set('collapsed', val);
                    });
                    scope.$watch(attrs.expandOnHover, function (val) {
                        if (typeof val === 'boolean' || typeof val === 'number') {
                            scope.expandOnHover = val;
                        }
                    });
                    scope.$watch('expandOnHover', function (val) {
                        UiTreeHelper.setNodeAttribute(scope, 'expandOnHover', val);
                        attrs.$set('expandOnHover', val);
                    });
                    attrs.$observe('scrollContainer', function (val) {
                        if (typeof val === 'string') {
                            scope.scrollContainer = val;
                        }
                    });
                    scope.$watch('scrollContainer', function (val) {
                        UiTreeHelper.setNodeAttribute(scope, 'scrollContainer', val);
                        attrs.$set('scrollContainer', val);
                        scrollContainerElm = document.querySelector(val);
                    });
                    scope.$on('angular-ui-tree:collapse-all', function () {
                        scope.collapsed = true;
                    });
                    scope.$on('angular-ui-tree:expand-all', function () {
                        scope.collapsed = false;
                    });
                    dragStart = function (e) {
                        if (!hasTouch && (e.button === 2 || e.which === 3)) {
                            return;
                        }
                        if (e.uiTreeDragging || e.originalEvent && e.originalEvent.uiTreeDragging) {
                            return;
                        }
                        var eventElm = angular.element(e.target), isHandleChild, cloneElm, eventElmTagName, tagName, eventObj, tdElm, hStyle, isTreeNode, isTreeNodeHandle;
                        isHandleChild = UiTreeHelper.treeNodeHandlerContainerOfElement(eventElm);
                        if (isHandleChild) {
                            eventElm = angular.element(isHandleChild);
                        }
                        cloneElm = element.clone();
                        isTreeNode = UiTreeHelper.elementIsTreeNode(eventElm);
                        isTreeNodeHandle = UiTreeHelper.elementIsTreeNodeHandle(eventElm);
                        if (!isTreeNode && !isTreeNodeHandle) {
                            return;
                        }
                        if (isTreeNode && UiTreeHelper.elementContainsTreeNodeHandler(eventElm)) {
                            return;
                        }
                        eventElmTagName = eventElm.prop('tagName').toLowerCase();
                        if (eventElmTagName == 'input' || eventElmTagName == 'textarea' || eventElmTagName == 'button' || eventElmTagName == 'select') {
                            return;
                        }
                        el = angular.element(e.target);
                        isUiTreeRoot = el[0].attributes['ui-tree'];
                        while (el && el[0] && el[0] !== element && !isUiTreeRoot) {
                            if (el[0].attributes) {
                                isUiTreeRoot = el[0].attributes['ui-tree'];
                            }
                            if (UiTreeHelper.nodrag(el)) {
                                return;
                            }
                            el = el.parent();
                        }
                        if (!scope.beforeDrag(scope)) {
                            return;
                        }
                        e.uiTreeDragging = true;
                        if (e.originalEvent) {
                            e.originalEvent.uiTreeDragging = true;
                        }
                        e.preventDefault();
                        eventObj = UiTreeHelper.eventObj(e);
                        firstMoving = true;
                        dragInfo = UiTreeHelper.dragInfo(scope);
                        treeOfOrigin = dragInfo.source.$treeScope.$id;
                        tagName = element.prop('tagName');
                        if (tagName.toLowerCase() === 'tr') {
                            placeElm = angular.element($window.document.createElement(tagName));
                            tdElm = angular.element($window.document.createElement('td')).addClass(config.placeholderClass).attr('colspan', element[0].children.length);
                            placeElm.append(tdElm);
                        } else {
                            placeElm = angular.element($window.document.createElement(tagName)).addClass(config.placeholderClass);
                        }
                        hiddenPlaceElm = angular.element($window.document.createElement(tagName));
                        if (config.hiddenClass) {
                            hiddenPlaceElm.addClass(config.hiddenClass);
                        }
                        pos = UiTreeHelper.positionStarted(eventObj, element);
                        placeElm.css('height', element.prop('offsetHeight') + 'px');
                        dragElm = angular.element($window.document.createElement(scope.$parentNodesScope.$element.prop('tagName'))).addClass(scope.$parentNodesScope.$element.attr('class')).addClass(config.dragClass);
                        dragElm.css('width', UiTreeHelper.width(element) + 'px');
                        dragElm.css('z-index', 9999);
                        hStyle = (element[0].querySelector('.angular-ui-tree-handle') || element[0]).currentStyle;
                        if (hStyle) {
                            document.body.setAttribute('ui-tree-cursor', $document.find('body').css('cursor') || '');
                            $document.find('body').css({ 'cursor': hStyle.cursor + '!important' });
                        }
                        if (scope.sourceOnly) {
                            placeElm.css('display', 'none');
                        }
                        element.after(placeElm);
                        element.after(hiddenPlaceElm);
                        if (dragInfo.isClone() && scope.sourceOnly) {
                            dragElm.append(cloneElm);
                        } else {
                            dragElm.append(element);
                        }
                        $document.find('body').append(dragElm);
                        dragElm.css({
                            'left': eventObj.pageX - pos.offsetX + 'px',
                            'top': eventObj.pageY - pos.offsetY + 'px'
                        });
                        elements = {
                            placeholder: placeElm,
                            dragging: dragElm
                        };
                        bindDragMoveEvents();
                        scope.$apply(function () {
                            scope.$treeScope.$callbacks.dragStart(dragInfo.eventArgs(elements, pos));
                        });
                        document_height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                        document_width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
                    };
                    dragMove = function (e) {
                        var eventObj = UiTreeHelper.eventObj(e), prev, next, leftElmPos, topElmPos, top_scroll, bottom_scroll, scrollContainerElmRect, target, targetX, targetY, displayElm, targetNode, targetElm, isEmpty, scrollDownBy, scrollUpBy, targetOffset, targetBefore, moveWithinTree, targetBeforeBuffer, targetHeight, targetChildElm, targetChildHeight, isDropzone;
                        if (dragElm) {
                            e.preventDefault();
                            if ($window.getSelection) {
                                $window.getSelection().removeAllRanges();
                            } else if ($window.document.selection) {
                                $window.document.selection.empty();
                            }
                            leftElmPos = eventObj.pageX - pos.offsetX;
                            topElmPos = eventObj.pageY - pos.offsetY;
                            if (leftElmPos < 0) {
                                leftElmPos = 0;
                            }
                            if (topElmPos < 0) {
                                topElmPos = 0;
                            }
                            if (topElmPos + 10 > document_height) {
                                topElmPos = document_height - 10;
                            }
                            if (leftElmPos + 10 > document_width) {
                                leftElmPos = document_width - 10;
                            }
                            dragElm.css({
                                'left': leftElmPos + 'px',
                                'top': topElmPos + 'px'
                            });
                            if (scrollContainerElm) {
                                scrollContainerElmRect = scrollContainerElm.getBoundingClientRect();
                                top_scroll = scrollContainerElm.scrollTop;
                                bottom_scroll = top_scroll + scrollContainerElm.clientHeight;
                                if (scrollContainerElmRect.bottom < eventObj.clientY && bottom_scroll < scrollContainerElm.scrollHeight) {
                                    scrollDownBy = Math.min(scrollContainerElm.scrollHeight - bottom_scroll, 10);
                                    scrollContainerElm.scrollTop += scrollDownBy;
                                }
                                if (scrollContainerElmRect.top > eventObj.clientY && top_scroll > 0) {
                                    scrollUpBy = Math.min(top_scroll, 10);
                                    scrollContainerElm.scrollTop -= scrollUpBy;
                                }
                            } else {
                                top_scroll = window.pageYOffset || $window.document.documentElement.scrollTop;
                                bottom_scroll = top_scroll + (window.innerHeight || $window.document.clientHeight || $window.document.clientHeight);
                                if (bottom_scroll < eventObj.pageY && bottom_scroll < document_height) {
                                    scrollDownBy = Math.min(document_height - bottom_scroll, 10);
                                    window.scrollBy(0, scrollDownBy);
                                }
                                if (top_scroll > eventObj.pageY) {
                                    scrollUpBy = Math.min(top_scroll, 10);
                                    window.scrollBy(0, -scrollUpBy);
                                }
                            }
                            UiTreeHelper.positionMoved(e, pos, firstMoving);
                            if (firstMoving) {
                                firstMoving = false;
                                return;
                            }
                            targetX = eventObj.pageX - ($window.pageXOffset || $window.document.body.scrollLeft || $window.document.documentElement.scrollLeft) - ($window.document.documentElement.clientLeft || 0);
                            targetY = eventObj.pageY - ($window.pageYOffset || $window.document.body.scrollTop || $window.document.documentElement.scrollTop) - ($window.document.documentElement.clientTop || 0);
                            if (angular.isFunction(dragElm.hide)) {
                                dragElm.hide();
                            } else {
                                displayElm = dragElm[0].style.display;
                                dragElm[0].style.display = 'none';
                            }
                            $window.document.elementFromPoint(targetX, targetY);
                            targetElm = angular.element($window.document.elementFromPoint(targetX, targetY));
                            isHandleChild = UiTreeHelper.treeNodeHandlerContainerOfElement(targetElm);
                            if (isHandleChild) {
                                targetElm = angular.element(isHandleChild);
                            }
                            if (angular.isFunction(dragElm.show)) {
                                dragElm.show();
                            } else {
                                dragElm[0].style.display = displayElm;
                            }
                            if (UiTreeHelper.elementIsTree(targetElm)) {
                                targetNode = targetElm.controller('uiTree').scope;
                            } else if (UiTreeHelper.elementIsTreeNodeHandle(targetElm)) {
                                targetNode = targetElm.controller('uiTreeHandle').scope;
                            } else if (UiTreeHelper.elementIsTreeNode(targetElm)) {
                                targetNode = targetElm.controller('uiTreeNode').scope;
                            } else if (UiTreeHelper.elementIsTreeNodes(targetElm)) {
                                targetNode = targetElm.controller('uiTreeNodes').scope;
                            } else if (UiTreeHelper.elementIsPlaceholder(targetElm)) {
                                targetNode = targetElm.controller('uiTreeNodes').scope;
                            } else if (UiTreeHelper.elementIsDropzone(targetElm)) {
                                targetNode = targetElm.controller('uiTree').scope;
                                isDropzone = true;
                            } else if (targetElm.controller('uiTreeNode')) {
                                targetNode = targetElm.controller('uiTreeNode').scope;
                            }
                            moveWithinTree = targetNode && targetNode.$treeScope && targetNode.$treeScope.$id && targetNode.$treeScope.$id === treeOfOrigin;
                            if (moveWithinTree && pos.dirAx) {
                                if (pos.distX > 0) {
                                    prev = dragInfo.prev();
                                    if (prev && !prev.collapsed && prev.accept(scope, prev.childNodesCount())) {
                                        prev.$childNodesScope.$element.append(placeElm);
                                        dragInfo.moveTo(prev.$childNodesScope, prev.childNodes(), prev.childNodesCount());
                                    }
                                }
                                if (pos.distX < 0) {
                                    next = dragInfo.next();
                                    if (!next) {
                                        target = dragInfo.parentNode();
                                        if (target && target.$parentNodesScope.accept(scope, target.index() + 1)) {
                                            target.$element.after(placeElm);
                                            dragInfo.moveTo(target.$parentNodesScope, target.siblings(), target.index() + 1);
                                        }
                                    }
                                }
                            } else {
                                isEmpty = false;
                                if (!targetNode) {
                                    return;
                                }
                                if (targetNode.$treeScope && !targetNode.$parent.nodropEnabled && !targetNode.$treeScope.nodropEnabled) {
                                    placeElm.css('display', '');
                                }
                                if (targetNode.$type === 'uiTree' && targetNode.dragEnabled) {
                                    isEmpty = targetNode.isEmpty();
                                }
                                if (targetNode.$type === 'uiTreeHandle') {
                                    targetNode = targetNode.$nodeScope;
                                }
                                if (targetNode.$type !== 'uiTreeNode' && !isEmpty && !isDropzone) {
                                    if (config.appendChildOnHover) {
                                        next = dragInfo.next();
                                        if (!next && unhover) {
                                            target = dragInfo.parentNode();
                                            target.$element.after(placeElm);
                                            dragInfo.moveTo(target.$parentNodesScope, target.siblings(), target.index() + 1);
                                            unhover = false;
                                        }
                                    }
                                    return;
                                }
                                if (treeScope && placeElm.parent()[0] != treeScope.$element[0]) {
                                    treeScope.resetEmptyElement();
                                    treeScope.resetDropzoneElement();
                                    treeScope = null;
                                }
                                if (isEmpty) {
                                    treeScope = targetNode;
                                    if (targetNode.$nodesScope.accept(scope, 0)) {
                                        dragInfo.moveTo(targetNode.$nodesScope, targetNode.$nodesScope.childNodes(), 0);
                                    }
                                } else if (isDropzone) {
                                    treeScope = targetNode;
                                    if (targetNode.$nodesScope.accept(scope, targetNode.$nodesScope.childNodes().length)) {
                                        dragInfo.moveTo(targetNode.$nodesScope, targetNode.$nodesScope.childNodes(), targetNode.$nodesScope.childNodes().length);
                                    }
                                } else if (targetNode.dragEnabled()) {
                                    if (angular.isDefined(scope.expandTimeoutOn) && scope.expandTimeoutOn !== targetNode.id) {
                                        $timeout.cancel(scope.expandTimeout);
                                        delete scope.expandTimeout;
                                        delete scope.expandTimeoutOn;
                                        scope.$callbacks.expandTimeoutCancel();
                                    }
                                    if (targetNode.collapsed) {
                                        if (scope.expandOnHover === true || angular.isNumber(scope.expandOnHover) && scope.expandOnHover === 0) {
                                            targetNode.collapsed = false;
                                            targetNode.$treeScope.$callbacks.toggle(false, targetNode);
                                        } else if (scope.expandOnHover !== false && angular.isNumber(scope.expandOnHover) && scope.expandOnHover > 0) {
                                            if (angular.isUndefined(scope.expandTimeoutOn)) {
                                                scope.expandTimeoutOn = targetNode.$id;
                                                scope.$callbacks.expandTimeoutStart();
                                                scope.expandTimeout = $timeout(function () {
                                                    scope.$callbacks.expandTimeoutEnd();
                                                    targetNode.collapsed = false;
                                                    targetNode.$treeScope.$callbacks.toggle(false, targetNode);
                                                }, scope.expandOnHover);
                                            }
                                        }
                                    }
                                    targetElm = targetNode.$element;
                                    targetOffset = UiTreeHelper.offset(targetElm);
                                    targetHeight = UiTreeHelper.height(targetElm);
                                    targetChildElm = targetNode.$childNodesScope ? targetNode.$childNodesScope.$element : null;
                                    targetChildHeight = targetChildElm ? UiTreeHelper.height(targetChildElm) : 0;
                                    targetHeight -= targetChildHeight;
                                    targetBeforeBuffer = config.appendChildOnHover ? targetHeight * 0.25 : UiTreeHelper.height(targetElm) / 2;
                                    targetBefore = eventObj.pageY < targetOffset.top + targetBeforeBuffer;
                                    if (targetNode.$parentNodesScope.accept(scope, targetNode.index())) {
                                        if (targetBefore) {
                                            targetElm[0].parentNode.insertBefore(placeElm[0], targetElm[0]);
                                            dragInfo.moveTo(targetNode.$parentNodesScope, targetNode.siblings(), targetNode.index());
                                        } else {
                                            if (config.appendChildOnHover && targetNode.accept(scope, targetNode.childNodesCount())) {
                                                targetNode.$childNodesScope.$element.prepend(placeElm);
                                                dragInfo.moveTo(targetNode.$childNodesScope, targetNode.childNodes(), 0);
                                                unhover = true;
                                            } else {
                                                targetElm.after(placeElm);
                                                dragInfo.moveTo(targetNode.$parentNodesScope, targetNode.siblings(), targetNode.index() + 1);
                                            }
                                        }
                                    } else if (!targetBefore && targetNode.accept(scope, targetNode.childNodesCount())) {
                                        targetNode.$childNodesScope.$element.append(placeElm);
                                        dragInfo.moveTo(targetNode.$childNodesScope, targetNode.childNodes(), targetNode.childNodesCount());
                                    }
                                }
                            }
                            scope.$apply(function () {
                                scope.$treeScope.$callbacks.dragMove(dragInfo.eventArgs(elements, pos));
                            });
                        }
                    };
                    dragEnd = function (e) {
                        var dragEventArgs = dragInfo.eventArgs(elements, pos);
                        e.preventDefault();
                        unbindDragMoveEvents();
                        $timeout.cancel(scope.expandTimeout);
                        scope.$treeScope.$apply(function () {
                            $q.when(scope.$treeScope.$callbacks.beforeDrop(dragEventArgs)).then(function (allowDrop) {
                                if (allowDrop !== false && scope.$$allowNodeDrop) {
                                    dragInfo.apply();
                                    scope.$treeScope.$callbacks.dropped(dragEventArgs);
                                } else {
                                    bindDragStartEvents();
                                }
                            }).catch(function () {
                                bindDragStartEvents();
                            }).finally(function () {
                                hiddenPlaceElm.replaceWith(scope.$element);
                                placeElm.remove();
                                if (dragElm) {
                                    dragElm.remove();
                                    dragElm = null;
                                }
                                scope.$treeScope.$callbacks.dragStop(dragEventArgs);
                                scope.$$allowNodeDrop = false;
                                dragInfo = null;
                                var oldCur = document.body.getAttribute('ui-tree-cursor');
                                if (oldCur !== null) {
                                    $document.find('body').css({ 'cursor': oldCur });
                                    document.body.removeAttribute('ui-tree-cursor');
                                }
                            });
                        });
                    };
                    dragStartEvent = function (e) {
                        if (scope.dragEnabled()) {
                            dragStart(e);
                        }
                    };
                    dragMoveEvent = function (e) {
                        dragMove(e);
                    };
                    dragEndEvent = function (e) {
                        scope.$$allowNodeDrop = true;
                        dragEnd(e);
                    };
                    dragCancelEvent = function (e) {
                        dragEnd(e);
                    };
                    dragDelay = function () {
                        var to;
                        return {
                            exec: function (fn, ms) {
                                if (!ms) {
                                    ms = 0;
                                }
                                this.cancel();
                                to = $timeout(fn, ms);
                            },
                            cancel: function () {
                                $timeout.cancel(to);
                            }
                        };
                    }();
                    keydownHandler = function (e) {
                        if (e.keyCode === 27) {
                            dragEndEvent(e);
                        }
                    };
                    bindDragStartEvents = function () {
                        element.bind('touchstart mousedown', function (e) {
                            if (scope.dragDelay > 0) {
                                dragDelay.exec(function () {
                                    dragStartEvent(e);
                                }, scope.dragDelay);
                            } else {
                                dragStartEvent(e);
                            }
                        });
                        element.bind('touchend touchcancel mouseup', function () {
                            if (scope.dragDelay > 0) {
                                dragDelay.cancel();
                            }
                        });
                    };
                    bindDragStartEvents();
                    bindDragMoveEvents = function () {
                        angular.element($document).bind('touchend', dragEndEvent);
                        angular.element($document).bind('touchcancel', dragEndEvent);
                        angular.element($document).bind('touchmove', dragMoveEvent);
                        angular.element($document).bind('mouseup', dragEndEvent);
                        angular.element($document).bind('mousemove', dragMoveEvent);
                        angular.element($document).bind('mouseleave', dragCancelEvent);
                        angular.element($document).bind('keydown', keydownHandler);
                    };
                    unbindDragMoveEvents = function () {
                        angular.element($document).unbind('touchend', dragEndEvent);
                        angular.element($document).unbind('touchcancel', dragEndEvent);
                        angular.element($document).unbind('touchmove', dragMoveEvent);
                        angular.element($document).unbind('mouseup', dragEndEvent);
                        angular.element($document).unbind('mousemove', dragMoveEvent);
                        angular.element($document).unbind('mouseleave', dragCancelEvent);
                        angular.element($document).unbind('keydown', keydownHandler);
                    };
                }
            };
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').directive('uiTreeNodes', [
        'treeConfig',
        '$window',
        function (treeConfig) {
            return {
                require: [
                    'ngModel',
                    '?^uiTreeNode',
                    '^uiTree'
                ],
                restrict: 'A',
                scope: true,
                controller: 'TreeNodesController',
                link: function (scope, element, attrs, controllersArr) {
                    var config = {}, ngModel = controllersArr[0], treeNodeCtrl = controllersArr[1], treeCtrl = controllersArr[2];
                    angular.extend(config, treeConfig);
                    if (config.nodesClass) {
                        element.addClass(config.nodesClass);
                    }
                    if (treeNodeCtrl) {
                        treeNodeCtrl.scope.$childNodesScope = scope;
                        scope.$nodeScope = treeNodeCtrl.scope;
                    } else {
                        treeCtrl.scope.$nodesScope = scope;
                    }
                    scope.$treeScope = treeCtrl.scope;
                    if (ngModel) {
                        ngModel.$render = function () {
                            scope.$modelValue = ngModel.$modelValue;
                        };
                    }
                    scope.$watch(function () {
                        return attrs.maxDepth;
                    }, function (val) {
                        if (typeof val == 'number') {
                            scope.maxDepth = val;
                        }
                    });
                    scope.$watch(function () {
                        return attrs.nodropEnabled;
                    }, function (newVal) {
                        if (typeof newVal != 'undefined') {
                            scope.nodropEnabled = true;
                        }
                    }, true);
                }
            };
        }
    ]);
}());
(function () {
    'use strict';
    angular.module('ui.tree').factory('UiTreeHelper', [
        '$document',
        '$window',
        'treeConfig',
        function ($document, $window, treeConfig) {
            return {
                nodesData: {},
                setNodeAttribute: function (scope, attrName, val) {
                    if (!scope.$modelValue) {
                        return null;
                    }
                    var data = this.nodesData[scope.$modelValue.$$hashKey];
                    if (!data) {
                        data = {};
                        this.nodesData[scope.$modelValue.$$hashKey] = data;
                    }
                    data[attrName] = val;
                },
                getNodeAttribute: function (scope, attrName) {
                    if (!scope.$modelValue) {
                        return null;
                    }
                    var data = this.nodesData[scope.$modelValue.$$hashKey];
                    if (data) {
                        return data[attrName];
                    }
                    return null;
                },
                nodrag: function (targetElm) {
                    if (typeof targetElm.attr('data-nodrag') != 'undefined') {
                        return targetElm.attr('data-nodrag') !== 'false';
                    }
                    return false;
                },
                eventObj: function (e) {
                    var obj = e;
                    if (e.targetTouches !== undefined) {
                        obj = e.targetTouches.item(0);
                    } else if (e.originalEvent !== undefined && e.originalEvent.targetTouches !== undefined) {
                        obj = e.originalEvent.targetTouches.item(0);
                    }
                    return obj;
                },
                dragInfo: function (node) {
                    return {
                        source: node,
                        sourceInfo: {
                            cloneModel: node.$treeScope.cloneEnabled === true ? angular.copy(node.$modelValue) : undefined,
                            nodeScope: node,
                            index: node.index(),
                            nodesScope: node.$parentNodesScope
                        },
                        index: node.index(),
                        siblings: node.siblings().slice(0),
                        parent: node.$parentNodesScope,
                        resetParent: function () {
                            this.parent = node.$parentNodesScope;
                        },
                        moveTo: function (parent, siblings, index) {
                            this.parent = parent;
                            this.siblings = siblings.slice(0);
                            var i = this.siblings.indexOf(this.source);
                            if (i > -1) {
                                this.siblings.splice(i, 1);
                                if (this.source.index() < index) {
                                    index--;
                                }
                            }
                            this.siblings.splice(index, 0, this.source);
                            this.index = index;
                        },
                        parentNode: function () {
                            return this.parent.$nodeScope;
                        },
                        prev: function () {
                            if (this.index > 0) {
                                return this.siblings[this.index - 1];
                            }
                            return null;
                        },
                        next: function () {
                            if (this.index < this.siblings.length - 1) {
                                return this.siblings[this.index + 1];
                            }
                            return null;
                        },
                        isClone: function () {
                            return this.source.$treeScope.cloneEnabled === true;
                        },
                        clonedNode: function (node) {
                            return angular.copy(node);
                        },
                        isDirty: function () {
                            return this.source.$parentNodesScope != this.parent || this.source.index() != this.index;
                        },
                        isForeign: function () {
                            return this.source.$treeScope !== this.parent.$treeScope;
                        },
                        eventArgs: function (elements, pos) {
                            return {
                                source: this.sourceInfo,
                                dest: {
                                    index: this.index,
                                    nodesScope: this.parent
                                },
                                elements: elements,
                                pos: pos
                            };
                        },
                        apply: function () {
                            var nodeData = this.source.$modelValue;
                            if (this.parent.nodropEnabled || this.parent.$treeScope.nodropEnabled) {
                                return;
                            }
                            if (!this.isDirty()) {
                                return;
                            }
                            if (this.isClone() && this.isForeign()) {
                                this.parent.insertNode(this.index, this.sourceInfo.cloneModel);
                            } else {
                                this.source.remove();
                                this.parent.insertNode(this.index, nodeData);
                            }
                        }
                    };
                },
                height: function (element) {
                    return element.prop('scrollHeight');
                },
                width: function (element) {
                    return element.prop('scrollWidth');
                },
                offset: function (element) {
                    var boundingClientRect = element[0].getBoundingClientRect();
                    return {
                        width: element.prop('offsetWidth'),
                        height: element.prop('offsetHeight'),
                        top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
                        left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft || $document[0].documentElement.scrollLeft)
                    };
                },
                positionStarted: function (e, target) {
                    var pos = {}, pageX = e.pageX, pageY = e.pageY;
                    if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length > 0) {
                        pageX = e.originalEvent.touches[0].pageX;
                        pageY = e.originalEvent.touches[0].pageY;
                    }
                    pos.offsetX = pageX - this.offset(target).left;
                    pos.offsetY = pageY - this.offset(target).top;
                    pos.startX = pos.lastX = pageX;
                    pos.startY = pos.lastY = pageY;
                    pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0;
                    pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0;
                    return pos;
                },
                positionMoved: function (e, pos, firstMoving) {
                    var pageX = e.pageX, pageY = e.pageY, newAx;
                    if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length > 0) {
                        pageX = e.originalEvent.touches[0].pageX;
                        pageY = e.originalEvent.touches[0].pageY;
                    }
                    pos.lastX = pos.nowX;
                    pos.lastY = pos.nowY;
                    pos.nowX = pageX;
                    pos.nowY = pageY;
                    pos.distX = pos.nowX - pos.lastX;
                    pos.distY = pos.nowY - pos.lastY;
                    pos.lastDirX = pos.dirX;
                    pos.lastDirY = pos.dirY;
                    pos.dirX = pos.distX === 0 ? 0 : pos.distX > 0 ? 1 : -1;
                    pos.dirY = pos.distY === 0 ? 0 : pos.distY > 0 ? 1 : -1;
                    newAx = Math.abs(pos.distX) > Math.abs(pos.distY) ? 1 : 0;
                    if (firstMoving) {
                        pos.dirAx = newAx;
                        pos.moving = true;
                        return;
                    }
                    if (pos.dirAx !== newAx) {
                        pos.distAxX = 0;
                        pos.distAxY = 0;
                    } else {
                        pos.distAxX += Math.abs(pos.distX);
                        if (pos.dirX !== 0 && pos.dirX !== pos.lastDirX) {
                            pos.distAxX = 0;
                        }
                        pos.distAxY += Math.abs(pos.distY);
                        if (pos.dirY !== 0 && pos.dirY !== pos.lastDirY) {
                            pos.distAxY = 0;
                        }
                    }
                    pos.dirAx = newAx;
                },
                elementIsTreeNode: function (element) {
                    return typeof element.attr('ui-tree-node') !== 'undefined';
                },
                elementIsTreeNodeHandle: function (element) {
                    return typeof element.attr('ui-tree-handle') !== 'undefined';
                },
                elementIsTree: function (element) {
                    return typeof element.attr('ui-tree') !== 'undefined';
                },
                elementIsTreeNodes: function (element) {
                    return typeof element.attr('ui-tree-nodes') !== 'undefined';
                },
                elementIsPlaceholder: function (element) {
                    return element.hasClass(treeConfig.placeholderClass);
                },
                elementIsDropzone: function (element) {
                    return element.hasClass(treeConfig.dropzoneClass);
                },
                elementContainsTreeNodeHandler: function (element) {
                    return element[0].querySelectorAll('[ui-tree-handle]').length >= 1;
                },
                treeNodeHandlerContainerOfElement: function (element) {
                    return findFirstParentElementWithAttribute('ui-tree-handle', element[0]);
                }
            };
        }
    ]);
    function findFirstParentElementWithAttribute(attributeName, childObj) {
        if (childObj === undefined) {
            return null;
        }
        var testObj = childObj.parentNode, count = 1, res = typeof testObj.setAttribute === 'function' && testObj.hasAttribute(attributeName) ? testObj : null;
        while (testObj && typeof testObj.setAttribute === 'function' && !testObj.hasAttribute(attributeName)) {
            testObj = testObj.parentNode;
            res = testObj;
            if (testObj === document.documentElement) {
                res = null;
                break;
            }
            count++;
        }
        return res;
    }
}());
define('SeedModules.AngularUI/js/seed/angular-ui-tree', [], function () {
    return;
});
define('SeedModules.AngularUI/modules/boot', [
    'require',
    'exports',
    'angular',
    'app/application',
    'angular-ui-router',
    'schema-form-bootstrap',
    'SeedModules.AngularUI/js/seed/angular-ui-tree'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.angularui.boot', [
        'ui.bootstrap',
        'ui.tree',
        'schemaForm'
    ]);
});
define('SeedModules.AngularUI/modules/configs/httpConfig', ['SeedModules.AngularUI/modules/boot'], function (boot) {
    'use strict';
    boot.config([
        '$provide',
        '$httpProvider',
        function ($provide, $httpProvider) {
            $provide.decorator('app/factories/httpDataHandler', [
                '$delegate',
                '$rootScope',
                '$modal',
                '$appEnvironment',
                'app/services/popupService',
                function ($delegate, $rootScope, $modal, $appEnvironment, popupService) {
                    $delegate.doResponse = function (response, defer) {
                        if (response.config.dataOnly) {
                            defer.resolve(response.data, response);
                        } else if (response.data.success) {
                            defer.resolve(response.data.data, response);
                        } else {
                            $delegate.doError($.extend(response, { statusText: response.data.message }), defer);
                        }
                    };
                    $delegate.doError = function (response, defer) {
                        popupService.error(response.statusText);
                        defer.reject(response);
                    };
                    return $delegate;
                }
            ]);
        }
    ]);
});
define('SeedModules.AngularUI/modules/configs/location', ['SeedModules.AngularUI/modules/boot'], function (boot) {
    'use strict';
    boot.config([
        '$provide',
        function ($provide) {
            $provide.decorator('$location', [
                '$delegate',
                function ($delegate) {
                    $delegate.search = function (urlString) {
                        var pairs = (urlString || window.location.search).substring(1).split(/[&?]/);
                        var res = {}, i, pair;
                        for (i = 0; i < pairs.length; i++) {
                            pair = pairs[i].split('=');
                            if (pair[1])
                                res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                        }
                        return res;
                    };
                    return $delegate;
                }
            ]);
        }
    ]);
});
define('SeedModules.AngularUI/modules/configs/ngTableDefaults', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var settings = JSON.parse(document.getElementById('seed-ui').getAttribute('data-site'));
    var ngTableDefaults = {
        options: {},
        schema: {},
        params: { count: settings.pageSize },
        settings: { counts: settings.pageCounts.split(/[,?]/) }
    };
    boot.value('SeedModules.AngularUI/modules/configs/ngTableDefaults', ngTableDefaults);
});
define('SeedModules.AngularUI/modules/configs/ngTableTemplates', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var RunClass = function () {
        function RunClass($templateCache) {
            $templateCache.put('ng-table/header.html', '<ng-table-sorter-row></ng-table-sorter-row>');
            $templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager clearfix" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
            $templateCache.put('ng-pager/pager.html', '<div class="ng-cloak ng-table-pager clearfix"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
            $templateCache.put('ng-table/sorterRow.html', '<tr> <th title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> </div> <div ng-if="template" ng-include="template"></div> </th> </tr> ');
        }
        RunClass.$inject = ['$templateCache'];
        return RunClass;
    }();
    boot.run(RunClass);
});
define('SeedModules.AngularUI/modules/configs/schemaForm', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot',
    'angular'
], function (require, exports, boot, angular) {
    'use strict';
    exports.__esModule = true;
    var SchemaFormClass = function () {
        function SchemaFormClass(schemaFormDecoratorsProvider, schemaFormProvider, sfBuilderProvider, sfPathProvider) {
            var bootstrapDecorator = schemaFormDecoratorsProvider.decorator('bootstrapDecorator');
            var sfCompare = function (args) {
                if (args.form.compare) {
                    var ngModelElement = args.fieldFrag.querySelector('[ng-model]');
                    if (ngModelElement)
                        ngModelElement.setAttribute('sf-compare', '');
                }
            };
            angular.forEach(bootstrapDecorator, function (item, idx) {
                if (angular.isArray(item.builder)) {
                    item.builder.push(sfCompare);
                }
            });
        }
        return SchemaFormClass;
    }();
    var SchemaFormRun = function () {
        function SchemaFormRun($templateCache) {
        }
        return SchemaFormRun;
    }();
    SchemaFormClass.$inject = [
        'schemaFormDecoratorsProvider',
        'schemaFormProvider',
        'sfBuilderProvider',
        'sfPathProvider'
    ];
    SchemaFormRun.$inject = ['$templateCache'];
    boot.config(SchemaFormClass).run(SchemaFormRun);
});
define('SeedModules.AngularUI/modules/configs/form/simplecolor', [
    'SeedModules.AngularUI/modules/boot',
    'schema-form-bootstrap'
], function (boot) {
    'use strict';
    angular.module('schemaForm').config([
        'schemaFormDecoratorsProvider',
        'schemaFormProvider',
        'sfBuilderProvider',
        'sfPathProvider',
        function (schemaFormDecoratorsProvider, schemaFormProvider, sfBuilderProvider, sfPathProvider) {
            var base = '/SeedModules.AngularUI/modules/templates/';
            var simplecolor = function (name, schema, options) {
                if (schema.type === 'string' && schema.format == 'html') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'simplecolor';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            schemaFormProvider.defaults.string.unshift(simplecolor);
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'simplecolor', base + 'simplecolor.html');
            schemaFormDecoratorsProvider.createDirective('simplecolor', base + 'simplecolor.html');
        }
    ]);
});
define('SeedModules.AngularUI/modules/configs/enums/extendFormFields', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var ExtendFormFields;
    (function (ExtendFormFields) {
        ExtendFormFields['row'] = 'row';
        ExtendFormFields['column'] = 'column';
        ExtendFormFields['panel'] = 'panel';
        ExtendFormFields['container'] = 'container';
        ExtendFormFields['table'] = 'table';
        ExtendFormFields['switch'] = 'switch';
        ExtendFormFields['navbar'] = 'navbar';
    }(ExtendFormFields = exports.ExtendFormFields || (exports.ExtendFormFields = {})));
});
define('SeedModules.AngularUI/modules/configs/form/switchField', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot',
    'SeedModules.AngularUI/modules/configs/enums/extendFormFields'
], function (require, exports, boot, extendFormFields_1) {
    'use strict';
    exports.__esModule = true;
    var SwitchFieldConfig = function () {
        function SwitchFieldConfig(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider) {
            var base = '/SeedModules.AngularUI/modules/templates/form/';
            var switchField = function (name, schema, options) {
                if (schema.type === 'boolean' && schema.format == 'html') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = extendFormFields_1.ExtendFormFields['switch'];
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            schemaFormProvider.defaults.boolean.push(switchField);
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', extendFormFields_1.ExtendFormFields['switch'], base + 'switchField.html');
            schemaFormDecoratorsProvider.createDirective(extendFormFields_1.ExtendFormFields['switch'], base + 'switchField.html');
        }
        SwitchFieldConfig.$inject = [
            'schemaFormDecoratorsProvider',
            'schemaFormProvider',
            'sfPathProvider'
        ];
        return SwitchFieldConfig;
    }();
    boot.config(SwitchFieldConfig);
});
define('SeedModules.AngularUI/modules/configs/form/layout', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot',
    'SeedModules.AngularUI/modules/configs/enums/extendFormFields'
], function (require, exports, boot, extendFormFields_1) {
    'use strict';
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var RowConfig = function () {
        function RowConfig(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider, sfBuilderProvider) {
            var layoutDefaults = [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ];
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.row, base + 'row.html', layoutDefaults);
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.column, base + 'column.html', layoutDefaults);
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.navbar, base + 'navbar.html', layoutDefaults);
        }
        RowConfig.$inject = [
            'schemaFormDecoratorsProvider',
            'schemaFormProvider',
            'sfPathProvider',
            'sfBuilderProvider'
        ];
        return RowConfig;
    }();
    boot.config(RowConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put(base + 'row.html', '<div class="row" sf-field-transclude="items"></div>');
            $templateCache.put(base + 'column.html', '<div class="col-md-{{form.flex}} col-lg-{{form.flex}} col-sm-{{form.flex}} col-xs-{{flex}}" sf-field-transclude="items"></div>');
            $templateCache.put(base + 'navbar.html', '<div class="navbar navbar-{{form.theme}} {{form.htmlClass}}" style="margin: 0" sf-field-transclude="items"></div>');
            $templateCache.put('decorators/bootstrap/tabs.html', '<div ng-init="selected = { tab: 0 }" class="schema-form-tabs {{form.htmlClass}}"><ul class="nav nav-tabs"><li ng-repeat="tab in form.tabs" ng-disabled="form.readonly" ng-click="$event.preventDefault() || (selected.tab = $index)" ng-class="{active: selected.tab === $index}"><a href="#"> <i ng-if="tab.titleIcon && tab.titleIcon.length>0" class="{{tab.titleIcon}}"></i> {{ tab.title }}</a></li></ul><div class="tab-content {{form.fieldHtmlClass}}"></div></div>');
        }
    ]);
});
define('SeedModules.AngularUI/modules/configs/form/panel', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot',
    'SeedModules.AngularUI/modules/configs/enums/extendFormFields'
], function (require, exports, boot, extendFormFields_1) {
    'use strict';
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var PanelConfig = function () {
        function PanelConfig(schemaFormDecoratorsProvider, sfBuilderProvider) {
            var defaultBuilders = [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ];
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.panel, base + 'panel.html', defaultBuilders);
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.container, base + 'container.html', defaultBuilders);
        }
        PanelConfig.$inject = [
            'schemaFormDecoratorsProvider',
            'sfBuilderProvider'
        ];
        return PanelConfig;
    }();
    boot.config(PanelConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put(base + 'panel.html', '<div class="schema-form-panel panel panel-{{form.theme}} {{form.htmlClass}}"><div ng-if="!form.notitle" class="panel-heading"> <i ng-if="form.titleIcon && form.titleIcon.length>0" class="{{form.titleIcon}}"></i> <span ng-bind="form.title"></span></div><div sf-field-transclude="items"></div></div>');
            $templateCache.put(base + 'container.html', '<div class="panel-body {{form.htmlClass}}" sf-field-transclude="items"></div>');
        }
    ]);
});
define('SeedModules.AngularUI/modules/configs/form/table', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot',
    'SeedModules.AngularUI/modules/configs/enums/extendFormFields'
], function (require, exports, boot, extendFormFields_1) {
    'use strict';
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var PanelConfig = function () {
        function PanelConfig(schemaFormDecoratorsProvider, sfBuilderProvider) {
            var defaultBuilders = [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ];
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.table, base + 'table.html', defaultBuilders);
        }
        PanelConfig.$inject = [
            'schemaFormDecoratorsProvider',
            'sfBuilderProvider'
        ];
        return PanelConfig;
    }();
    boot.config(PanelConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put(base + 'table.html', '<table class="table" ng-table-dynamic="form.tableParams with form.tableColumns"><tr ng-repeat="row in $data"><td ng-repeat="col in $columns">{{row[col.field]}}</td></tr></table>');
        }
    ]);
});
define('SeedModules.AngularUI/modules/providers/ngTableDefaultGetData', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var NgTableDefaultGetDataProvider = function () {
        function NgTableDefaultGetDataProvider() {
            this.filterFilterName = 'filter';
            this.sortingFilterName = 'orderBy';
            this.$get.$inject = ['$filter'];
        }
        NgTableDefaultGetDataProvider.prototype.$get = function ($filter) {
            return getData;
            function getData(data, params) {
                if (data == null) {
                    return [];
                }
                var fData = params.hasFilter() ? $filter(this.filterFilterName)(data, params.filter(true)) : data;
                var orderBy = params.orderBy();
                var orderedData = orderBy.length ? $filter(this.sortingFilterName)(fData, orderBy) : fData;
                var pagedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                params.total(orderedData.length);
                return pagedData;
            }
        };
        return NgTableDefaultGetDataProvider;
    }();
    boot.provider('SeedModules.AngularUI/modules/providers/ngTableDefaultGetData', NgTableDefaultGetDataProvider);
});
define('SeedModules.AngularUI/modules/configs/schemaFormDefaults', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
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
    boot.value('SeedModules.AngularUI/modules/configs/schemaFormDefaults', schemaFormDefaults);
});
define('SeedModules.AngularUI/modules/module', [
    'require',
    'exports',
    'angular',
    'SeedModules.AngularUI/modules/configs/httpConfig',
    'SeedModules.AngularUI/modules/configs/location',
    'SeedModules.AngularUI/modules/configs/ngTableDefaults',
    'SeedModules.AngularUI/modules/configs/ngTableTemplates',
    'SeedModules.AngularUI/modules/configs/schemaForm',
    'SeedModules.AngularUI/modules/configs/form/simplecolor',
    'SeedModules.AngularUI/modules/configs/form/switchField',
    'SeedModules.AngularUI/modules/configs/form/layout',
    'SeedModules.AngularUI/modules/configs/form/panel',
    'SeedModules.AngularUI/modules/configs/form/table',
    'SeedModules.AngularUI/modules/providers/ngTableDefaultGetData',
    'SeedModules.AngularUI/modules/configs/schemaFormDefaults'
], function (require, exports, angular) {
    'use strict';
    var RouteClass = function () {
        function RouteClass($provide, $appConfig) {
            var settings = JSON.parse(document.getElementById('seed-ui').getAttribute('data-site'));
            settings.prefix = settings.prefix ? '/' + settings.prefix : '';
            $appConfig.siteSettings = settings;
        }
        RouteClass.$inject = [
            '$provide',
            '$appConfig'
        ];
        return RouteClass;
    }();
    angular.module('template/modal/window.html', []).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('template/modal/window.html', '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n' + '    <div class="modal-dialog modal-{{size}}"><div class="modal-content" modal-transclude></div></div>\n' + '</div>');
        }
    ]);
    return angular.module('modules.angularui', ['modules.angularui.boot']).config(RouteClass);
});