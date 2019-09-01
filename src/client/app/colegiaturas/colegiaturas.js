(function(){
	'use strict';

	angular.module('app.colegiaturas')
		.controller('Colegiaturas',Colegiaturas);
    Colegiaturas.$inject = ['logger','colegiadosService','datos','$rootScope','servicios','$state'];
	function Colegiaturas(logger,colegiadosService,datos,$rootScope,servicios,$state){
		var vm = this;
        vm.all=false;
        vm.selected=[{selected:true},{selected:true}];
        vm.props=['especialidad','tipo_Documento'];
        vm.request={};
        vm.updates=colegiadosService.updates;
        vm.colegiados=datos;
        servicios.items=vm.colegiados;
        vm.items=vm.colegiados;
        vm.tipos=[{tipo_Colegiado:'ORDINARIO',selected:false},{tipo_Colegiado:'TEMPORAL',selected:false}];
        vm.estados=[{estado:'HABILITADO',selected:false},{estado:'NO HABILITADO',selected:false}];
        vm.tofilter=servicios.doNewArrays(vm.items,vm.props);
        $state.go('Colegiaturas.Colegiado',{id:0});

        $rootScope.$on('Colegiado',function(event, action){
            if(colegiadosService.data){
                var i = servicios.getPosicion(colegiadosService.data.id,vm.colegiados);
                switch(action){
                    case 'nuevo': vm.colegiados.unshift(colegiadosService.data);break;
                    case 'editado': vm.colegiados[i]=colegiadosService.data;break;
                    case 'eliminado': vm.colegiados.splice(i,1);break;
                }
                reinit();
                colegiadosService.data=null;
                logger.success('Colegiado '+action+'!');
            }
        });
        function reinit(){
            vm.items=servicios.secondaryFilter(vm.colegiados,vm.request,vm.tofilter,vm.props);
            vm.tofilter=servicios.doNewArrays(vm.colegiados,vm.props);
            vm.tofilter=servicios.verifyFilters(vm.items,vm.tofilter,vm.props,-1);
            vm.updates=colegiadosService.updates;
            vm.items= vm.items.length === 0 ? vm.colegiados:vm.items;
        }
        vm.changeView = function(state){
            if(state && !vm.updates.message && vm.updates.disabled && !vm.updates.idSelected){
                vm.updates.message=true;
                vm.cambiarTodos(false);
                $state.go('Colegiaturas.Comunicado');
            }
            if(!state && vm.updates.message){
                vm.updates.message=false;
                $state.go('Colegiaturas.Colegiado',{id:0});
            }
        }
        vm.ver=function(idx){
            if(!vm.updates.message){
                if(vm.updates.disabled){
                    var i = servicios.getPosicion(idx,vm.colegiados);
                    vm.updates.idSelected=idx;
                    colegiadosService.dataSelected=vm.colegiados[i];
                    $state.go('Colegiaturas.Colegiado', {id:idx});
                }   
            }
        }
        vm.change = function(id){
            var i = servicios.getPosicion(id,vm.colegiados);
            vm.colegiados[i].comunicar=!vm.colegiados[i].comunicar;  
            vm.all=servicios.verifyAll(vm.items,'comunicar');
        }

        vm.filtro=function(array,idx,ind,prop,word){
            console.log(vm.updates);
            vm.request[prop]=word;
            vm.selected[ind].selected=false;
            array.filter(function(item){ 
              item.selected=false;
            });
            array[idx].selected=true;
            vm.items=servicios.mainFilter(vm.colegiados,vm.request);
            vm.tofilter=servicios.doNewArrays(vm.items,vm.props);
            vm.cambiarTodos(false);
            return vm.items;
        }
        vm.reset= function(array,i,prop){
            delete vm.request[prop];
            array.filter(function(item){ 
              item.selected=false;
            });
            vm.items=servicios.mainFilter(vm.colegiados,vm.request);
            vm.tofilter=servicios.doNewArrays(vm.items,vm.props);
            vm.cambiarTodos(false);
            return vm.items;
        }
        vm.filtro2 = function(idx,i){
            console.log(vm.updates);

            vm.ind=i;
            vm.tofilter[i][idx].selected=!vm.tofilter[i][idx].selected;
            vm.items=servicios.secondaryFilter(vm.colegiados,vm.request,vm.tofilter,vm.props);
            vm.tofilter=servicios.verifyFilters(vm.items,vm.tofilter,vm.props,i);
            vm.cambiarTodos(false);
            return vm.items;
        }
        vm.cambiarTodos=function(all){
            vm.all=all;
            for (var i = 0; i < vm.colegiados.length; i++) {
                vm.colegiados[i].comunicar=false;
                for (var j = 0; j < vm.items.length; j++) {
                    if(vm.items[j].id==vm.colegiados[i].id){
                        vm.items[j].comunicar=all;
                        vm.colegiados[i].comunicar=all;
                        break;
                    }
                }              
            }
        } 
	}
}());