(function() {
    'use strict';

    angular
        .module('vistas.home')
        .factory('homeService', homeService);

    homeService.$inject = ['$http','$location','$q','$resource','exception','servicios','$timeout'];
    function homeService($http, $location, $q,$resource,exception,servicios,$timeout) {
        this.data=null;
        this.dataSelected=undefined;

        var resource = $resource('/Home',{}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',isArray:true,skipAuthorization:false},
            'update': { method: 'PUT',transformRequest:servicios.imagenes,headers:{'Content-Type':undefined}},
            'save':{method:'POST',transformRequest:servicios.imagenes,headers:{'Content-Type':undefined}},
            'remove': { method:'DELETE'}

        });

        var service = {
            getAll: getAll,
            saveData: saveData,
            editData: editData,
            removeData:removeData
        };
        var sets=['slide','noticia','publicacion','personaje','informe','portal','video','enlace'];
        var objofArray=[];

        return service;
        function getAll() {
            return resource.query().$promise
                .then(getDataConfig)
                .catch(function(message) {
                    exception.catcher('XHR Falló para getAll()')(message);
                });

                function getDataConfig (data) {
                    for (var i = 0; i < data.length-1; i++) {
                        var datos=Object.values(data[i]);
                        objofArray.push({datos:datos,tabla:'h_'+sets[i],carpeta:sets[i].toUpperCase(),config:false});
                    }
                    return objofArray;  
                }
        }

        function saveData(data){
            return resource.save(data).$promise
                .then(function(data){
                    return data;
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para saveData()')(message);
                })
        }

        function editData(data){
            return resource.update(data).$promise
                .then(function(data){
                    return data;
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para editData()')(message);
                })
        }

        function removeData(data){
            console.log("service ",data);
            return resource.remove(data).$promise
                .then(function(data){
                    return data;
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para removeData()')(message);
                })
        }

    }
})();

