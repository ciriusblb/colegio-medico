(function(){
	'use strict';
	 angular.module('vistas.home')
	 	.run(appRun);

	appRun.$inject = ['routehelper'];

	 function appRun(routehelper){

	 	routehelper.configureRoutes( getRoutes() );

	 }

	 function getRoutes(){
	 	return[
		 	{
		 		name: 'Vistas_Home',
		 		config : {
		 			url:'/Home',
		 			templateUrl : 'app/vistas/home/home.html',
		 			controller : 'Home',
		 			controllerAs: 'vm',
		 			title : 'Vistas_Home',
		 			settings : {
			 				nav : 1.1,
			 				content : 'Home'
		 			}
		 		}
		 	}
	 	];
	 }
}());