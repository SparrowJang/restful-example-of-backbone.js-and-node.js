
var pwd = process.env.PWD;

var fs = require("fs");

var storage = {

	FILE_NAME:"data.json",

	PATH:pwd + "/data/",

	initialize:function(){

		var data = fs.readFileSync( this.PATH + this.FILE_NAME );

		this.data_ = JSON.parse( data );
	},

	save:function( name, data ){

		this.data_[ name ] = data;

	},

	clone_:function( target, cloneObject ){

		var cloneObject = cloneObject,
			target = target;

        if( arguments.length == 1 ){

			cloneObject = target;

			if( cloneObject.constructor == Array )
				target = [];
			else if( typeof cloneObject == "object" )
				target = {};
			else
				return cloneObject;

		}


		for( var index in cloneObject ){

			var tmp = cloneObject[index];

			if( cloneObject[index].constructor == Array ){

				tmp = this.clone_( [], cloneObject[index] );

			}else if( typeof cloneObject[index] == "object" ){

				tmp = this.clone_( {}, cloneObject[index] );

			}

			target[index] = tmp;
			
		}

		return target;
	},

	fetch:function( name ){

		return this.clone_( this.data_[ name ] );

	},

	flush:function(){

		var data_str = JSON.stringify( this.data_ );

		fs.writeFile( this.PATH + this.FILE_NAME, data_str );
	}
	
};

module.exports = storage;

//console.log( global );
