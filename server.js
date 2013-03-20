
var express = require('express');
var app = express();
var api = require("./lib/api");

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.put('/users/:id', function( req, res ){

	var name = req.body.name,
		id = req.body.id,
		result;

	if( id && name ) result = api.update( id, name )

	res.send( result );
});

app.delete('/users/:id', function( req, res ){

	var id = req.params.id,
		result;

	if( id ) result = api.remove( id );

	res.send( result );
});

app.post('/users',function( req, res ){

	var name = req.body.name,
		result;

	if( name ) result = api.create( name );
	

	res.send( result );

});

app.get('/users/:id',function( req, res ){

	var id = req.params.id,
		result;

	if( id ) result = api.fetch( id );

	res.send( result );

});

app.get('/users',function( req, res ){

	var result = api.fetch();

	res.send( result );

});


app.listen(3000);

