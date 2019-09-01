(function(){
	'use strict';
	angular.module('home.videoHome')
		.controller('VideoHome',VideoHome);
	function VideoHome(homeService,$state,$rootScope,logger,servicios){
            var vm=this;
            vm.publicacion={
                id:'',
                titulo:'',
                video:'',
                tabla:'h_video',
                carpeta:'VIDEO',
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
                vm.buttons={edit:true,delete:true};
                vm.updates.disabled=true;  
            } 
            vm.guardar = function(formulario){
                if(formulario){
                    vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                    if(!vm.publicacion.id){
                        homeService.saveData(vm.publicacion).then(function(data){
                            vm.publicacionAux.id=data.id;
                            homeService.data=vm.publicacionAux;
                            vm.cancelar(vm.publicacion);
                            $rootScope.$broadcast('Publicacion','nueva');
                        }) 
                    }else{
                        homeService.editData(vm.publicacion).then(function(data){
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
                servicios.reInitObject(obj);
                vm.buttons={new:true};
                vm.updates.disabled=true;
                homeService.dataSelected=null;
                $state.go('Vistas_Home.Vistas_Home_Video', {id:0});
            }
            function eliminar(){
                vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                homeService.removeData(vm.publicacionAux).then(function(data){
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
