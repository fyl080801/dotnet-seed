import mod = require('SeedModules.AngularUI/modules/module');
import 'jquery-form';

interface IAjaxFormScope extends ng.IScope {
  ajaxForm;
}

function ajaxFormDirective(
  $q,
  $modal,
  $appConfig,
  httpDataHandler
): ng.IDirective {
  return {
    restrict: 'AE',
    scope: {
      ajaxForm: '='
    },
    link: function(
      scope: IAjaxFormScope,
      element: JQLite,
      attr: ng.IAttributes,
      ctrl: ng.IController
    ) {
      scope.ajaxForm = $.extend(
        {
          type: 'POST',
          showLoading: true
        },
        scope.ajaxForm
      );

      scope.ajaxForm.submit = function(options) {
        var defer = $q.defer();

        var loading = $modal.open({
          templateUrl: '/SeedModules.AngularUI/modules/views/Loading.html',
          size: 'sm'
        });

        var submitOptions = options
          ? $.extend(scope.ajaxForm, options)
          : scope.ajaxForm;

        submitOptions.url = $appConfig.siteSettings.prefix + submitOptions.url;

        submitOptions.success = function(responseText, statusText, xhr, form) {
          httpDataHandler.doResponse(
            {
              data: '',
              config: {
                dataOnly: true,
                url: $appConfig.siteSettings.prefix + scope.ajaxForm.url
              }
            },
            defer
          );

          loading.close();
        };

        submitOptions.error = function(
          response,
          statusText,
          responseText,
          form
        ) {
          httpDataHandler.doError(
            {
              data: '',
              statusText: responseText,
              config: {
                dataOnly: true,
                url: scope.ajaxForm.url
              }
            },
            defer
          );

          loading.close();
        };

        $(element)['ajaxSubmit'](submitOptions);

        return defer.promise;
      };
    }
  };
}

ajaxFormDirective.$inject = [
  '$q',
  '$modal',
  '$appConfig',
  'app/factories/httpDataHandler'
];

mod.directive('ajaxForm', ajaxFormDirective);
