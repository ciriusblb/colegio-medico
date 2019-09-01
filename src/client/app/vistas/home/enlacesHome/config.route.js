(function(){
	'use strict';
	angular.module('home.enlacesHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Enlaces',
			config : {
				url : '/Enlace/:id',
				templateUrl : 'app/vistas/home/enlacesHome/enlacesHome.html',
				controller : 'EnlacesHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_EnlacesHome'
				// resolve: {
    //             	datos: servicio
    //         	}
			}
		}];
	}
	// function servicio(dataService,logger){
 //    	return dataService.getData('enlace').then(function(data){
	// 		logger.info('¡Vista de Configuración Activado!');
 //    		return data;
 //    	});
	// }

}());