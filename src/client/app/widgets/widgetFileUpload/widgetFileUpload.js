(function(){
	'use strict';
	angular.module('app.widgets')
		.directive('rtFileUpload',rtFileUpload);

	rtFileUpload.$inject = ['$timeout','logger'];

	function rtFileUpload($timeout,logger){
		return {
			restrict : 'E',
			scope :{
				optionTipo : '@',
				archivo: '=',
				input: '@',
				visible : '@',
				minHeight  : '=',
				minWidth : '='
			},
			link:function(scope, element, attrs){
				scope.archivo.recorte0;
				scope.fileReaderSupported = window.FileReader != null;
				element.bind('change', function (file) {
                        photoChanged(file.target.files,scope);
                });
                scope.borrar= function(){
			    	if (scope.archivo.src) {
			    		scope.archivo.srcOld = scope.archivo.src;
			    	}
			    	scope.archivo = [];
			    	scope.archivo.src = null;
			    }
			},
			templateUrl : 'app/widgets/widgetFileUpload/rtFileUploadTemplate.html',    

		};
		function photoChanged(file,scope){
    		if (file.length>0) {

	            var file = file[0];
	            var fileReader = new FileReader();
	            if (scope.fileReaderSupported && file.type.indexOf('image') > -1) {
	                $timeout(function() {
	                    fileReader.onload = function(e) {
	                        $timeout(function(){
	                        	var image = new Image();
	                        	image.src = e.target.result;
                        	 	image.onload = function(){
	                        		var height = this.height;
	                        		var width = this.width;
	                        		if (height >=  scope.minHeight && width >= scope.minWidth) {
	                        			scope.archivo.push({imagen:file,blob:e.target.result});
	                        			scope.$apply();
	                        		}
	                        	}

	                        });
	                    }
	                    fileReader.readAsDataURL(file);
	                });
	            }else{logger.warning("No se admite este tipo de archivos");}
	        }
	    }

	}

}());