(function(){
	'use strict';

	angular.module('blocks.router')
		.provider('routehelperConfig',routehelperConfig)
		.factory('routehelper',routehelper)
		.run(changeStart);



		function changeStart($location,$state, $rootScope){
			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParamsl) {
				if(!window.localStorage.getItem("token")){
					if(toState.name!='Sesion'){
						event.preventDefault();
		    			$state.go('Sesion');
		    		}
				}else{
					if(toState.name=='Sesion'){
						event.preventDefault();
		    			$state.go('Vistas_Home');
		    		}
				}
			});
		}

	routehelper.$inject = ['$rootScope','$state','routehelperConfig'];

	function routehelperConfig (){
		this.config = {
			$urlRouterProvider : undefined,
			$stateProvider : undefined,
			docTitle : undefined
		};

		this.$get =  function(){
			return {config: this.config};
		};

	}

	function routehelper($rootScope,$state,routehelperConfig){
		var routes = [];
		var subRoutes = [];


		var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;
		var $stateProvider = routehelperConfig.config.$stateProvider;

		var service = {
			configureRoutes : configureRoutes,
			getRoutes : getRoutes,
			getSubRoutes: getSubRoutes
		};

		init();

		return service;



		function configureRoutes(routes){
            routes.forEach(function (route) {
                $stateProvider.state(route.name, route.config);
            });
            $urlRouterProvider.otherwise("/Sesion");
        }

		function getRoutes(){
			var rutaNueva="";
			for (var i = 0; i < $state.get().length; i++) {
				var route = $state.get()[i];
				var isRoute = !!route.title;
				if(isRoute){
					var subRoute = route.name.split("_");
					if (subRoute[1] && !subRoute[2]) {
						if (subRoute[0]!= rutaNueva) {							
							var navRoute = parseInt(route.settings.nav);
							var route = {
								name:subRoute[0],
								// url:'/'+subRoute[0],
								config: {
									title: subRoute[0]
								},
								settings : {
									nav : navRoute,
									content :'<i class="fa fa-sitemap"></i> '+subRoute[0]
								},
								children : []
							};
							for (var j = i; j < $state.get().length; j++) {
								var routeChildren = $state.get()[j];
								var isRoute = routeChildren.name.split("_");
								if (subRoute[0]==isRoute[0] && !isRoute[2]) {
									route.children.push(routeChildren);
								}
								

								/*-------------------------*/
								if(routeChildren.abstract){
									routeChildren.childrenViews=[];
								}
								var isView="";
								if(routeChildren.name.indexOf("Vistas_Servicios")===0){
									isView=routeChildren.name.split(".");
									if(isView.length>1){	
										route.children[1].childrenViews.push(routeChildren);
									}
								}

								/*-------------------------*/
								
							}
							rutaNueva = subRoute[0];
							routes.push(route);
						}
					}else{
						if(route.name.indexOf('.')==-1 && route.name.indexOf('_')==-1 && route.settings){
							routes.push(route);
						}	
					}
				}
			}
			return routes;
		}

		function getSubRoutes(parent) {
			for (var i = 0; i < $state.get().length; i++) {
				var route = $state.get()[i];
				var isRoute = !!route.title;
				if(route.name.indexOf(parent)===0){
					var isView=route.name.split(".");
					if(isView.length>1){	
						subRoutes.push(route);
					}
				}
			}
			console.log(subRoutes);
			return subRoutes;
		}

		function init(){
			updateDocTitle();
		}

		function updateDocTitle(){
			$rootScope.$on('$stateChangeSuccess',function(event,toState,fromState){
				var title = routehelperConfig.config.docTitle + ' ' +(toState.title || '');
                    $rootScope.title = title;
			});
		}
	}



}());
