'use strict';
var mysql = require('../../../config/mysql');

var connection=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'news_db',
   port: 3306
});



var dataModels ={
	getData : function(callback){
		if(connection)
		{
			var sql = 'select * from h_convenio order by id desc';
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
			var sql= 'insert into h_convenio(titulo,descripcion,imagen,archivo,nombre_archivo) values('+
			connection.escape(data.titulo)+','+
			connection.escape(data.descripcion)+','+
			connection.escape(data.imagen)+','+
			connection.escape(data.archivo)+','+
			connection.escape(data.nombre_archivo)+')';
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
			var sql= 'update h_convenio set titulo='+
				connection.escape(data.titulo)+', descripcion='+
				connection.escape(data.descripcion)+', imagen='+
				connection.escape(data.imagen)+', archivo='+
				connection.escape(data.archivo)+', nombre_archivo='+
				connection.escape(data.nombre_archivo)+' where id = '+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{imagen:data.imagen,archivo:data.archivo});}
			});
		}
	},

    removeData : function(data,callback){
		if(connection){
			var sql='DELETE FROM h_convenio WHERE id='+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{msg:'eliminado'});}
			});
		}
	},

    getLastId : function(data,callback){
		if(connection){
			var sql = 'SELECT MAX(id) AS id FROM h_convenio';
			connection.query(sql,function(error,row){
				if(error) throw error;
				else {
					callback(null,{id:row[0].id})};
			})
		}
	},
};
module.exports =dataModels;