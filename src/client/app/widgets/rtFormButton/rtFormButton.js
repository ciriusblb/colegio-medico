(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtFormButton', rtFormButton);
    function rtFormButton () {
        var directive = {
            scope: {
                buttons: '=',
                updates:'=',
                newButton:'&',
                editButton:'&',
                deleteButton:'&'
            },
            templateUrl: 'app/widgets/rtFormButton/rtFormButton.html',
            restrict: 'E',
            controller:function($scope){
                $scope.updates={
                    obj:{},
                    message:false,
                    disabled:true
                } 
/*                $scope.buttons={
                        new:true,
                        edit:false,
                        delete:false,
                    } */
                // var justOne = $scope.$watch('buttons', function (newVal, oldVal){     
                //     if(!checkObjectValues(newVal,oldVal)){
                //         if(newVal){            
                //             for( var property in oldVal ){
                //                 oldVal[property]=false;
                //                 if(setValueButtons(property,newVal)){
                //                     oldVal[property]=true;
                //                 }
                //             } 
                //             $scope.buttons=oldVal;
                //             console.log($scope.buttons);
                //             justOne();            
                //         }
                //     }
                // })
                // function checkObjectValues(a, b){
                //     if(!a || !b) return false;
                //     var aProperties = Object.getOwnPropertyNames(a); 
                //     var bProperties = Object.getOwnPropertyNames(b); 
                //     if (aProperties.length != bProperties.length) return false;
                //     for (var i = 0; i < aProperties.length; i++) {
                //         var saveNameProperty = aProperties[i];
                //         if ( a[saveNameProperty] !== b[saveNameProperty]) return false;
                //     }
                //     return true;
                // }
                // function setValueButtons(index,obj){
                //     for( var property in obj ){
                //         if(property==index){
                //             return true;
                //         }
                //     }
                //     return false;
                // }

            }
        };
        return directive;
    }
})();
