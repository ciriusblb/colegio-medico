(function(){
	'use strict';

	angular.module('app.layout')
		.controller('Sidebar',Sidebar);
	Sidebar.$inject = ['$state','routehelper','$scope','dataservice','$q','$cookieStore','$rootScope','homeService'];
	
	function Sidebar($state,routehelper,$scope,dataservice,$q,$cookieStore,$rootScope,homeService){
		var vm = this;
		var routes = routehelper.getRoutes();
		vm.isCurrent = isCurrent;
		vm.sesion=false;
		verify();

		function verify(){
			console.log(window.localStorage.getItem("token"));
			if(!window.localStorage.getItem("token")){
				vm.sesion=true;
			}else{
				vm.sesion=false;
				activate();
			}
		}

		$rootScope.$on('sesion',function(){
			verify();
		});
		function activate(){
			getNavRoutes();
		}

		function getNavRoutes(){
			$scope.navRoutes = routes.filter(function(r){
				return r.settings && r.settings.nav;
			}).sort(function(r1,r2){
				return r1.settings.nav - r2.settings.nav;
			});
		}
		function isCurrent(route){
			if(!route.title || !$state.current || !$state.current.title){
				return '';
			}
			var menuName = route.title;	
			return $state.current.title.substr(0,menuName.length) === menuName ? 'current':'';
		}
		vm.configurando= function(ruta){
            $rootScope.$broadcast('config');
		}
		vm.salir= function(){
			window.localStorage.removeItem("token");
			vm.sesion=true;
			$state.go('Sesion');
		}
	}


}());