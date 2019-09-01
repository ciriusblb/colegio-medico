(function(){
	'use strict';
	angular.module('home.noticiasHome')
		.run(appRun);
	appRun.$inject = ['routehelper'];

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes(){
		return [{
			name : 'Vistas_Home.Vistas_Home_Noticias',
			config : {
				url : '/Noticia/:id',
				templateUrl : 'app/vistas/home/noticiasHome/noticiasHome.html',
				controller : 'NoticiasHome',
		 		controllerAs: 'vm',
				title : 'Vistas_Home_NoticiasHome'
			}
		}];
	}


}());