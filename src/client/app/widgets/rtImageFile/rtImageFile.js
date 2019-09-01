(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtImageFile', rtImageFile);
    function rtImageFile (homeService,$timeout) {
        var directive = {
            scope: {
                alto:'@',
                publicacion:'=',
                state:'=',
                archivo:'=',
                cropper:'=',
                tabla:'=',
                carpeta:'='
            },
            templateUrl: 'app/widgets/rtImageFile/rtImageFile.html',
            restrict: 'E',
            controller:function($scope){ 

                $scope.fileReaderSupported = window.FileReader != null;
                $scope.photoChanged = function(files){
                    if (files != null) {
                        $scope.publicacion.imagePath=files[0];
                        if($scope.publicacion.imagen){
                            $scope.publicacion.eliminarImagen=$scope.publicacion.imagen;
                        }
                        if ($scope.fileReaderSupported) {
                            $timeout(function() {
                                var fileReader = new FileReader();
                                fileReader.readAsDataURL(files[0]);
                                fileReader.onload = function(e) {
                                    $timeout(function(){
                                        $scope.publicacion.blob = e.target.result;
                                        if($scope.cropper!=undefined){
                                            var image = new Image();
                                            image.src = e.target.result;  
                                            $scope.cropper.croppedImage=e.target.result;
                                            $scope.cropper.sourceImage=e.target.result;

                                            image.onload = function () {
                                                var height = this.height;
                                                var width = this.width;
                                                if(width>=1200 || height>=400){
                                                    $scope.state=undefined;
                                                }else{
                                                    $scope.state=true;
                                                }
                                            };
                                        }else{
                                            $scope.state=true;
                                        }
                                    });
                                }
                            });
                        }
                    }
                };

                $scope.fileChanged = function(files){
                    if (files != null) {
                        $scope.publicacion.archivePath=files[0];
                        if($scope.publicacion.archivo){
                            $scope.publicacion.eliminarArchivo=$scope.publicacion.archivo;
                        }
                        $scope.publicacion.nombre_archivo=$scope.publicacion.archivePath.name;
                        console.log($scope.publicacion);
                        $scope.archivo=true;
                    }
                };

            }
        };
        return directive;
    }
})();
