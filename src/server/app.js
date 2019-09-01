
var express= require("express");
var http=require('http');
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser"); 
var formidable= require('express-form-data');




// var server = http.createServer(app);
// var io = require("socket.io").listen(server);


//configuration
app.use(morgan('dev'));//hace un lof de cada requeste al terminal

app.use(bodyParser({limit: '100mb'}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(formidable.parse({keepExtensions:true}));

//parse application/x-www-form-urlencoded
app.use(bodyParser.json());//parse application/json
// morgan.setDefaults({cache:false});


app.use('/', express.static('./src/client'));
// app.use('/', express.static('./node_modules'));//setea los archivos staticos
// app.use('/', express.static('./src/server'));
app.use('/', express.static('./src/server/public'));

require('./apps/home/controller')(app);
require('./apps/servicios/nosotros/controller')(app);
require('./apps/servicios/convenios/controller')(app);
require('./apps/servicios/medicos/controller')(app);

require('./apps/galeria/controller')(app);





require('./apps/colegiados/controller')(app);

require('./apps/sesion/controller')(app);

var eventos =require('./apps/eventos/controller');
app.use('/',eventos);





// require('./apps/albergue/controller')(app);
// require('./apps/galeria/controller')(app);







	
app.get('*',function(req,res){
		res.sendfile('./src/client/index.html');
	});

app.listen(7000);
console.log("app listening on port 8000");
