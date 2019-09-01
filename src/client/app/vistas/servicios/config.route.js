(function(){
	'use strict';
	 angular.module('vistas.servicios')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Vistas_Servicios',
		 		config : {
		 			url:'/Servicios',
		 			abstract:true,
		 			templateUrl : 'app/vistas/servicios/servicios.html',
		 			controller : 'Servicios',
		 			controllerAs: 'vm',		 			 
		 			title : 'Vistas_Servicios',
		 			settings : {
			 				nav : 1.2,
			 				content : 'Servicios'
		 			}

		 		}
		 	}
	 	];
	 }
}());