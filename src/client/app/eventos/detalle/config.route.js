(function(){
	'use strict';
	
	angular.module('eventos.detalle')
		.run(appRun);

	appRun.$inject  = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [{
			name : 'eventos.detalle',
			config : {
				url :'/:id',
				templateUrl : 'app/eventos/detalle/detalle.html',
				controller : 'eventosDetalle as vm',
				title : 'eventos.detalle',
			}
		}];
	}

}());