'use strict';


var jwt = require('jsonwebtoken');
var moment = require('moment')
var mySecretKey='romarioSeLaCome';

var tokenConfiguration={};

tokenConfiguration.createToken = function(data){
	console.log('servicio token ',data);
	var payload={
		sub:data.id,
		iat:moment().unix(),
		exp:moment().add(1,'year').unix()
	}
	return jwt.sign({payload},mySecretKey);
}

tokenConfiguration.isAuth = function(req,res,next){
	console.log(req.headers.authorization);
	var token = null;
	if(req.headers.authorization){
		var authorization = req.headers.authorization.split(" ");
		if(authorization.length===2){
			var key = authorization[0];
			var val = authorization[1];
			if(/^Bearer$/i.test(key)){
				token = val.replace(/"/g,"");
				jwt.verify(token,mySecretKey,function(err,decoded){
					if(err){
						console.log('err ',err);
						res.status(401);
					}else{
						console.log('decoded ',decoded)
						next();
					}
				})
			}
		} 
	}else{
		res.status(401);
	}


}
module.exports =tokenConfiguration;
