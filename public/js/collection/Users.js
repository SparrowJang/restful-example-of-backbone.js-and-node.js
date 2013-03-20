
var Users = Backbone.Collection.extend({

	url: '/users',

	model:User,

	parse:function( response, options ){

		if( response.result.success ) return response.users;
	}

});


