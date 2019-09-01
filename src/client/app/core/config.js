(function(){
	'use strict';

	var core = angular.module('app.core');

	core.config(jwtIntercepor);
	core.config(configure);
	core.config(toastrConfig);



	function jwtIntercepor(jwtInterceptorProvider,$httpProvider) {
		jwtInterceptorProvider.tokenGetter= function(){
			return window.localStorage.getItem("token");
		}	
		$httpProvider.interceptors.push("jwtInterceptor");	
	}

    function toastrConfig(toastr){
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    var config = {
        appErrorPrefix: '[NG-News-App Error] ', //configurar el exceptionHandler decorator
        appTitle: 'News-App Angular Admin',
        version: '1.0.0'
    };

       core.value('config', config);
	function configure($logProvider,$urlRouterProvider,$stateProvider,routehelperConfigProvider){
		//activa o desactiva el debugging
		if($logProvider.debugEnabled){
			$logProvider.debugEnabled(true);
		}


		routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
		routehelperConfigProvider.config.$stateProvider = $stateProvider;
		routehelperConfigProvider.config.docTitle = 'NG-Avengers';


	}


}());