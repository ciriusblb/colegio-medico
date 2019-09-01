(function(){
	'use strict';

	angular.module('vistas.home')
		.controller('Home',Home);

	function Home($scope,servicios,logger,$rootScope,$state,homeService,$timeout,routehelper,$filter){
		var vm=this;   
        vm.goSubView=goSubView;
        var subRoutes = routehelper.getSubRoutes('Vistas_Home');

        vm.config=false;
        vm.slickConfig=true;
        vm.ruta='';

        vm.pager={};
        vm.jota=null;


        $rootScope.$on('Publicacion',function(event,action){
            if(homeService.data){
                for (var i = 0; i < vm.datos.length; i++) {
                    if(vm.datos[i].tabla==homeService.data.tabla){
                        vm.slickConfig=false
                        var j = servicios.getPosicion(homeService.data.id,vm.datos[i].datos);
                        switch(action){
                            case 'nueva':vm.datos[i].datos.unshift(homeService.data);break;
                            case 'editada':vm.datos[i].datos[j]=homeService.data;break;
                            case 'eliminada':vm.datos[i].datos.splice(j,1);break;
                        }
                        vm.items=vm.datos[i].datos;
                        $timeout(function () {
                            vm.slickConfig = true;
                        }); 
                    }
                }
                homeService.data=null;
                logger.success('¡Publicación '+action+'!');                
            }
        });

        $rootScope.$on('config',function(){
            vm.config=false;
            homeService.dataSelected=null;
            if(vm.datos){
                for (var i = 0; i < vm.datos.length; i++) {
                    vm.datos[i].config=false;
                }                
            }

            vm.items=[];
        });
		init();    
		function init(){
            homeService.getAll().then(function(data){
                vm.datos=data; 
                console.log(vm.datos);
                if($state.current.url.split('/')[1] != 'Home'){
                     goSubView($state.current.name);
                }
                logger.info('¡Vista Home Activado!');
            })


		}
        function goSubView(ruta){
            for (var i = 0; i < subRoutes.length; i++) {
                if(ruta==subRoutes[i].name){
                    for (var j = 0; j < vm.datos.length; j++) {
                        if(vm.datos[j].carpeta==subRoutes[i].url.split('/')[1].toUpperCase()){
                            vm.config=true;
                            vm.datos[j].config=true;
                            vm.items=vm.datos[j].datos;
                            vm.jota=j;
                            vm.ruta=ruta;
                            $state.go(ruta, {id:0});            
                        }
                    }
                }
            }
        }
         
        vm.filter=function(word){
            vm.items=$filter('filter')(vm.datos[vm.jota].datos,{descripcion:word});
            return vm.items;
        }
        vm.filter2=function(word){
            vm.items=$filter('filter')(vm.datos[vm.jota].datos,{titulo:word});
            return vm.items;
        }
        vm.ver=function(id,idx){
            var i= servicios.getPosicion(id,vm.datos[idx].datos);
            var dato=vm.datos[idx].datos[i];
            dato.carpeta=vm.datos[idx].carpeta;
            dato.tabla=vm.datos[idx].tabla;
            homeService.dataSelected=dato;
            vm.idSelected=homeService.dataSelected.id;
            $state.go(vm.ruta, {id:id});
        }
	}
}());


