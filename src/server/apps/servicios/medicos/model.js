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
			var sql = 'select * from h_medico order by id desc';
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
			var sql= 'insert into h_medico(cmp,nombre,ap_paterno,ap_materno,especialidad,email,imagen) values('+
				connection.escape(data.cmp)+','+
				connection.escape(data.nombre)+','+
				connection.escape(data.ap_paterno)+','+
				connection.escape(data.ap_materno)+','+
				connection.escape(data.especialidad)+','+
				connection.escape(data.email)+','+
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
			var sql= 'update h_medico set cmp='+
				connection.escape(data.cmp)+', nombre='+
				connection.escape(data.nombre)+', ap_paterno='+
				connection.escape(data.ap_paterno)+', ap_materno='+
				connection.escape(data.ap_materno)+', especialidad='+
				connection.escape(data.especialidad)+', email='+
				connection.escape(data.email)+', imagen='+
				connection.escape(data.imagen)+' where id = '+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{imagen:data.imagen,archivo:data.archivo});}
			});
		}
	},

    removeData : function(data,callback){
		if(connection){
			var sql='DELETE FROM h_medico WHERE id='+connection.escape(data.id)+'';
			connection.query(sql,function(error,row){
				if(error) {throw error;}
				else {callback(null,{msg:'eliminado'});}
			});
		}
	},

    getLastId : function(data,callback){
		if(connection){
			var sql = 'SELECT MAX(id) AS id FROM h_medico';
			connection.query(sql,function(error,row){
				if(error) throw error;
				else {
					callback(null,{id:row[0].id})};
			})
		}
	},
};
module.exports =dataModels;