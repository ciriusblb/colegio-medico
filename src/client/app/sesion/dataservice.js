(function() {
    'use strict';

    angular
        .module('app.sesion')
        .factory('sesionService', sesionService);

    /* @ngInject */
    function sesionService($http, $location, $q,$resource,exception) {
        var resource = $resource('/Session/:id',{idBricks:'@id'}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',skipAuthorization:true},
            'update': { method: 'PUT'},
            'save':{method:'POST'},
            'remove': { method:'DELETE'},
        });

        var service = {
            doSession: doSession,
            login:login
        };

        return service;
        function doSession(data) {
            console.log(data);
            return resource.query(data).$promise
                .then(function(data){
                    return data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Falló para getData()')(message);
                });
        }
        function login(data) {
            return resource.save(data).$promise
                .then(function(data){
                    return data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Falló para getData()')(message);
                });
        }
    }
})();

