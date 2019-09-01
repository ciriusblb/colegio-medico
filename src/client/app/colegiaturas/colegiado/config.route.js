(function(){
	'use strict';
	 angular.module('colegiaturas.colegiado')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Colegiaturas.Colegiado',
		 		config : {
		 			url:'/Colegiado/:id',
		 			templateUrl : 'app/colegiaturas/colegiado/colegiado.html',
		 			controller : 'Colegiado',
		 			controllerAs: 'vm',
		 			title : 'Colegiado'
		 		}
		 	}
	 	];
	 }



}());