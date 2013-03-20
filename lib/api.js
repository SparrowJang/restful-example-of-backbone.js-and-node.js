
var storage = require("./storage");

storage.initialize();

var users = storage.fetch( "users" );
var user_count = storage.fetch( "user_count" );

var api = {

	create:function( name ){

		var id = user_count + 1,
			user = { id:id, name:name };

			users.push( user );
			storage.save( "users", users );
			storage.save( "user_count", user_count++ );
			storage.flush();

		return this.createResponse_( this.SUCCESS, user );
	},

	update:function( id, name ){

		var result = this.findById_( id ),
			user;

		if( result ){

			user = result.user;
			user.name = name;
		}

		this.syncStorage_();

		return this.createResponse_( user? this.SUCCESS:this.FAIL , user );
	},

	remove:function( id ){

		var result = this.findById_( id ),
			user;

		if( result ){

			user = users.splice( result.index, 1 );
		}

		this.syncStorage_();

		return this.createResponse_( user? this.SUCCESS:this.FAIL , user );

	},

	syncStorage_:function(){
		
		storage.save( "users", users );
		storage.flush();
	},

	findById_:function( id ){

		var result = null;
		
		users.some(function( user, index ){

			if( user.id == id ){

				result = { index:index, user:user };
				return true;
			}

		});

		return result;

	},

	createResponse_:function( success, users ){
		var result = { result:{success:success} };

		if( users.constructor == Array )
			result["users"] = users;
		else
			result["user"] = users;

		return result;
	},

	SUCCESS:true,

	FAIL:false,

	fetch:function( id ){

		if( arguments.length ){

			var result = this.findById_( id ),

				user = result? result.user : null;

			return this.createResponse_( this.SUCCESS ,user );

		}else
			return this.createResponse_( this.SUCCESS, users );
	}

};

module.exports = api;
