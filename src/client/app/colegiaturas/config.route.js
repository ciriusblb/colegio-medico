(function(){
	'use strict';
	 angular.module('app.colegiaturas')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Colegiaturas',
		 		config : {
		 			url:'/Colegiaturas',
		 			templateUrl : 'app/colegiaturas/colegiaturas.html',
		 			controller : 'Colegiaturas',
		 			controllerAs: 'vm',
		 			title : 'Colegiaturas',
		 			settings : {
			 				nav : 2,
			 				content : '<i class="fa fa-address-card"></i> Colegiaturas'
		 			},
		 			resolve:{
		 				datos:servicio
		 			}
		 		}
		 	}
	 	];
	 }

	 	function servicio(colegiadosService,logger){
    	return colegiadosService.getData().then(function(data){
			logger.info('¡Vista de Configuración Activado!');
    		return data;
    	});
    }



}());