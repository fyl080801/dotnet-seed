define(["require", "exports", "SeedModules.AngularUI/modules/module", "angular"], function (require, exports, mod, angular) {
    "use strict";
    exports.__esModule = true;
    function ngTableEventsChannelFactory($rootScope) {
        var events = {};
        events = addChangeEvent('afterCreated', events);
        events = addChangeEvent('afterReloadData', events);
        events = addChangeEvent('datasetChanged', events);
        events = addChangeEvent('pagesChanged', events);
        return events;
        function addChangeEvent(eventName, target) {
            var fnName = eventName.charAt(0).toUpperCase() + eventName.substring(1);
            var event = {};
            event['on' + fnName] = createEventSubscriptionFn(eventName);
            event['publish' + fnName] = createPublishEventFn(eventName);
            return angular.extend(target, event);
        }
        function createEventSubscriptionFn(eventName) {
            return function subscription(handler) {
                var eventSelector = angular.identity;
                var scope = $rootScope;
                if (arguments.length === 2) {
                    if (angular.isFunction(arguments[1].$new)) {
                        scope = arguments[1];
                    }
                    else {
                        eventSelector = arguments[1];
                    }
                }
                else if (arguments.length > 2) {
                    scope = arguments[1];
                    eventSelector = arguments[2];
                }
                if (angular.isObject(eventSelector)) {
                    var requiredPublisher = eventSelector;
                    eventSelector = function (publisher) {
                        return publisher === requiredPublisher;
                    };
                }
                return scope.$on('ngTable:' + eventName, function (event, params) {
                    if (params.isNullInstance)
                        return;
                    var eventArgs = rest(arguments, 2);
                    var fnArgs = [params].concat(eventArgs);
                    if (eventSelector.apply(this, fnArgs)) {
                        handler.apply(this, fnArgs);
                    }
                });
            };
        }
        function createPublishEventFn(eventName) {
            return function publish() {
                var fnArgs = ['ngTable:' + eventName].concat(Array.prototype.slice.call(arguments));
                $rootScope.$broadcast.apply($rootScope, fnArgs);
            };
        }
        function rest(array, n) {
            return Array.prototype.slice.call(array, n == null ? 1 : n);
        }
    }
    ngTableEventsChannelFactory.$inject = ['$rootScope'];
    mod.factory('SeedModules.AngularUI/modules/factories/ngTableEventsChannel', ngTableEventsChannelFactory);
});
