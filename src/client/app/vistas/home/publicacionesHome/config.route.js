(function(){
	'use strict';
	angular.module('home.publicacionesHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Publicaciones',
			config : {
				url : '/Publicacion/:id',
				templateUrl : 'app/vistas/home/publicacionesHome/publicacionesHome.html',
				controller : 'PublicacionesHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_PublicacionesHome'
				// resolve: {
    //             	datos: servicio
    //         	}
			}
		}];
	}

	// function servicio(dataService,logger){
 //    	return dataService.getData('publicacion').then(function(data){
	// 		logger.info('¡Vista de Configuración Activado!');
 //    		return data;
 //    	});
	// }

}());