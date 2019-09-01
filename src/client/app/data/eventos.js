(function(){
	'use strict';
	angular.module('app.data')
		.service('svcEventos',svcEventos);

	 function svcEventos($resource,servicios){
	 	var resource = $resource('/eventos', {}, {
			'get':    {method:'GET'},
			'query': { method: 'GET',isArray:true,skipAuthorization:false},
            'update': { method: 'PUT',transformRequest:servicios.imagenes,headers:{'Content-Type':undefined}},
	        'save': { method: 'POST',transformRequest:servicios.imagenes,headers:{'Content-Type':undefined}},
	        'remove': { method:'DELETE'},
		});

		var services = {
			getEventos : listEventos,
			guardar :guardar,
			editar : editar,
			eliminar : eliminar
		};

		return services;

		function listEventos(){
			return resource.query().$promise.then(function(response){
				url_preparar(response);
				return getComplete(response);
			}).catch(getFailed);
		}
		function guardar(data){
			console.log("data   ",data);
			return resource.save(data).$promise.then(function(response){
				data.id = response.id;
				data.imagen = response.imagen;
				data.archivo_pdf = response.pdf;
				data.archivo_doc = response.doc;
				url_preparar([data]);
				return getComplete(data);
			}).catch(getFailed);
		}
		function editar(data){
			return resource.update(data).$promise.then(function(response){
				data.imagen = response.imagen;
				data.archivo_pdf = response.pdf;
				data.archivo_doc = response.doc;
				url_preparar([data]);
				return getComplete(data);
			}).catch(getFailed);
		}
		function eliminar(data){
			return resource.remove(data).$promise.then(getComplete).catch(getFailed);
		}

		function getComplete(response){
			return response;
		}
		function getFailed(){
			console.log("error");
		}
		function url_preparar(array){
			for (var i = 0; i < array.length; i++) {
				var a;

				if (array[i].archivo_pdf ) {
					a = array[i].archivo_pdf.split('/');
					array[i].pdf = {nombre :a[1] ,url : a[0] , tipo: 'pdf'};
				}else{
					array[i].pdf = {nombre :null ,url : null , tipo: 'pdf'};
				}
				if (array[i].archivo_doc) {
					a = array[i].archivo_doc.split('/');
					array[i].doc = {nombre :a[1] ,url : a[0] , tipo: 'doc'};
				}else{
					array[i].doc = {nombre :null ,url : null  , tipo: 'doc'};
				}

				var separador = array[i].imagen.split(',');
				if (!Array.isArray(array[i].imagenes)) {
					array[i].imagenes = [];
					for (var j = 0; j < separador.length; j++) {
							var src = separador[j].split('/');
							array[i].imagenes.push({
								imagen : src[0],
								blob : null
							});
							var aux = src[0].split('_');
							aux = aux[0].substr(7);
							array[i].id_imagen = aux;
					}
				}else{
					for (var j = 0; j < separador.length; j++) {
						var src = separador[j].split('/');
						if(array[i].imagenes[j].blob){
							array[i].imagenes[j].imagen = src[0];
						}
					}
				}
				
				

			}

			return array;
		}





	 }	


}());