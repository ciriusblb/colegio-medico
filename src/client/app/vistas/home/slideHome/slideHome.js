(function(){
	'use strict';
	angular.module('home.slideHome')
		.controller('SlideHome',SlideHome);
    SlideHome.$inject = ['logger','servicios','homeService','$rootScope','$state'];
	function SlideHome(logger,servicios,homeService,$rootScope,$state){
		var vm=this;
        vm.state=false;
        vm.publicacion={
            id:'',
            titulo:'',
            descripcion:'',
            imagen:'',
            blob:'',
            imagePath:'',
            tabla:'h_slide',
            carpeta:'SLIDE'
        }
        vm.cropper = {sourceImage:null,croppedImage:null};
        vm.bounds = {left:50,right:50,top:50,bottom:50};
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
        vm.guardar = function(){
            if(vm.state!=false){
                vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                if(!vm.state){
                    vm.publicacionAux.blob=vm.cropper.croppedImage;
                    vm.publicacion.imagePath= servicios.transformToFile(vm.cropper.croppedImage);
                }  
                vm.publicacion.blob="";
                if(!vm.publicacion.id){
                    homeService.saveData(vm.publicacion).then(function(data){
                        vm.publicacionAux.id=data.id;
                        vm.publicacionAux.imagen=data.imagen;
                        homeService.newData=vm.publicacionAux;
                        vm.cancelar(vm.publicacion);
                        $rootScope.$broadcast('guardar');
                    })  
                }else{                    
                    homeService.editData(vm.publicacion).then(function(data){
                        vm.publicacionAux.imagen=data.imagen;
                        homeService.putData=vm.publicacionAux;
                        vm.cancelar(vm.publicacion);
                        $rootScope.$broadcast('editar'); 
                    })
                }
            }else{
                logger.warning('¡Necesita una imágen!');                  
            }
        }
        vm.cancelar = function(obj){
            vm.state=false;
            vm.bounds = {left:50,right:50,top:50,bottom:50};
            vm.cropper = {sourceImage:null,croppedImage:null};
            vm.publicacion = servicios.reInitObject(obj);
            vm.buttons={new:true};
            vm.updates.disabled=true;
            homeService.dataSelected=null;
            $state.go('Vistas_Home.Vistas_Home_Slide', {id:0});            
        }

        function eliminar(){
            vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
            vm.publicacionAux.blob="";
            homeService.removeData(vm.publicacionAux).then(function(data){
                homeService.deleteData=vm.publicacionAux;
                vm.cancelar(vm.publicacion);
                $rootScope.$broadcast('eliminar');
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