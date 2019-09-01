'use strict';
var dataModels = require('./model');
var upload=require('../../upload/upload');
var isAuth= require('../../sesion/service').isAuth;


var discussController = function(app) 
{
	app.route('/Convenios')
		.get(isAuth,function(req,res){
			dataModels.getData(function(error,data){
				res.send(data);
			})
		})
		.post(function(req,res){
			if(Object.keys(req.files).length!=0){
				dataModels.getLastId({tabla:req.body.tabla},function(error,data){
					req.body.fileId=data.id;
					upload.getSetImage(req,function(error,data){
						req.body.imagen=data.imagen;
						req.body.archivo=data.archivo;
						console.log("guardar1 ",req.body);
						dataModels.saveData(req.body,function(error,data){
		 					res.send(data);
			 			})
					})
				})
			}else{
				console.log("guardar2 ",req.body);
				dataModels.saveData(req.body,function(error,data){
		 			res.send(data);
			 	})
			}
	 	})
	 	.put(function(req,res){
	 		if(Object.keys(req.files).length!=0){
				upload.getSetImage(req,function(error,data){
					req.body.imagen=data.imagen;
					req.body.archivo=data.archivo;
					console.log("editar1 ",req.body);
					dataModels.editData(req.body,function(error,data){
	 					res.send(data);
		 			})
				})
	 		}else{
				console.log("editar 2 ",req.body);
				dataModels.editData(req.body,function(error,data){
 					res.send(data);
	 			})
	 		}

		})
		.delete(function(req,res){
			upload.removeImage(req.query,function(error,data){
				console.log("eliminar ",req.query);
				dataModels.removeData(req.query,function(error,data){
	 				res.send({msg:'eliminado'});
				})
			})
	 	});
}

module.exports = discussController;



