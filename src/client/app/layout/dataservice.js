(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('dataservice', Dataservice);

    /* @ngInject */
    function Dataservice($http, $location, $q,$resource) {
        var resource = $resource('/layout/:id',{idBricks:'@id'}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',isArray:true},
            'update': { method: 'PUT'},
            'save': { method: 'POST'},
            'remove': { method:'DELETE'}
        });

        var service = {
        };

        return service;


    }
})();
