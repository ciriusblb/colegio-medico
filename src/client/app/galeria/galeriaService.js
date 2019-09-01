(function() {
    'use strict';

    angular
        .module('app.galeria')
        .factory('galeriaService', galeriaService);

    galeriaService.$inject = ['$http','$location','$q','$resource','exception','servicios','$timeout'];
    function galeriaService($http, $location, $q,$resource,exception,servicios,$timeout) {
        var resource = $resource('/Galeria',{}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',isArray:true},
            'update': { method: 'PUT',transformRequest:servicios.imagenes,headers:{'Content-Type':undefined}},
            'save':{method:'POST',transformRequest:servicios.imagenes,headers:{'Content-Type':undefined}},
            'remove': { method:'DELETE'}

        });

        var service = {
            getData: getData,
            saveData: saveData,
            editData: editData,
            removeData:removeData
        };

        return service;
        function getData() {
            return resource.query().$promise
                .then(getDataConfig)
                .catch(function(message) {
                    exception.catcher('XHR Falló para getData()')(message);
                });

                function getDataConfig (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].carpeta='GALERIA';
                    }
                    return data;  
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

