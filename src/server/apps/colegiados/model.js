'use strict';
var mysql = require('../../config/mysql');

var connection=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'news_db',
   port: 3306
});



var dataModels ={};
dataModels.getData = function(callback){
	if(connection)
	{
		var sql = 'select * from h_colegiado order by id desc';
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
}
dataModels.saveData =function(data,callback){
    if(connection)
	{
		console.log("data ",data);
		var	sql= 'insert into h_colegiado(nombre,ap_Paterno,ap_Materno,especialidad,tipo_Colegiado,tipo_Documento,documento,email,direccion,celular,fecha_Nac,estado) values('+
			connection.escape(data.nombre)+','+
			connection.escape(data.ap_Paterno)+','+
			connection.escape(data.ap_Materno)+','+
			connection.escape(data.especialidad)+','+
			connection.escape(data.tipo_Colegiado)+','+
			connection.escape(data.tipo_Documento)+','+
			connection.escape(data.documento)+','+
			connection.escape(data.email)+','+
			connection.escape(data.direccion)+','+
			connection.escape(data.celular)+','+
			connection.escape(data.fecha_Nac)+','+
			connection.escape(data.estado)+')';
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				console.log("id ", row.insertId);
				callback(null, {id:row.insertId});
			}
		});
	}
};

dataModels.editData=function(data,callback){
	if(connection){
		var sql= 'update h_colegiado set nombre='+
			connection.escape(data.nombre)+', ap_Paterno='+
			connection.escape(data.ap_Paterno)+', ap_Materno='+
			connection.escape(data.ap_Materno)+', especialidad='+
			connection.escape(data.especialidad)+', tipo_Colegiado='+
			connection.escape(data.tipo_Colegiado)+', tipo_Documento='+
			connection.escape(data.tipo_Documento)+', documento='+
			connection.escape(data.documento)+', email='+
			connection.escape(data.email)+', direccion='+
			connection.escape(data.direccion)+', celular='+
			connection.escape(data.celular)+', fecha_Nac='+
			connection.escape(data.fecha_Nac)+', estado='+
			connection.escape(data.estado)+' where id = '+connection.escape(data.id)+'';
		connection.query(sql,function(error,row){
			if(error) {throw error;}
			else {callback(null,{msg:'editado'});}
		});
	}
}

dataModels.removeData=function(data,callback){
	if(connection){
		console.log("eliminar " ,data.data);
		var sql='DELETE FROM h_colegiado WHERE id='+connection.escape(data.data)+'';
		connection.query(sql,function(error,row){
			if(error) {throw error;}
			else {callback(null,{msg:'eliminado'});}
		});
	}
}
module.exports =dataModels;