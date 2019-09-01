(function(){
	'use strict';

	angular.module('vistas.servicios')
		.controller('Servicios',Servicios);

	function Servicios($scope,$state,routehelper){
		var vm = this;	
		// vm.isCurrent = isCurrent;

		// var subRoutes = routehelper.getSubRoutes();
		// console.log(subRoutes);


		// activate();
		// function activate(){
		// 	getNavRoutes();
		// }


		// $scope.changedS

		// function getNavRoutes(){
		// 	$scope.subRoutes = subRoutes.filter(function(r){
		// 		return r.settings && r.settings.nav;
		// 	}).sort(function(r1,r2){
		//         return r1.settings.nav - r2.settings.nav;
		// 	});
		// }

		// function isCurrent(route){
		// 	if(!route.title || !$state.current || !$state.current.title){

		// 		return '';
		// 	}
		// 	var menuName = route.title;	
		// 	return $state.current.title.substr(0,menuName.length) === menuName ? 'current':'';
		// }
	}      
}());
