var fs = require('fs');
var upload={
	filtrarImagenes :function (req,callback){
		    var src="";
		    var aux = req.body.init;
		    for (var i = 0; i < req.body.cant_imagen; i++) {
		        var imagen={};
		        var separador = ",";
		        if (req.files["imagen_"+i]!=null) {
		            imagen = req.files["imagen_"+i];
		            imagen.carpeta = req.body.carpeta;
                    imagen.categoria = 'galeria';
		            imagen.nombre  = imagen.carpeta+req.body.id_imagen+'_'+aux+'.';
		            Uploads(imagen,function(name){
		                src =src+ name;
		            });
		            if (req.files["recorte"+i]) {

		                imagen = req.files["recorte"+i];
                        imagen.categoria = 'galeria';
		                imagen.carpeta = req.body.carpeta;
		                imagen.nombre  = 'recorte'+req.body.id_imagen+'_'+aux+'.';
		                Uploads(imagen,function(name){
		                    src = src +'/'+ name
		                });

		            }
		            src = src +separador;
		            aux ++ ;
		        }		        
		    }
		    callback(src.substr(0,src.length-1));
	},
    filtrarArchivos :function (req,callback){
            for (var i = 0; i < req.body.cant_archivos; i++) {
                var file={};
                var mimes = ['doc','pdf'];
                var separador = ",";
                if (req.body['archivo_'+mimes[i]]) {
                    if (filtrandoEditar(req.body['archivo_'+mimes[i]],req.body.nuevo_archivos,req)){
                        req.body['archivo_'+mimes[i]] = null;
                    }
                }
                if (req.files["archivo_"+i]!=null) {
                    file = req.files["archivo_"+i];
                    file.carpeta = req.body.carpeta;
                    file.categoria = 'archivos';
                    file.nombre  = file.carpeta+req.body.id_imagen+'.';
                    
                    Uploads(file,function(name){
                        req.body['archivo_'+mimes[i]] = name+'/'+file.name.substring(0,file.name.lastIndexOf("."));
                    });

                }               
            }
            callback();
    },
	filtrarEliminar : function (datos){
	    var separador = datos.antiguo.split(',');
	    for (var i = 0; i < separador.length; i++) {
	        var separador2 = separador[i].split('/');
	        eliminarFile({carpeta: datos.carpeta,antiguo:separador2[0] , categoria: datos.categoria});
	        if (separador2[1]!=null) {
	            eliminarFile({carpeta: datos.carpeta,antiguo:separador2[1]});
	        }
	    }

	}

};

module.exports = upload;
function filtrandoEditar(url,array,req){
    var enlace  = url.split('/');
    var array = array.split(',');
    var cont = 0;
    for (var i = 0; i < array.length; i++) {
        if (enlace[0]==array[i]) {
            cont++;
        }
    }
    if (cont==0) {
        eliminarFile({categoria : 'archivos' , carpeta : req.body.carpeta ,antiguo : enlace[0]});
        return true;
    }
    return false;
}

function eliminarFile(req){
    var src = './src/server/public/'+req.categoria+'/'+req.carpeta+'/' +req.antiguo;
    fs.unlink(src, function(err) {
       if (err) {
           return console.error(err);
       }
    });
};

function Uploads(imagen,callback) {

    var temporalPath = imagen.path;
    //ruta final donde alojaremos el archivo, le cambiamos el nombre para que 
    //sea estilo imagen-4365436.extension
    var  name = imagen.nombre+getExtension(imagen.name);
    var finalPath = './src/server/public/'+imagen.categoria+'/'+imagen.carpeta+'/' +name;
    //si la extension no está permitida salimos con un mensaje
    if(checkExtension(imagen) === false)
    {
        var body = "El formato que intentas subir no está permitido :(";
        
        res.writeHead(200, {
                'Content-Length': body.length,
                'Content-Type': 'text/plain' 
        });
        res.write(body);
        res.send(body);
        return false;
    }

    //guardamos el archivo
    fs.exists(finalPath, function(exists) 
    {
        //leemos y escribimos el nuevo archivo para guardarlo
        fs.rename(temporalPath, finalPath, function(error) 
        {
            //si hay errores lanzamos una excepcion
            if(error)
            {
                throw error;
            }
            //Eliminamos el archivo existente si es editado
            if (imagen.antiguo) {
                eliminarFile({carpeta:imagen.carpeta,antiguo:imagen.antiguo});
            }
            // eliminamos el archivo temporal
            fs.unlink(temporalPath, function() 
            {
                //si hay errores lanzamos una excepcion
                if(error)
                {
                    throw error;
                }            
            });
        }); 
    });

    callback(name);


    //obtiene el nuevo nombre del archivo si existe el anterior
    function getNewFileName(file)
    {
        var f1 = getFileName(file)+"-"+getIntRandom(10,100000)+"."+getExtension(file);
        return getFileName(file)+"-"+getIntRandom(10,100000)+getBetweenSeparators(f1)+"."+getExtension(file);
    }

    //obtenemos la extensión de la imagen
    function getExtension(file)
    {
        return file.split('.').pop();
    }
    //obtenemos el nombre de la imagen
    function getFirstFileName(carpeta,id,extension)
    {
        console.log("id",id);
        return carpeta+'_'+id+'.'+extension;
    }
    //obtenemos un número entero aleatorio para el nombre de la imagen
    function getIntRandom(min,max)
    {
        return Math.floor((Math.random() * ((max + 1) - min)) + min);
    }
    //separamos entre el - y el .
    function getBetweenSeparators(str)
    {
        return str.substring(str.lastIndexOf("-")+1,str.lastIndexOf("."));
    }
    //comprobamos si está permitida la extensión del archivo
    function checkExtension(file)
    {
        
        var allowedExtensions = [];
        allowedExtensions = ["jpg","jpeg","gif","png"];
        if (file.categoria=='archivos') {
             allowedExtensions = ["doc","docm","docx","dot","dotm","dotx","pdf"];
        }
        console.log("file",file);
        console.log("permitidos",allowedExtensions);
        //extensiones permitidas
        
        //extension del archivo
        var extension = file.name.split('.').pop();
        //hacemos la comprobación
        return in_array(extension, allowedExtensions) === true ? true : false;
    }
    //funcion para comprobar valores en un array
    function in_array(needle, haystack)
    {
        var key = '';
        for(key in haystack){
            if(haystack[key] == needle.toLowerCase()){
                return true;
            }
        }
        return false;
    }

};
