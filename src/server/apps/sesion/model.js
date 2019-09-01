'use strict';
var mysql = require('../../config/mysql');
var createToken = require('./service').createToken;

var connection=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'news_db',
   port: 3306
});

var dataModels ={};
dataModels.doSession = function(data,callback){
	if(connection)
	{
		var sql = 'select * from h_admin where user='+connection.escape(data.user)+
		' and password='+connection.escape(data.password)+'';
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				
				if(row[0]){
					var token = createToken(row[0]);
					console.log('respuesta del servicio token ',token);
					callback(null, {user:token});
				}else{
					callback(null, {user:undefined});
				} 
				
			}
		});
	}
}
dataModels.login = function(data,callback){
	if(connection)
	{
		var sql = 'insert into h_admin(user,password) values('+connection.escape(data.user)+','+connection.escape(data.password)+')';
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{msg:'registrado'});
			}
		});
	}
}
module.exports =dataModels;