(function(){
	'use strict';
	angular.module('servicios.nosotros')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Servicios.Vistas_Servicios_Nosotros',
			config : {
				url : '/Nosotros',
				templateUrl : 'app/vistas/servicios/nosotros/nosotros.html',
				controller : 'Nosotros',
		 		controllerAs: 'vm',
				title : 'Vistas_Servicios_Nosotros',
				resolve: {
                	datos: servicio
            	},
            	settings : {
		 			nav : 2,
		 			content : '<a href=""><i class="fa fa-building faicon" aria-hidden="true"> </i> Nosotros</a>'
	 			}
			}
		}];
	}
	function servicio(nosotrosService,logger){
    	return nosotrosService.getData().then(function(data){
			logger.info('¡Vista de Configuración Activado!');
    		return data;
    	});
	}

}());