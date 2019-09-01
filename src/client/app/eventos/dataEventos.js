(function(){
	'use strict';
	angular.module('app.eventos')
		.service('dataEventos', dataEventos);

	function dataEventos(svcEventos){
		var vm = this;

		return {
			eventos :[],
			seleccionados : [],
			buscados: [],
			evento :{},
			controles : {
				status : false,
				opcion : null
			},
			habFiltro : null,
			showUpload : true,
			activate :true,
			slickConfigLoaded : false,
			/*funciones*/
			verificar : verificar,
		};

		function verificar(control){
			if (control.status ) {
				return true;
			}
			return false;
		}




	}

}());