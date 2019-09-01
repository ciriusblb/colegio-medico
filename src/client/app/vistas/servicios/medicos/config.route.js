(function(){
	'use strict';
	angular.module('servicios.medicos')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Servicios.Vistas_Servicios_Medicos',
			config : {
				url : '/Medicos',
				templateUrl : 'app/vistas/servicios/medicos/medicos.html',
				controller : 'Medicos',
		 		controllerAs: 'vm',
				title : 'Vistas_Servicios_Medicos',
            	settings : {
		 			nav : 1,
		 			content : '<a href=""><i class="fa fa-user-md faicon" aria-hidden="true"> </i>Médicos</a>'
	 			},
				resolve: {
                	datos: servicio
            	}
			}
		}];
	}
	function servicio(medicosService,logger){
    	return medicosService.getData().then(function(data){
			logger.info('¡Vista de Configuración Activado!');
    		return data;
    	});
	}

}());