(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtWidgetHeader', rtWidgetHeader);

    /* @ngInject */
    function rtWidgetHeader () {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        // Creates:
        // <div data-cc-widget-header=""
        //      title="Avengers Movie"
        //      allow-collapse="true" </div>
        var directive = {
//            link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/widgets/rtWidgetHeader/rtWidgetHeader.html',
            restrict: 'E'
        };
        return directive;

//        function link(scope, element, attrs) {
//            attrs.$set('class', 'widget-head');
//        }
    }
})();
