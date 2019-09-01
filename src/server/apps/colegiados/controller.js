'use strict';
var express= require('express'),
	fs= require('fs-extra'),
	getData=require('./model').getData,
	saveData = require('./model').saveData,	
	editData=require('./model').editData,
	removeData=require('./model').removeData;

	
var sendEmail = require('./sendEmail');
var isAuth= require('../sesion/service').isAuth;

var discussController = function(app) 
{
	app.route('/Colegiados')
		.get(isAuth,function(req,res){
			getData(function(error,data){
				res.send(data);
			})
		})
		.post(function(req,res){
	 		saveData(req.body,function(error,data){
	 			res.send(data);
	 		})
	 	})
	 	.put(function(req,res){
	 		editData(req.body,function(error,data){
				res.send(data);
			});
		})
		.delete(function(req,res){
			removeData(req.query,function(error,data){
				res.send(data);
			})
		})


	app.route('/sendEmail')
		.post(function(req,res){
			sendEmail(req.body,function(error,data){
				res.send(data)
			})
		})
}

module.exports = discussController;



