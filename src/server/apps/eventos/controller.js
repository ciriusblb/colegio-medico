'use strict';
var express = require('express');
var router = express.Router();
var dataModels = require('./models');
var Upload = require('./upload');
var isAuth= require('../sesion/service').isAuth;

/*vista Frontend */
router.route('/eventos')
    .get(isAuth,function(req,res){
        dataModels.listEventos(function(error,data){
            res.send(data);
        });
    })
    .post(function(req,res){
        dataModels.ultimo_id(function(error,data){
			req.body.id_imagen = data[0].id+1;
            req.body.init = 0;
            console.log('req.body ',req.body);
            console.log('req.files ',req.files);

			Upload.filtrarImagenes(req,function(src){
                req.body.imagen=src;
                Upload.filtrarArchivos(req,function(src){
                   dataModels.post(req.body,function(error,data){
                        res.send({id:data.id ,imagen:req.body.imagen ,doc : req.body.archivo_doc , pdf : req.body.archivo_pdf});
                    })
                });
			});
		});
    })
    .put(function(req,res){
        var b = filtroEditar(req.body.imagen,req.body.nuevo_imagen,req.body.carpeta);
        req.body.init = parseInt(b.init)+1;
        Upload.filtrarEliminar({carpeta : req.body.carpeta, antiguo : b.antiguo , categoria :'galeria'});
        
        Upload.filtrarImagenes(req,function(src){
            if (src.length==0) {b.nuevo= b.nuevo.substr(0,b.nuevo.length-1);}
            req.body.imagen =b.nuevo+ src;
            Upload.filtrarArchivos(req,function(src){
              dataModels.put(req.body,function(error,data){
                    res.send({imagen:req.body.imagen,doc : req.body.archivo_doc , pdf : req.body.archivo_pdf});  
                });  
            });
        });
    })
    .delete(function(req,res){
        console.log("req.query",req.query);
        dataModels.delete(req.query,function(error,data){
            eliminar(req,Upload);
            res.send(data);
        });
   });

function eliminar(req,Upload){
    Upload.filtrarEliminar({carpeta : req.query.carpeta, antiguo : req.query.imagen ,categoria:'galeria'});
    if (req.query.archivo_pdf) {
        Upload.filtrarEliminar({carpeta : req.query.carpeta, antiguo : req.query.archivo_pdf ,categoria:'archivos'});
    }
    if (req.query.archivo_doc) {
        Upload.filtrarEliminar({carpeta : req.query.carpeta, antiguo : req.query.archivo_doc ,categoria:'archivos'});
    }
}

function filtroEditar(old,nuevo,carpeta){
    var ob = {nuevo:'',antiguo:'',init:0};
    var a = old.split(',');
    var b = nuevo.split(',');
    for (var i = 0; i < a.length; i++) {
        var cont = 0;
        var aux=0;
        for (var j = 0; j < b.length; j++) {
            if (a[i]==b[j]) {
                var c = a[i].split('_');
                c = c[1].split('.');
                aux= c[0];
                cont++;
                ob.nuevo = ob.nuevo + a[i] + ',';
            }
        }
        if (aux>ob.init) {
            ob.init =aux;
        }
        if (cont==0) {ob.antiguo = ob.antiguo + a[i] + ',';}
    }

    ob.antiguo.substr(0,ob.antiguo.length-1);
    return ob;
}




module.exports = router;
