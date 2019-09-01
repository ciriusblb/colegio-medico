(function(){
	'use strict';
	angular.module('home.noticiasHome')
		.controller('NoticiasHome',NoticiasHome);
    NoticiasHome.$inject = ['logger','servicios','homeService','$state','$rootScope'];
	function NoticiasHome(logger,servicios,homeService,$state, $rootScope){
		var vm = this;
        vm.state=false;
		vm.publicacion={
			id:'',
			titulo:'',
			descripcion:'',
			imagen:'',
			fuente:'',
			blob:'',
			imagePath:'',
			tabla:'h_noticia',
            carpeta:'NOTICIA',
            fecha:new Date()
		}
		vm.buttons={
            new:true
        }  
        vm.updates={};
        vm.nuevo=nuevo;  
        vm.editar=editar;  
        vm.eliminar=eliminar;

       	if(homeService.dataSelected){
            vm.publicacion=JSON.parse(JSON.stringify(homeService.dataSelected));
            if(vm.publicacion.imagen || vm.publicacion.blob){
                vm.state=true;
            }
            vm.buttons={edit:true,delete:true};
            vm.updates.disabled=true;  
        }
	    vm.guardar = function(formulario){
	    	if(formulario && vm.state){
		    	vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                vm.publicacion.blob="";
		    	if(!vm.publicacion.id){
                    console.log(vm.publicacionAux);
		     		homeService.saveData(vm.publicacion).then(function(data){
                        vm.publicacionAux.id=data.id;
                        vm.publicacionAux.imagen=data.imagen;
                        homeService.data=vm.publicacionAux;
                        vm.cancelar(vm.publicacion);
                        $rootScope.$broadcast('Publicacion','nueva');
                    }) 
		    	}else{
		            homeService.editData(vm.publicacion).then(function(data){
                        vm.publicacionAux.imagen=data.imagen;
                        homeService.data=vm.publicacionAux;
                        vm.cancelar(vm.publicacion);
                        $rootScope.$broadcast('Publicacion','editada'); 
                    })
		    	}
	    	}else{
	    		logger.warning('¡Complete los campos y asegurese de subir una imagen!');
	    	}

	    }
		vm.cancelar = function(obj){
	        vm.state=false;
            servicios.reInitObject(obj);
            homeService.dataSelected=null;
            vm.buttons={new:true};
            vm.updates.disabled=true;
            $state.go('Vistas_Home.Vistas_Home_Noticias', {id:0});            
	    }
        function eliminar(){
            vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
            vm.publicacionAux.blob="";
            vm.eliminando={
                id:vm.publicacionAux.id,
                imagen:vm.publicacionAux.imagen,
                carpeta:vm.publicacionAux.carpeta,
                tabla:vm.publicacionAux.tabla,
            }
            homeService.removeData(vm.eliminando).then(function(data){
                homeService.data=vm.publicacionAux;
                vm.cancelar(vm.publicacion);
                $rootScope.$broadcast('Publicacion','eliminada');
            })
        }
	    function nuevo(){
            vm.buttons=vm.updates.obj={new:true};
            vm.updates.disabled=false;
        }
        function editar(){
            vm.updates.disabled=false;
        } 
	}
}());