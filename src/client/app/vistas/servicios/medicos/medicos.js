(function(){
	'use strict';
	angular.module('servicios.medicos')
		.controller('Medicos',Medicos);
	function Medicos(medicosService,logger,datos,servicios,$filter){
		var vm = this;
        vm.medicos=datos;
        vm.items=vm.medicos;
        vm.especialidades=servicios.doNewArray(vm.medicos,'especialidad');
        vm.idSelected=undefined;
        vm.pager={};
        vm.state=false;
        vm.newMedico={
        	id:'',
        	cmp:'',
        	nombre:'',
        	ap_paterno:'',
        	ap_materno:'',
        	especialidad:'',
        	email:'',
        	imagen:'',
            blob:'',
            imagePath:'',
            carpeta:'MEDICO',
            tabla:'h_medico'
        }
        vm.buttons={
            new:true
        }  
        vm.nuevo=nuevo;  
        vm.editar=editar;  
        vm.eliminar=eliminar;   
        vm.filtroOf=function(word){
            vm.items=$filter('filter')(vm.medicos,{especialidad:word});
            vm.word=word;
            return vm.items;
        }
        vm.ver=function(idx){
            if(vm.updates.disabled){
                var i = servicios.getPosicion(idx,vm.medicos);
                vm.newMedico=JSON.parse(JSON.stringify(vm.medicos[i]));
                vm.idSelected=idx;
                vm.state=true;
                vm.buttons={edit:true,delete:true};
                vm.updates.disabled=true;
            }
        }
        vm.cancelar=function(obj){
            servicios.reInitObject(obj);
            vm.state=false;
            vm.buttons={new:true};
            vm.updates.disabled=true;
            vm.idSelected=undefined;
        }
        vm.registrar=function(formulario){
            if(formulario && vm.state){
                vm.newMedicoAux=JSON.parse(JSON.stringify(vm.newMedico));
                vm.newMedico.blob="";
                if(!vm.newMedico.id){
                    medicosService.saveData(vm.newMedico).then(function(data){
                        vm.newMedicoAux.id=data.id;
                        vm.newMedicoAux.imagen=data.imagen;
                        vm.medicos.unshift(vm.newMedicoAux);
                        vm.cancelar(vm.newMedico);
                        logger.success('¡Publicación guardada!');
                    })  
                }else{
                    medicosService.editData(vm.newMedico).then(function(data){
                        vm.newMedicoAux.imagen=data.imagen;
                        var i = servicios.getPosicion(vm.idSelected,vm.medicos);
                        vm.medicos[i]=vm.newMedicoAux;
                        vm.cancelar(vm.newMedico);
                        logger.info('¡Publicación Editada!');
                    })
                }
            }else{
                logger.warning('¡Complete los campos y asegurese de subir todos los archivos!');
            }
        }

        function eliminar(){
            vm.newMedicoAux=JSON.parse(JSON.stringify(vm.newMedico));
            vm.newMedicoAux.blob="";
            medicosService.removeData(vm.newMedicoAux).then(function(data){
                var i = servicios.getPosicion(vm.idSelected,vm.medicos);
                vm.medicos.splice(i,1);
                vm.cancelar(vm.newMedico);
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