(function(){
	'use strict';

	angular.module('app.eventos')
		.run(appRun);

	appRun.$inject  = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [{
			name : 'eventos',
			config : {
				url :'/eventos',
				templateUrl : 'app/eventos/eventos.html',
				controller : 'Eventos as vm',
				title : 'eventos',
				settings : {
					state : true,
					nav : 4 ,
					content : '<i class="fa fa-calendar"></i>Eventos'
				}
			}
		}];
	}



}());