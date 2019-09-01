(function(){
	'use strict';
	angular.module('home.portalHome')
		.run(appRun);	
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Portal',
			config : {
				url : '/Portal/:id',
				templateUrl : 'app/vistas/home/portalHome/portalHome.html',
				controller : 'PortalHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_PortalHome'
			}
		}];
	}

	// function servicio(dataService,logger){
 //    	return dataService.getData('portal').then(function(data){
	// 		logger.info('¡Vista de Configuración Activado!');
 //    		return data;
 //    	});
	// }

}());