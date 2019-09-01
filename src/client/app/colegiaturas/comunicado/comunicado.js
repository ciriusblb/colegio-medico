(function(){
	'use strict';

	angular.module('colegiaturas.comunicado')
		.controller('Comunicado',Comunicado);
    Comunicado.$inject = ['logger','colegiadosService','$filter','servicios'];
	function Comunicado(logger,colegiadosService,$filter,servicios){
        var vm = this;
        vm.comunicado={
            header:'',
            titulo:'',
            descripcion:'',
            email:undefined,
            fecha:''
        }    
        vm.fecha=$filter('date')(new Date(), "EEEE, MMMM d, y"); 
        vm.enviar=enviar;

        async function enviar(formulario){
            vm.comunicado.email=servicios.doEmailArray(servicios.items);
            vm.comunicado.fecha=$filter('date')(new Date(), "EEEE, MMMM d, y");
            if(formulario && vm.comunicado.email){
                var x = await resolveAfterTranslateAnexo(vm.comunicado);
                logger.info('Comunicado ENVIADO');
            }else{
                logger.warning('¡Complete todos los campos y asegurese de seleccionar los emails!');
            }
        }
        vm.noEnviar = function(obj){
            servicios.reInitObject(obj);
        }
        function resolveAfterTranslateAnexo(comunicado) { 
            return new Promise(resolve => {
                colegiadosService.sendEmail(comunicado).then(function(data){
                    console.log(data);
                    resolve(data);
                });
            });
        }
	}
}());
