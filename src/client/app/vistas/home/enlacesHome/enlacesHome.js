(function(){
	'use strict';
	angular.module('home.enlacesHome')
		.controller('EnlacesHome',EnlacesHome);
    EnlacesHome.$inject = ['homeService','$state','$rootScope','logger','servicios'];
	function EnlacesHome(homeService,$state,$rootScope,logger,servicios){
		var vm = this;
        vm.state=false;
        vm.publicacion={
            id:'',
            imagen:'sdfsdfsdf',
            url:'',
            blob:'',
            imagePath:'',
            tabla:'h_enlace',
            carpeta:'ENLACE'
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
            vm.buttons={new:true};
            vm.updates.disabled=true;
            homeService.dataSelected=null;
            $state.go('Vistas_Home.Vistas_Home_Enlaces', {id:0});  
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
            vm.buttons={new:true};
            vm.updates.disabled=false;
        }
        function editar(){
            vm.updates.disabled=false;
        }
	}
}());