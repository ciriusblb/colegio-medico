(function(){
	'use strict';
	angular.module('home.personajesHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Personajes',
			config : {
				url : '/Personaje/:id',
				templateUrl : 'app/vistas/home/personajesHome/personajesHome.html',
				controller : 'PersonajesHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_PersonajesHome'
			}
		}];
	}
	
	// function servicio(dataService,logger){
 //    	return dataService.getData('personaje').then(function(data){
	// 		logger.info('¡Vista de Configuración Activado!');
 //    		return data;
 //    	});
	// }

}());