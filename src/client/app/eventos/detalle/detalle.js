(function(){
	'use strict';
	angular.module('eventos.detalle')
		.controller('eventosDetalle',eventosDetalle);

	eventosDetalle.$inject = ['svcEventos','Operations','dataEventos','logger','$rootScope','$state'];

	function eventosDetalle(svcEventos,Operations,dataEventos,logger,$rootScope,$state){
		var vm = this;
		vm.files = [];
		vm.archivo_doc ={};
		vm.archivo_pdf ={};
		
		vm.service = dataEventos;
		if(vm.service.evento.fecha){
			vm.service.evento.fecha=new Date(vm.service.evento.fecha);
		}
		/* Operaciones */
	    vm.guardar = function(isValid){
	    	console.log("is Valid",isValid);
			vm.service.evento.carpeta = "eventos";
			if (isValid) {
				if (verifyImg() && verifyFile([vm.archivo_doc,vm.archivo_pdf])) {
					console.log(vm.service.evento);
					Operations.guardar(svcEventos,vm.service.eventos,vm.service.evento,"id").then(function(data){
						vm.cancelar();
						$rootScope.$broadcast('guardar');
					});
				}
			}else{logger.info("falta rellernar campos");}

		}
		vm.eliminar = function(array){
			if (!vm.service.verificar(vm.service.controles)) {
				if (vm.service.evento.id&&vm.service.seleccionados.length==0) {vm.service.seleccionados.push(vm.service.evento)}
				for (var i = 0; i < vm.service.seleccionados.length; i++) {
					vm.service.seleccionados[i].carpeta = "eventos";
					Operations.eliminar(svcEventos,vm.service.eventos,vm.service.seleccionados[i],"id").then(function(data){
						vm.cancelar();
						$rootScope.$broadcast('eliminar');
					});
				}
			}
		}
		function verifyImg(){
			var url = "";
			if (vm.files.length>0) {
				var aux = 0;
				for (var i = 0; i < vm.files.length; i++) {
					if (vm.files[i].imagen.name) {
						vm.service.evento['imagen_'+aux] = vm.files[i].imagen;aux++;
					}else{
						url = url + vm.files[i].imagen + ',';
					}
				}
				vm.service.evento.nuevo_imagen = url.substr(0,url.length-1);
				vm.service.evento.cant_imagen = aux;
				return true;
			}else{
				logger.warning("No se ha ingresado archivos");
				return false
			}
		}
		function verifyFile(archivos){
			var url = "";
			var aux = 0;
			var cont = 0;
			var tipo = ['doc','pdf'];
			for (var i = 0; i < archivos.length; i++) {
				vm.service.evento[tipo[i]] = archivos[i];
				if (archivos[i].url) {
					if (archivos[i].url.name) {
						vm.service.evento['archivo_'+i] = archivos[i].url;
						aux++;
					}else{
						url = url + archivos[i].url + ',';
					}
					cont++;
				}
			}
			vm.service.evento.nuevo_archivos = url.substr(0,url.length-1);
			vm.service.evento.cant_archivos = 2;
			return true;

		}

	    /* fin operaciones---*/
	    vm.cancelar = function(){
			vm.service.evento = {};
			vm.showImagen = false;
			vm.files = [];
			vm.archivo_doc ={};
			vm.archivo_pdf ={};
			vm.service.habFiltro = true;
			vm.service.activate = true;
			vm.service.slickConfigLoaded = false;
			vm.service.controles = {
				opcion : null,
				status : false
			};
		}
		/*Controles */
			vm.selectControl = function(opcion){
				if (!vm.service.verificar(vm.service.controles)){
					if (opcion==0 && !vm.service.evento.id) {
						return false;
					}
					if (opcion==0) {
						vm.showImagen = true;
						vm.files = vm.service.evento.imagenes;
						vm.service.habFiltro = false;
						vm.archivo_doc = vm.service.evento.doc;
						vm.archivo_pdf = vm.service.evento.pdf;
					}
					
					if (opcion==1) { 
						$state.go('eventos.detalle',{id:0});
						vm.service.evento = {}; 
						vm.files = [];
					}
					vm.service.controles = {
						status : true,
						opcion : opcion
					};	
					vm.service.slickConfigLoaded = false;
					vm.service.showUpload = true
					vm.service.activate = false;	

				}else{
					if (opcion!=vm.service.controles.opcion) {
						logger.warning("Hay una operacion realizandose");
					}
				}
				
			}
		vm.borrar = function(array,index){
			array.splice(index,1);
			if (vm.files.length==0) {vm.showImagen = false;}
		}
		/* fin*/
		/*Config Slick*/
			vm.slickConfig = {
				dots: true,
		      	autoplay: true,
		      	infinite: true,
		      	autoplaySpeed: 2000,
		      	slidesToShow: 1,
	      		slidesToScroll: 1,
			};
		/*----fin*/
		/*Inicio datepicker */
    		vm.formats = ['dd/MMMM/yyyy', 'yyyy/MM/dd', 'dd-MM-yyyy', 'shortDate'];
			vm.format = vm.formats[0];
			vm.status = {
				start : false,
				end : false
			}
			vm.maxDate = new Date(2025, 5, 22);
			vm.minDate = new Date();
        	vm.open = function(status) {
			    vm.status[status]  = true;
		  	};

	  	/*fin datepicker */



	}



}());