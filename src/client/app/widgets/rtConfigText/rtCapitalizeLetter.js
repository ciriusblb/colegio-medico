(function(){
    'use strict';
    angular.module("app.widgets")
    .directive('capitalizeLetter', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        text=text.charAt(0).toUpperCase() + text.slice(1);
                        ngModelCtrl.$setViewValue(text);
                        ngModelCtrl.$render();
                        return text;
                    }
                    return '';
                }            
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });


}());
