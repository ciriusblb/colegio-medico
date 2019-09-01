(function(){
    'use strict';

    angular.module('app.sesion')
        .controller('Sesion',Sesion);

    function Sesion($scope,sesionService,$state,logger,$rootScope){
           var vm = this;
         vm.admin={
               user:'',
               password:''
         }

        // vm.newAdmin={
        //        user:'',
        //        password:''
        //  }
        vm.iniciar=function(){
            sesionService.doSession(vm.admin).then(function(data){
              if(data.user){
                var token = JSON.stringify(data.user);
                window.localStorage.setItem("token",token);
                $rootScope.$broadcast('sesion');
                $state.go('Vistas_Home');
              }else{
                logger.warning('Usuario / Contraseña Incorrecto');
              }

                
            })
        }
        // vm.registrar=function(){
        //     sesionService.login(vm.newAdmin).then(function(data){
        //        console.log(data);
        //     })
        // }
    }


}());