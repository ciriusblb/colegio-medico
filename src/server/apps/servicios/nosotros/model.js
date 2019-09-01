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
			var sql = 'select * from h_nosotros order by id desc';
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
			var sql= 'insert into h_nosotros(titulo,descripcion,imagen) values('+
					connection.escape(data.titulo)+','+
					connection.escape(data.descripcion)+','+
					connection.escape(data.imagen)+')';
			connection.query(sql, function(error, row) 
			{
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null, {id:row.insertId,imagen:data.imagen});
				}
			});
		}
	},

    editData : function(data,callback){
		if(connection){
			var sql= 'update h_nosotros set titulo='+
					connection.escape(data.titulo)+', descripcion='+
					connection.escape(data.descripcion)+', imagen='+
					connection.escape(data.imagen)+' where id = '+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{imagen:data.imagen});}
			});
		}
	},

    removeData : function(data,callback){
		if(connection){
			var sql='DELETE FROM h_nosotros WHERE id='+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{msg:'eliminado'});}
			});
		}
	},

    getLastId : function(data,callback){
		if(connection){
			var sql = 'SELECT MAX(id) AS id FROM h_nosotros';
			connection.query(sql,function(error,row){
				if(error) throw error;
				else {
					callback(null,{id:row[0].id})};
			})
		}
	},
};
module.exports =dataModels;