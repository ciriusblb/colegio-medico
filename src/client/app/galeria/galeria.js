(function(){
	'use strict';
	angular.module('app.galeria')
		.controller('Galeria',Galeria);
    Galeria.$inject = ['galeriaService','logger','datos','servicios'];
	function Galeria(galeriaService,logger,datos,servicios){
		var vm = this;
        vm.idSelected=undefined;
        vm.datos=datos;
        vm.state=false;
        vm.publicacion={
            id:'',
            imagen:'',
            blob:'',
            imagePath:'',
            carpeta:'GALERIA',
            tabla:'h_galeria'
        }
        vm.buttons={
            new:true
        }  
        vm.pager={};
        vm.updates={};
        vm.nuevo=nuevo;  
        vm.editar=editar;  
        vm.eliminar=eliminar;
        vm.guardar = function(){
            if(vm.state){
                vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                vm.publicacion.blob="";
                if(!vm.publicacion.id){
                    galeriaService.saveData(vm.publicacion).then(function(data){
                        vm.publicacionAux.id=data.id;
                        vm.publicacionAux.imagen=data.imagen;
                        vm.datos.unshift(vm.publicacionAux);
                        vm.cancelar(vm.publicacion);
                        logger.success('¡Publicación guardada!');
                    })  
                }else{
                    galeriaService.editData(vm.publicacion).then(function(data){
                        vm.publicacionAux.imagen=data.imagen;
                        var i = servicios.getPosicion(vm.idSelected,vm.datos);
                        vm.datos[i]=vm.publicacionAux;
                        vm.cancelar(vm.publicacion);
                        logger.info('¡Publicación Editada!');
                    })
                }
            }else{
                logger.warning('¡Complete los campos y asegurese de subir una imagen!');
            }
        }

        vm.ver=function(idx){
            var i = servicios.getPosicion(idx,vm.datos);
            vm.publicacion=JSON.parse(JSON.stringify(vm.datos[i]));
            vm.idSelected=idx;
            vm.state=true;
            vm.buttons={edit:true,delete:true};
            vm.updates.disabled=true;    
        }
        vm.cancelar = function(obj){
            vm.state=false;
            vm.idSelected=undefined;
            servicios.reInitObject(obj);
            vm.buttons={new:true};
            vm.updates.disabled=true;
        }
        function eliminar(){
            vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
            vm.publicacionAux.blob="";
            galeriaService.removeData(vm.publicacionAux).then(function(data){
                var i = servicios.getPosicion(vm.idSelected,vm.datos);
                vm.datos.splice(i,1);
                vm.cancelar(vm.publicacion);
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