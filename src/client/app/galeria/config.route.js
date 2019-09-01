(function(){
	'use strict';
	 angular.module('app.galeria')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Galeria',
		 		config : {
		 			url:'/Galeria',
		 			templateUrl : 'app/galeria/galeria.html',
		 			controller : 'Galeria',
		 			controllerAs: 'vm',
		 			title : 'Galeria',
		 			settings : {
			 				nav : 3,
			 				content : '<i class="fa fa-archive"></i> Galeria'
		 			},
		 			resolve: {
	                	datos: servicio
	            	}
		 		}
		 	}
	 	];
	 }
	 	function servicio(galeriaService,logger){
    	return galeriaService.getData().then(function(data){
			logger.info('¡Vista de Configuración Activado!');
    		return data;
    	});
	}



}());