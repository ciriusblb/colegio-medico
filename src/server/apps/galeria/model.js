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
	getData : function(callback){
		if(connection)
		{
			var sql = 'select * from h_galeria order by id desc';
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
			var sql= 'insert into h_galeria(imagen) values('+
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
			
			var sql= 'update h_galeria set imagen='+
				connection.escape(data.imagen)+' where id = '+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{imagen:data.imagen});}
			});
		}
	},

    removeData : function(data,callback){
		if(connection){
			var sql='DELETE FROM h_galeria WHERE id='+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{msg:'eliminado'});}
			});
		}
	},

    getLastId : function(data,callback){
		if(connection){
			var sql = 'SELECT MAX(id) AS id FROM h_galeria';
			connection.query(sql,function(error,row){
				if(error) throw error;
				else {
					callback(null,{id:row[0].id})};
			})
		}
	},
};
module.exports =dataModels;