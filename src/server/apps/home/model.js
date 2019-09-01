'use strict';
var mysql = require('../../config/mysql');

var connection=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'news_db',
   port: 3306
});



var dataModels ={
	getAll : function(callback){
		if(connection)
		{
			var sql = 'Call getAll()';
			connection.query(sql, function(error, row) 
			{
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null, row);
				}
			});
		}
	},
    saveData : function(data,callback){
	    if(connection)
		{
			var sql="";
			switch(data.tabla){
				case 'h_publicacion': 
					sql = 'insert into h_publicacion(titulo,descripcion,imagen,fuente) values('+
					connection.escape(data.titulo)+','+
					connection.escape(data.descripcion)+','+
					connection.escape(data.imagen)+','+
					connection.escape(data.fuente)+')';
				break;
				case 'h_portal':
					sql = 'insert into h_portal(descripcion,imagen,url) values('+
					connection.escape(data.descripcion)+','+
					connection.escape(data.imagen)+','+
					connection.escape(data.url)+')';
				break;
				case 'h_personaje':
					sql = 'insert into h_personaje(titulo,decano,imagen,descripcion,mandato) values('+
					connection.escape(data.titulo)+','+
					connection.escape(data.decano)+','+
					connection.escape(data.imagen)+','+
					connection.escape(data.descripcion)+','+
					connection.escape(data.mandato)+')';
				break;
				case 'h_noticia':
					sql = 'insert into h_noticia(titulo,descripcion,imagen,fuente) values('+
					connection.escape(data.titulo)+','+
					connection.escape(data.descripcion)+','+
					connection.escape(data.imagen)+','+
					connection.escape(data.fuente)+')';
				break;
				case 'h_enlace':
					sql= 'insert into h_enlace(imagen,url) values('+
					connection.escape(data.imagen)+','+
					connection.escape(data.url)+')';
				break;
				case 'h_informe':
					sql= 'insert into h_informe(header,titulo,descripcion,imagen,archivo,nombre_archivo) values('+
					connection.escape(data.header)+','+
					connection.escape(data.titulo)+','+
					connection.escape(data.descripcion)+','+
					connection.escape(data.imagen)+','+
					connection.escape(data.archivo)+','+
					connection.escape(data.nombre_archivo)+')';
				break;
				case 'h_slide':
					sql= 'insert into h_slide(titulo,descripcion,imagen) values('+
					connection.escape(data.titulo)+','+
					connection.escape(data.descripcion)+','+
					connection.escape(data.imagen)+')';
				break;
				case 'h_video':
					sql= 'insert into h_video(titulo,video) values('+
					connection.escape(data.titulo)+','+
					connection.escape(data.video)+')';
				break;
			}
			connection.query(sql, function(error, row) 
			{
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null, {id:row.insertId,imagen:data.imagen,archivo:data.archivo});
				}
			});
		}
	},

    editData : function(data,callback){
		if(connection){
			
			var sql="";
			switch(data.tabla){
				case 'h_publicacion': 
					sql ='update h_publicacion set titulo='+
					connection.escape(data.titulo)+', descripcion='+
					connection.escape(data.descripcion)+', imagen='+
					connection.escape(data.imagen)+', fuente='+
					connection.escape(data.fuente)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_portal':
					sql ='update h_portal set descripcion='+
					connection.escape(data.descripcion)+', imagen='+
					connection.escape(data.imagen)+', url='+
					connection.escape(data.url)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_personaje':
					sql ='update h_personaje set titulo='+
					connection.escape(data.titulo)+', decano='+
					connection.escape(data.decano)+', imagen='+
					connection.escape(data.imagen)+', descripcion='+
					connection.escape(data.descripcion)+', mandato='+
					connection.escape(data.mandato)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_noticia':
					sql='update h_noticia set titulo='+
					connection.escape(data.titulo)+', descripcion='+
					connection.escape(data.descripcion)+', imagen='+
					connection.escape(data.imagen)+', fuente='+
					connection.escape(data.fuente)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_enlace':
					sql= 'update h_enlace set imagen='+
					connection.escape(data.imagen)+', url='+
					connection.escape(data.url)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_informe':
					sql= 'update h_informe set header='+
					connection.escape(data.header)+', titulo='+
					connection.escape(data.titulo)+', descripcion='+
					connection.escape(data.descripcion)+', imagen='+
					connection.escape(data.imagen)+', archivo='+
					connection.escape(data.archivo)+', nombre_archivo='+
					connection.escape(data.nombre_archivo)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_slide':
					sql= 'update h_slide set titulo='+
					connection.escape(data.titulo)+', descripcion='+
					connection.escape(data.descripcion)+', imagen='+
					connection.escape(data.imagen)+' where id = '+connection.escape(data.id)+'';
				break;
				case 'h_video':
					sql= 'update h_video set titulo='+
					connection.escape(data.titulo)+', video='+
					connection.escape(data.video)+' where id = '+connection.escape(data.id)+'';
				break;
			}
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{imagen:data.imagen,archivo:data.archivo});}
			});
		}
	},

    removeData : function(data,callback){
		if(connection){
			var sql='DELETE FROM '+data.tabla+' WHERE id='+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{msg:'eliminado'});}
			});
		}
	},

    getLastId : function(data,callback){
		if(connection){
			var sql = 'SELECT MAX(id) AS id FROM '+data.tabla;
			connection.query(sql,function(error,row){
				if(error) throw error;
				else {
					callback(null,{id:row[0].id})};
			})
		}
	},
};
module.exports =dataModels;