(function(){
	'use strict';
	angular.module('app.widgets')
		.directive('docUpload',docUpload);

    docUpload.$inject = ['$timeout','logger'];

	function docUpload($timeout,logger){
		return {
                templateUrl:'app/widgets/widgetDocUpload/docUploadView.html',
                scope : {
                	tipo :'@',
                	resultado : '='
                },
                link: function (scope, element) {
                    if (!scope.resultado.url) {
                        scope.resultado.url = null;
                        scope.resultado.nombre = null;
                    }
                    scope.fileReaderSupported = window.FileReader != null;
                    element.bind('change', function (file) {
                        changed(file.target.files,scope);
                    });

                    scope.eliminar = function(){
                        scope.resultado = {url:null,nombre:null};
                    }
                    scope.visualizar = function(){
                        // var blob = new Blob([me.s2ab(window.atob(datas.data))], {
                        // type: mimesType[me.indexFormato]
                        //     });
                        // var href = URL.createObjectURL(scope.resultado.blob);
                        window.open(scope.resultado.blob);
                    }


                }
        };

        function changed(file,scope){
            if (file.length>0) {
                    var file = file[0];
                    if (scope.fileReaderSupported && verificarTipo(file,scope.tipo) ) {
                        console.log("archivo permitido");
                            $timeout(function() {
                                    var fileReader = new FileReader();
                                    fileReader.readAsDataURL(file);
                                    fileReader.onload = function(e) {
                                        $timeout(function(){
                                            scope.resultado.url = file;
                                            scope.resultado.nombre = file.name.substring(0,file.name.lastIndexOf("."));
                                        });
                                }
                            });
                    }
            }
            
        }
        function verificarTipo(file,tipo){
            var tipo_word = [{type : 'vnd.openxmlformats-officedocument.wordprocessingml.document'},
                            {type : 'application/msword'},
                            {type : 'vnd.openxmlformats-officedocument.wordprocessingml.template'},
                            {type : 'vnd.ms-word.template.macroEnabled.12'},
                            {type : 'vnd.ms-word.document.macroEnabled.12'}
                        ];
             var tipo_pdf = [{type : 'pdf'}];
             var mimeType = [];
             mimeType = tipo_pdf;
             if (tipo=='doc') {mimeType = tipo_word;}
             for (var i = 0; i < mimeType.length; i++) {
                 if (file.type.indexOf(mimeType[i].type) > -1) {
                    return true;
                 }
             }
             logger.warning("No se admite este tipo de archivos");
             return false;
        }


	}

}());