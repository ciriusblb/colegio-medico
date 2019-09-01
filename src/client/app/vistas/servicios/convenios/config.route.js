(function(){
	'use strict';
	angular.module('servicios.convenios')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Servicios.Vistas_Servicios_Convenios',
			config : {
				url : '/Convenios',
				templateUrl : 'app/vistas/servicios/convenios/convenios.html',
				controller : 'Convenios',
		 		controllerAs: 'vm',
				title : 'Vistas_Servicios_Convenios',
				resolve: {
                	datos: servicio
            	},
            	settings : {
		 			nav : 3,
		 			content : '<a href=""><i class="fa fa-compress faicon" aria-hidden="true"> </i> Convenios</a>'
	 			}
			}
		}];
	}
	function servicio(conveniosService,logger){
    	return conveniosService.getData().then(function(data){
			logger.info('¡Vista de Configuración Activado!');
    		return data;
    	});
	}

}());