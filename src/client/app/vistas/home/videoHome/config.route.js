(function(){
	'use strict';
	angular.module('home.videoHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Video',
			config : {
				url : '/Video/:id',
				templateUrl : 'app/vistas/home/videoHome/videoHome.html',
				controller : 'VideoHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_VideoHome',
				// resolve: {
    //             	datos: servicio
    //         	}
			}
		}];
	}


	// function servicio(dataService,logger){
 //    	return dataService.getData('video').then(function(data){
	// 		for (var i = 0; i < data.length; i++) {
	// 			var cortar= data[i].video.split('=');
	// 			data[i].imagen = "https://i.ytimg.com/vi/"+cortar[1].substring(0,11)+"/hqdefault.jpg";
	// 		}
	// 		logger.info('¡Vista de Configuración Activado!');
 //    		return data;
 //    	});
 //    }

}());