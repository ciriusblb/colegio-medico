var fs= require('fs-extra');
var upload={
	getSetImage : function (req,callback){
		var oldData= {imagen:req.body.imagen,archivo:req.body.archivo};
		var data = oldData|| {};
		console.log("comparacion ",data);
		if(req.files.imagePath){
			data.imagen=saveFile(req.files.imagePath,req.body.id,req.body.fileId,req.body.carpeta,req.body.imagen,req.body.eliminarImagen,'galeria');
		}
		if(req.files.archivePath){
			data.archivo=saveFile(req.files.archivePath,req.body.id,req.body.fileId,req.body.carpeta,req.body.archivo,req.body.eliminarArchivo,'archivos');
		}
		console.log("archivosname ",data);
		callback(null,data);
	},
	removeImage : function(data,callback){
		if(data.imagen){
			removeFile(data.imagen,'galeria',data.carpeta);
		}
		if(data.archivo){
			removeFile(data.archivo,'archivos',data.carpeta);
		}
		console.log("elminado 3");
		callback(null,{msg:'elimnado'});
	},
};



module.exports = upload;


function saveFile(files,id,fileId,carpeta,theFile,removeTheFile,category){
	var file="";
	var extension=files.name.split('.');
	var request={};
	if(theFile){
		file = theFile.split('.')[0]+'.'+extension[extension.length-1];
	}else{
		request.carpeta=carpeta;
		request.extension=extension[extension.length-1];
		if(fileId){
			request.fileId=fileId+1;
		}else{
			request.fileId=id;
		}
		file = createNameImg(request)
	}	
 	if(removeTheFile){
 		var eliminarFile = removeTheFile.split('/');
		fs.removeSync('src/server/public/'+category+'/'+carpeta+'/'+eliminarFile[eliminarFile.length-1]);
	}
	fs.copy(files.path,'src/server/public/'+category+'/'+carpeta+'/'+file);
	return file;
}
function removeFile(file,category,carpeta){
	console.log("elminado 2 ",file,category,carpeta);
	fs.removeSync('src/server/public/'+category+'/'+carpeta+'/'+file);
}

function createNameImg(data){
	var nombre="";
	var cadena='';
	var subCadena="";
	if(data.fileId){
	    cadena = data.fileId;
	    subCadena = String(cadena);
	    while(subCadena.length<4){
	    subCadena='0'+subCadena;
	    }
	    nombre=data.carpeta+subCadena+'.'+data.extension;
	}else{
	    nombre=data.carpeta+'0001.'+data.extension;
	}
	return nombre;
}