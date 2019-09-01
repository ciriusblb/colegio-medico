(function(){
	'use strict';
	angular.module('app.data')
		.factory('Operations',Operations);

	function Operations(logger){
		var services = {
			guardar : guardar,
			eliminar : eliminar 
		};
		return services;

		//Eliminar los datos
		function eliminar(servicio,datos,item,id){
			return servicio.eliminar(item).then(function(res){
				eliminarDato(datos,item,id);
				logger.success("El archivo se elimino correctamente");
				return Promise.resolve({value:true});
			});
		}	

		function guardar(servicio,array,datos,id){
			if(datos[id]){
					return servicio.editar(datos).then(function(response){
						datos.imagen = response.imagen;
						datos.imagenes = response.imagenes;
						console.log("datos editados",datos);
						reubicar(array,datos,id);
						logger.success("El archivo se edito correctamente");
						return Promise.resolve(array);
					});
			}else{
					return servicio.guardar(datos).then(function(data){
						array.unshift(datos);
						logger.success("El archivo ha sido añadido correctamente");
						return Promise.resolve(array);
						
					});
			}
		}
		function reubicar(array,datos,id){
			for (var i = 0; i < array.length; i++) {
				if (datos[id]==array[i][id]) {
					array[i] = datos;
				}
			}
			console.log("reubicar",array);
			return array;
		}
		function eliminarDato(array,datos,id){
			for (var i = 0; i < array.length; i++) {
				if (datos[id]==array[i][id]) {
					array.splice(i,1);
				}
			}
			return array;
		}


	}

}());