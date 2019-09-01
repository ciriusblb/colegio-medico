(function () {
  'use strict';

  angular
      .module('app.widgets')
      .directive('autoResize', autoResize);

      autoResize.$inject = ['$timeout'];

      function autoResize($timeout) {

          var directive = {
              restrict: 'A',
              link: function autoResizeLink(scope, element, attributes, controller) {

                  element.css({ 'height': 'auto', 'overflow-y': 'hidden' });
                  $timeout(function () {
                      element.css('height', element[0].scrollHeight + 'px');
                  }, 100);

                  element.on('input', function () {
                      element.css({ 'height': 'auto', 'overflow-y': 'hidden' });
                      element.css('height', element[0].scrollHeight + 'px');

                  });
              }
          };

          return directive;
      };
})();