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
	listEventos : function(callback){
		if(connection)
		{	
			var sql ='SELECT * FROM c_evento';
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
	post : function(data,callback){
		if(connection)
		{	

			var aux = filtroFecha(data.fecha);

			var sql ='INSERT INTO c_evento(tipo,title,lugar,descripcion,dirigido,imagen,archivo_pdf,archivo_doc,fecha) VALUES('+
			connection.escape(data.tipo)+','+
			connection.escape(data.title)+','+
			connection.escape(data.lugar)+', '+
			connection.escape(data.descripcion)+', '+
			connection.escape(data.dirigido)+', '+
			connection.escape(data.imagen)+','+
			connection.escape(data.archivo_pdf) +','+
			connection.escape(data.archivo_doc)+ ','+
			connection.escape(aux)+' )';
			
			connection.query(sql, function(error, row) 
			{
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null, {"id":row.insertId});
				}
			});
		}
	},
	put : function(data,callback){
		if(connection)
		{	
			var aux = filtroFecha(data.fecha);

			var sql ='UPDATE c_evento SET tipo='+
			connection.escape(data.tipo)+',title='+
			connection.escape(data.title)+',descripcion='+
			connection.escape(data.descripcion)+',lugar='+
			connection.escape(data.lugar)+',dirigido='+
			connection.escape(data.dirigido)+',imagen='+
			connection.escape(data.imagen)+',archivo_pdf ='+
			connection.escape(data.archivo_pdf)+',archivo_doc ='+
			connection.escape(data.archivo_doc)+',fecha='+
			connection.escape(aux)+'WHERE id='+
			connection.escape(data.id);
			connection.query(sql, function(error, row) 
			{
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null,row);
				}
			});
		}
	},
	delete : function(data,callback){
		if(connection)
		{	
			var sql = 'DELETE FROM c_evento WHERE id ='+connection.escape(data.id);
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
	ultimo_id : function(callback){
		if(connection)
		{	
			var sql =  'SELECT MAX(id) AS id FROM c_evento ';;
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

};

function filtroFecha(calendar){
	var fecha = new Date(calendar);
	var aux = fecha.getFullYear()+'-'+parseInt(fecha.getMonth() +1 ) +'-'+fecha.getDate() ;
	return aux;
}


module.exports = dataModels;