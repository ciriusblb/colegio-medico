(function(){
	'use strict';

	angular.module('colegiaturas.colegiado')
		.controller('Colegiado',Colegiado);
    Colegiado.$inject = ['$scope','logger','colegiadosService','$filter','$q','servicios','$state','$rootScope'];
	function Colegiado($scope,logger,colegiadosService,$filter,$q,servicios,$state,$rootScope){
        var vm = this;
        vm.buttons={
            new:true
        }  
        vm.updates=colegiadosService.updates;
        vm.newColegiado={
            id:'',
            nombre:'',
            ap_Paterno:'',
            ap_Materno:'',
            tipo_Colegiado:'',
            tipo_Documento:'',
            documento:'',
            email:'',
            especialidad:'',
            direccion:'',
            celular:'',
            fecha_Nac:'',
            estado:'',
            comunicar:false
        }             
        vm.nuevo=nuevo;  
        vm.editar=editar;  
        vm.eliminar=eliminar; 

        if(colegiadosService.dataSelected){
        	vm.newColegiado=JSON.parse(JSON.stringify(colegiadosService.dataSelected));
            vm.newColegiado.fecha_Nac=new Date(vm.newColegiado.fecha_Nac);                
            vm.buttons={edit:true,delete:true};
            vm.updates.disabled=true; 
        } 

     	vm.registrar=function(formulario){
            if(formulario){
                vm.auxColegiado=JSON.parse(JSON.stringify(vm.newColegiado));
                if(!vm.newColegiado.id){
                    colegiadosService.saveData(vm.newColegiado).then(function(data){
                        vm.auxColegiado.id=data.id;
                        colegiadosService.data=vm.auxColegiado;
                        vm.cancelar(vm.newColegiado);
                        $rootScope.$broadcast('Colegiado','nuevo');
                    })  
                }else{
                    colegiadosService.editData(vm.newColegiado).then(function(data){
                        colegiadosService.data=vm.auxColegiado;
                        vm.cancelar(vm.newColegiado);
                        $rootScope.$broadcast('Colegiado','editado');
                    })
                }
            }else{
                logger.warning('¡Complete todos los campos!');
            }
     	}

        vm.showDatepicker=function($event){
            $event.preventDefault();
            $event.stopPropagation();
            vm.open=!vm.open;
        }
    	vm.cancelar = function(obj){
            servicios.reInitObject(obj);
            vm.buttons={new:true};
            vm.updates.disabled=true;
            colegiadosService.updates.disabled=true;
            colegiadosService.updates.idSelected=undefined;
            colegiadosService.dataSelected=null;
            $state.go('Colegiaturas.Colegiado', {id:0});  
    	}

        function nuevo(){
            vm.buttons={new:true};
            vm.updates.disabled=false;
            colegiadosService.updates.disabled=false;
        }
        function editar(){
            vm.updates.disabled=false;
            colegiadosService.updates.disabled=false;
        }    
        function eliminar(){
            vm.auxColegiado=JSON.parse(JSON.stringify(vm.newColegiado));
            colegiadosService.removeData(vm.auxColegiado.id).then(function(data){
                colegiadosService.data=vm.auxColegiado;
                vm.cancelar(vm.newColegiado);
                $rootScope.$broadcast('Colegiado','eliminado');
            })
        }
	}
}());
