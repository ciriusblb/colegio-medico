(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtFormValid', rtFormValid);
    function rtFormValid () {
        var directive = {
            scope: {
                object: '=',
            },
            restrict: 'A',
            controller:function($scope){
                console.log($scope.object);

            }
        };
        return directive;
    }
})();
