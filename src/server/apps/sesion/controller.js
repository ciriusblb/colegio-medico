'use strict';
var express= require('express'),
	fs= require('fs-extra'),
	doSession=require('./model').doSession,
	login=require('./model').login;






var discussController = function(app) 
{
	app.route('/Session')
		.post(function(req,res){
			login(req.body,function(error,data){
				console.log(data);
				res.json(data)
			})
		})
		.get(function(req,res){
			console.log(req.body);
			console.log(req.query);
			doSession(req.query,function(error,data){
				res.json(data);
			})
		})
}

module.exports = discussController;

