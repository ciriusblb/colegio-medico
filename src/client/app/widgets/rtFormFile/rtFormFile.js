(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtFormFile', rtFormFile);
    function rtFormFile () {
        var directive = {
            scope: {
                dato: '='
            },
            templateUrl: 'app/widgets/rtFormFile/rtFormFile.html',
            restrict: 'E',
            controller:function($scope){
                $scope.formulario=JSON.parse(JSON.stringify($scope.dato));
                $scope.dateOptions = {
                    formatYear: 'yyyy',
                    startingDay: 1,
                    minMode: 'year'
                  };
                $scope.status = {
                    start : false,
                    end : false
                }
                // $scope.texto=[];
                $scope.$watch('dato', function (newVal, oldVal){ 
                    // $scope.stringd =  $scope.dato.descripcion.replace(/(\r\n|\n|\r)/gm,'---');
                    // $scope.stringd = $scope.stringd.split('---');
                    // for (var i = 0; i < $scope.stringd.length; i++) {
                    //     $scope.texto.push({text:$scope.stringd[i]});
                    // }
                    if($scope.dato.mandato){
                        var years =$scope.dato.mandato.split(' - ');
                        $scope.dato.mandato={};
                        $scope.dato.mandato.inicio=(parseInt(years[0])+1).toString();
                        $scope.dato.mandato.fin=(parseInt(years[1])+1).toString();                                           
                        $scope.dato.mandato.inicio=new Date($scope.dato.mandato.inicio);
                        $scope.dato.mandato.fin=new Date($scope.dato.mandato.fin); 
                    }

                })

                $scope.showDatepicker=function(status){
                    $scope.status[status]  = true;                    
                }

            }
        };
        return directive;
    }
})();
