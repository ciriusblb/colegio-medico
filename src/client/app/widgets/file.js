(function(){
    'use strict';
    angular.module('app.widgets')
        .directive('file', function(logger) {
        return {
            require:"ngModel",
            restrict: 'A',
            link: function($scope, el, attrs, ngModel){
                var typeImg=['image/jpg','image/png','image/jpeg'];
                var typeFile = ["doc","docm","docx","dot","dotm","dotx","pdf"];
                el.bind('change', function(event){
                    var files = event.target.files;
                    if(files.length){
                        if(attrs.ngModel=='image'){
                            if(typeImage(files[0].type)){
                                $scope.photoChanged(files);
                            }else{
                                logger.warning('¡Asegurese de que el formato del archivo sea jpg, png, o jpeg!');
                                return undefined;
                            }
                        }
                        if(attrs.ngModel=='application'){
                            if(typePdf(files[0].name)){
                                $scope.fileChanged(files);
                            }else{
                                logger.warning('¡Asegurese de que el formato del archivo sea pdf!');
                                return undefined;
                            }                      
                        }
                        ngModel.$setViewValue(files);
                        $scope.$apply();                        
                    };
                });

                function typeImage(type){          
                    for(var key in typeImg){
                        if(typeImg[key] === type) {
                            return true;
                        }
                    }
                    return false;
                }
                function typePdf(name){
                    for(var key in typeFile){
                        if(typeFile[key] === name.split('.')[name.split('.').length-1]) {
                            return true;
                        }
                    }
                    return false;
                }


            }
        };
    });


}());
