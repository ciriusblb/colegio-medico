(function(){
	'use strict';
	 angular.module('colegiaturas.comunicado')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Colegiaturas.Comunicado',
		 		config : {
		 			url:'/Comunicado',
		 			templateUrl : 'app/colegiaturas/comunicado/comunicado.html',
		 			controller : 'Comunicado',
		 			controllerAs: 'vm',
		 			title : 'Comunicado'
		 		}
		 	}
	 	];
	 }



}());