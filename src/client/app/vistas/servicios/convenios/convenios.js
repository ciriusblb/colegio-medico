(function(){
        'use strict';
        angular.module('servicios.convenios')
            .controller('Convenios',Convenios);
        Convenios.$inject = ['conveniosService','logger','datos','servicios'];
        function Convenios(conveniosService,logger,datos,servicios){
            var vm=this;
            vm.archivo=false;
            vm.datos=datos;
            vm.state=false;
            vm.idSelected=undefined;
            vm.publicacion={
                id:'',
                titulo:'',
                descripcion:'',
                imagen:'',
                archivo:'',
                nombre_archivo:'', 
                blob:'',
                imagePath:'',
                archivePath:'',
                carpeta:'CONVENIO',
                tabla:'h_convenio'
            }
            vm.buttons={
                new:true
            }  
            vm.updates={};
            vm.nuevo=nuevo;  
            vm.editar=editar;  
            vm.eliminar=eliminar;
            vm.guardar = function(formulario){
                if(formulario && vm.state && vm.archivo){
                    vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                    vm.publicacion.blob="";
                    if(!vm.publicacion.id){
                        conveniosService.saveData(vm.publicacion).then(function(data){
                            vm.publicacionAux.id=data.id;
                            vm.publicacionAux.imagen=data.imagen;
                            vm.publicacionAux.archivo=data.archivo;
                            vm.datos.unshift(vm.publicacionAux);
                            vm.cancelar(vm.publicacion);
                            logger.success('¡Publicación guardada!');
                        })  
                    }else{
                        conveniosService.editData(vm.publicacion).then(function(data){
                            vm.publicacionAux.imagen=data.imagen;
                            vm.publicacionAux.archivo=data.archivo;
                            var i = servicios.getPosicion(vm.idSelected,vm.datos);
                            vm.datos[i]=vm.publicacionAux;
                            vm.cancelar(vm.publicacion);
                            logger.info('¡Publicación Editada!');
                        })
                    }
                }else{
                    logger.warning('¡Complete los campos y asegurese de subir todos los archivos!');
                }
            }

            vm.cancelar = function(obj){
                vm.state=false;
                vm.archivo=false;
                vm.idSelected=undefined;
                servicios.reInitObject(obj);
                vm.buttons={new:true};
                vm.updates.disabled=true;
            }
            vm.ver=function(idx){
                var i = servicios.getPosicion(idx,vm.datos);
                vm.publicacion=JSON.parse(JSON.stringify(vm.datos[i]));
                vm.idSelected=idx;
                if(vm.publicacion.archivo){
                    vm.archivo=true;
                }
                vm.state=true;
                vm.buttons={edit:true,delete:true};
                vm.updates.disabled=true;
            }
            function eliminar(){
                vm.publicacionAux=JSON.parse(JSON.stringify(vm.publicacion));
                vm.publicacionAux.blob="";
                vm.eliminando={
                    id:vm.publicacionAux.id,
                    imagen:vm.publicacionAux.imagen,
                    carpeta:vm.publicacionAux.carpeta,
                    tabla:vm.publicacionAux.tabla,
                    archivo:vm.publicacion.archivo
                }
                conveniosService.removeData(vm.eliminando).then(function(data){
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