(function(){
	'use strict';
	angular.module('home.slideHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Slide',
			config : {
				url : '/Slide/:id',
				templateUrl : 'app/vistas/home/slideHome/slideHome.html',
				controller : 'SlideHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_SlideHome'
			}
		}];
	}
}());