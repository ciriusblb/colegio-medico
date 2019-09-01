(function(){
	'use strict';
	angular.module('app.data')
		.factory('servicios',servicios);

	function servicios(logger,$q,$filter){
		var service = {
			getPosicion : getPosicion,
            doIntervalDate:doIntervalDate,
			reInitObject: reInitObject,
            doNewArrays:doNewArrays,
			doNewArray: doNewArray,
            mainFilter: mainFilter,
            secondaryFilter:secondaryFilter,
            doEmailArray:doEmailArray,

            verifyAll:verifyAll,
            verifyFilters:verifyFilters,

            transformToFile:transformToFile,
            imagenes:imagenes
        };
		return service;

		function getPosicion(id,array){
			for (var i = 0; i < array.length; i++) {
                if(array[i].id==id) return i;
            }
            return undefined;
		}

        function doIntervalDate(date,format){
                var mandato={};
                mandato.inicio=$filter('date')(date.inicio, format);
                mandato.fin=$filter('date')(date.fin, format);
                return mandato.inicio+' - '+mandato.fin;
        }
		function reInitObject(obj){
			for( var property in obj ){
                if(property!='tabla' && property != 'carpeta'){
                    obj[property]="";                    
                }
            }
            return obj;
		}
        function doNewArrays(originalArray,props){
            var newArray=[];
            for (var i = 0; i < props.length; i++) {
                newArray[i]=doNewArray(originalArray,props[i]);
            }
            return newArray;
        }           
        function doNewArray(originalArray, prop){
            var newArray = [];
            var lookupObject  = {};
            var array=[];
            for(var i in originalArray) {
                if(!isNaN(i)){
                    lookupObject[originalArray[i][prop]] = originalArray[i];
                }                   
            }
            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            for (var i = 0; i < newArray.length; i++) {
                array.push({[prop]:newArray[i][prop],selected:false});
            }
            return array;
        }
        function mainFilter(array,request){
            if(Object.keys(request).length!=0){
                var items=[];
                for (var i = 0; i < array.length; i++) {
                    var insert =false;
                    for( var key in request){
                        if(array[i][key]==request[key]){
                            insert=true;
                        }else{
                            insert=false;
                            break;
                        }
                    }
                    if(insert){
                        items.push(array[i]);
                    }
                }
                return items;
            }else{
                return array;
            } 
        }
        function secondaryFilter(originalArray,request,filters,props){
            var array=mainFilter(originalArray,request);
            var arrayAux= array;
            for (var i = 0; i < filters.length; i++){
                for (var j = 0; j < filters[i].length; j++) {
                    if(filters[i][j].selected){
                        arrayAux = searchByProp(arrayAux,filters[i][j][props[i]],props[i]);
                    }
                }
            }
            array=arrayAux;
            return array;
        }
        function doEmailArray(array){
            var attrArray=[];
            for (var i = 0; i < array.length; i++) {
                if(array[i].comunicar){
                    attrArray.push(array[i].email);
                }
            }
            if(attrArray.length==0) return undefined;
            else return attrArray;
        }
        function verifyAll(array,prop){
            for (var i = 0; i < array.length; i++) {
                if(!array[i][prop]) return false;
            }
            return true;
        }
        function verifyFilters(array,filters,props,ind){
            for (var i = 0; i < props.length; i++) {
                if(i!=ind){
                    var aux = doNewArray(array,props[i]);
                    for (var j = 0; j < filters[i].length; j++) {
                        for (var o = 0; o < aux.length ;o++) {
                            if(filters[i][j][props[i]]===aux[o][props[i]]){
                                filters[i][j].selected=false;
                                break;
                            }else{
                                filters[i][j].selected=true;
                            }
                        }
                    }
                    
                }
            }
            return filters;
        }
        function transformToFile(cropper){
            var img_b64 = cropper;
            var png = img_b64.split(',')[1];
            var binary = fixBinary(window.atob(png));
            var the_file = new Blob([binary], {type: 'image/png'});
            var imagen_firma = new File([the_file], 'name.png', { type: 'image/png' });
            return imagen_firma;
        }
        function imagenes(data) {
            if(undefined === data) return data;
            var formData = new FormData();
            angular.forEach(data, function(value, key) {
              if(value instanceof FileList) {
                if(value.length === 1)
                  formData.append(key, value[0]);
                else {
                  angular.foreach(value, function(file, index) {
                    formData.append(key + '_' + index, file);
                  });
                }
              } else {
                formData.append(key, value);
              }
            });
            return formData;
        }
        function fixBinary (bin) {
            var length = bin.length;
            var buf = new ArrayBuffer(length);
            var arr = new Uint8Array(buf);
            for (var i = 0; i < length; i++) {
                arr[i] = bin.charCodeAt(i);
            }
            return buf;
        }
        function searchByProp(items,word,prop){
            return items.filter(function(item){
                return item[prop] != word;
            });
        }  
	}

}());