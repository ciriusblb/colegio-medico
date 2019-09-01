(function() {
    'use strict';

    angular
        .module('app.colegiaturas')
        .factory('colegiadosService', colegiadosService);

    colegiadosService.$inject = ['$http','$location','$q','$resource','exception'];
    function colegiadosService($http, $location, $q,$resource,exception) {
        this.data=null;
        this.dataSelected=undefined;
        var resource = $resource('/Colegiados/:id',{idBricks:'@id'}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',isArray:true,skipAuthorization:false},
            'update': { method: 'PUT'},
            'save':{method:'POST'},
            'remove': { method:'DELETE'},
            'send':{method:'POST',url:'/sendEmail'}
        });


        var service = {
            getData: getData,
            saveData:saveData,
            editData:editData,
            removeData:removeData,

            sendEmail:sendEmail,
            updates:{disabled:true,message:false,idSelected:undefined},
            items:undefined
        };

        return service;
        function getData() {
            return resource.query().$promise
                .then(function(data){
                    for (var i = 0; i < data.length; i++) {
                        data[i].comunicar=false;
                    }
                    return data;

                })
                .catch(function(message) {
                    exception.catcher('XHR Falló para getData()')(message);
                });
        }
        function saveData(data){
            return resource.save(data).$promise
                .then(function(data){
                    return $q.when(data);
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para saveData()')(message);
                })
        } 
        function editData(data){
            return resource.update(data).$promise
                .then(function(data){
                    return $q.when(data);
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para editData()')(message);
                })
        }
        function removeData(data){
            console.log("sadasd ",data);
            return resource.remove({data}).$promise
                .then(function(data){
                    return $q.when(data);
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para removeData()')(message);
                })
        }
        function sendEmail(data){
             return resource.send(data).$promise
                .then(function(data){
                    return $q.when(data);
                })
                .catch(function(message){
                    exception.catcher('XHR Falló para sendEmail()')(message);
                })
        }
    }
})();