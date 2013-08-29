var express = require('express');
	skylander = require('./routes/skylanders');

var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());

});

app.all('/*', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
   	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-xsrf-token");
    res.header("Content-Type", "application/json");
    
    // intercept OPTIONS method
    	if ('OPTIONS' == req.method) {
      		res.send(200);
    	}else {
      		next();
    	}
});

//Routes
//List
app.get('/skylanders', skylander.findAll);
//Get Single
app.get('/skylanders/:id', skylander.findById);
//Save New
app.post('/skylanders', skylander.addSkylander);
//Update Existing
app.put('/skylanders/:id', skylander.updateSkylander);
//Delete
app.delete('/skylanders/:id', skylander.deleteSkylander);

app.listen(3000);
console.log("Listening on Port 3000....");