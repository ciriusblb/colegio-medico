(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtSettings', rtSettings);
    function rtSettings () {
        var directive = {
            scope: {
                ruta: '@',
                ver:'&'
                },
            templateUrl: 'app/widgets/rtSettings/rtSettingsTemplate.html',
            restrict: 'E',
            controller:function($scope){
            }
        };
        return directive;
    }
})();
