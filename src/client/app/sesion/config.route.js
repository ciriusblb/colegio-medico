(function(){
	'use strict';
	 angular.module('app.sesion')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Sesion',
		 		config : {
		 			url:'/Sesion',
		 			templateUrl : 'app/sesion/sesion.html',
		 			controller : 'Sesion',
		 			controllerAs: 'vm',
		 			title : 'Sesion',
		 		}
		 	}
	 	];
	 }
}());

