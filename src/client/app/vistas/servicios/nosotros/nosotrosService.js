(function() {
    'use strict';

    angular
        .module('servicios.nosotros')
        .factory('nosotrosService', nosotrosService);

    nosotrosService.$inject = ['$http','$location','$q','$resource','exception','servicios','$timeout'];
    function nosotrosService($http, $location, $q,$resource,exception,servicios,$timeout) {
        var resource = $resource('/Nosotros',{}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',isArray:true,skipAuthorization:false},
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
                        data[i].carpeta='NOSOTROS';
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

