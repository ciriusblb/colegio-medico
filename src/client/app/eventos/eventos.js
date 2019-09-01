(function(){
	'use strict';
	angular.module('app.eventos')
		.controller('Eventos',Eventos)
		.filter('numberFixedLen', function () {
		    return function(a,b){
		        return(1e4+""+a).slice(-b);
		    };
		});
	Eventos.$inject = ['svcEventos','$filter','logger','$timeout','$state','dataEventos','$rootScope'];
	function Eventos(svcEventos,$filter,logger,$timeout,$state,dataEventos,$rootScope){
		var vm = this;
		vm.servicio = dataEventos;
		vm.lista = [];
		vm.todos = false;
		vm.showImagen = false;
		vm.pagination = {};
		vm.files = [];
		activate();
		function initRootScope(){
			$rootScope.$on('guardar',function(){
				if (initYears(vm.servicio.eventos)) {
					vm.buscar(0);
					vm.servicio.showUpload = true;
					vm.servicio.evento = {};
				}	
			});
			$rootScope.$on('eliminar',function(){
				if (initYears(vm.servicio.eventos,0)) { 
					var cont = 0;
					for (var i = 0; i < vm.years.length; i++) {
						if(vm.opYears==vm.years[i].value){cont++;}
					}
					if (cont==0) {vm.opYears = vm.years[vm.years.length-1].value;}
					vm.buscar(0);
				}
				vm.todos = false;
				vm.servicio.seleccionados = [];
			});
		}
		/* Initialize */
			function activate(){
				initialize();
				initRootScope();
				$state.go('eventos.detalle',{id:0});
				logger.info("Activate View Eventos");
			}
			function initialize(){
	    		return svcEventos.getEventos().then(function(data){
	    			console.log(data);
	    			vm.servicio.eventos = data.reverse();
	    			if (initYears(vm.servicio.eventos)) {
	    				vm.filtrar(1);
	    			}
	    			return vm.servicio.eventos;
	    		});
	    	}
	    /*fin initialize-----*/
			vm.keyPress = function(event,data){
				if (event.keyCode === 13) {vm.buscar(1);}
			}
		/*Buscador */
			vm.search="";
			vm.resultSearch = null;
			vm.buscar = function(opcion){
				vm.resultSearch = null;
				if (vm.servicio.controles.opcion!=0 && vm.years.length>0) {
					vm.filtrar(opcion);
					if (vm.servicio.controles.opcion!=1) {vm.servicio.evento = {};}
					vm.lista = $filter('filter')(vm.lista, {'title' :vm.search });
					if (vm.lista[0] && opcion!=0) {vm.select(vm.lista[0]); vm.resultSearch = vm.lista.length;}
					if (!vm.search) {vm.resultSearch = null;}
				}else{
					if (vm.years.length>0) {logger.warning("se esta realizando una operacion");}
				}
			}
		/*----*/
			vm.seleccionar = function(data,estado,opcion){
				if (opcion=='all') {vm.servicio.seleccionados = [];}
				if (data[0]) {
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < vm.lista.length; j++) {
							if (data[i].id==vm.lista[j].id ) {
								if (estado || estado==null ) {vm.lista[j].select = true;vm.servicio.seleccionados.push(vm.lista[j]);}
								else {vm.lista[j].select = false;slice(vm.servicio.seleccionados,vm.lista[j]);}
							}
						}
					}	
				}
				vm.servicio.habFiltro=true;
				if (vm.servicio.seleccionados[0]) {vm.servicio.habFiltro=false;}
			}
			function slice(array,data){
				for (var i = 0; i < array.length; i++) {
					if (data.id==array[i].id) {
						array.splice(i,1);
					}
				}
			}
			vm.select = function(data){
				if (!vm.servicio.verificar(vm.servicio.controles)) {
					vm.servicio.slickConfigLoaded = false;
					if (data.id == vm.servicio.evento.id) {
						vm.servicio.evento = {};
						$state.go('eventos.detalle',{id:0});
						vm.servicio.showUpload = true;
					}else{
						vm.servicio.evento = JSON.parse( JSON.stringify( data) );
	        			$state.go('eventos.detalle',{id:data.id});
	        			vm.slideEdit = false;
	        			vm.servicio.showUpload = false;
						$timeout(function () {
					        vm.servicio.slickConfigLoaded = true;
					      }, 5);
					}
				}
			}
		/*Calendario */
			vm.opMeses = null;
			vm.opTodos = false;
			vm.opYears = null;
			vm.years = [];
			vm.meses = [
						{name : 'Enero',value:'01'},
						{name : 'Febrero',value : '02'},
						{name : 'Marzo',value : '03'},
						{name : 'Abril',value : '04'},
						{name : 'Mayo',value : '05'},
						{name : 'Junio',value : '06'},
						{name : 'Julio',value : '07'},
						{name : 'Agosto',value : '08'},
						{name : 'Septiembre',value : '09'},
						{name : 'Octubre',value : '10'},
						{name : 'Noviembre',value : '11'},
						{name : 'Diciembre',value : '12'}
			];
	    	function initYears(data,opcion){
	    		if (opcion==0) {vm.years = [];}	    		
	    		for (var i = 0; i < data.length; i++) {
	    			var aux = new Date(data[i].fecha);
	    			if (vm.years.length==0) {vm.years.push({name : aux.getFullYear(),value:aux.getFullYear(),submit:false});}
	    			var cont = 0;
	    			for (var j = 0; j < vm.years.length; j++) {
	    				if (aux.getFullYear()==vm.years[j].value) {
	    					cont++;
	    				}
	    			}
	    			if (cont==0) {
	    				vm.years.push({name : aux.getFullYear(),value:aux.getFullYear(),submit:false});
	    			}
	    		}
	    		vm.years.sort(function numberAs(a,b) {
				  return a.value-b.value;
				});
				if (vm.years.length==0) {
					vm.lista = JSON.parse( JSON.stringify( vm.servicio.eventos) );	
					vm.servicio.habFiltro = false;
					vm.opMeses = null; 
					vm.opYears = null; 
					return false;
				}
				return true;
	    	}

	    	function initFiltro(){
	    		var date = new Date();
	    		for (var i = 0; i < vm.years.length; i++) {
	    			if (date.getFullYear()==vm.years[i].value &&!vm.opYears) {
	    				vm.opYears = vm.years[i].value;
	    			}
	    		}
	    		if (!vm.opYears) {vm.opYears = vm.years[vm.years.length-1].value}
	    		vm.opMeses = parseInt(date.getMonth() +1);	    		
	    		vm.servicio.habFiltro = true;
	    	}
	    	vm.filtroTodos = function(opcion){
	    		if (opcion) {
	    			vm.opMeses = null;
	    		}else{
	    			initFiltro();
	    		}
	    		vm.filtrar(1);
	    	}

	    	vm.filtrar = function(opcion){
	    		vm.servicio.showUpload = true;
	    		$state.go('eventos.detalle',{id:0});
	    		if (vm.servicio.controles.opcion!=1) {vm.servicio.evento = {};}
	    		if (vm.opYears == null && vm.opMeses == null) {
	    			initFiltro();
	    		}
	    		vm.lista = filtroDate(vm.servicio.eventos,vm.opYears,vm.opMeses);
	    		if (vm.lista[0]&&opcion!=0) {vm.select(vm.lista[0]);}
				return vm.lista;
	    	}
	    	function filtroDate(data,year,month){
	    		var array = [];
	    		for (var i = 0; i < data.length; i++) {
	    			var aux = new Date(data[i].fecha);
	    			var ano = aux.getFullYear();
	    			var mes = parseInt(aux.getMonth() +1);
	    			if (year==ano && month==mes) {
	    				array.push(data[i]);
	    			}
	    			if (year==ano && !month) {array.push(data[i]);}
	    		}
	    		return array;
	    	}
		/*fin calendario----------- */

	}

}());