(function(){
	'use strict';
	angular.module('home.informeHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Informe',
			config : {
				url : '/Informe/:id',
				templateUrl : 'app/vistas/home/informeHome/informeHome.html',
				controller : 'InformeHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_InformeHome'
				// resolve: {
    //             	datos: servicio
    //         	}
			}
		}];
	}
	// function servicio(dataService,logger){
 //    	return dataService.getData('informe').then(function(data){
	// 		logger.info('¡Vista de Configuración Activado!');
 //    		return data;
 //    	});
	// }


}());