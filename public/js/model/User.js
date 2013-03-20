
var User = Backbone.Model.extend({

	urlRoot : '/users',

    validate:function( attrs, options ){

        if( !attrs.name ) return "name is null.";
                        
    },

	parse:function( response, options ){

		//from server
		if( response.result && response.result.success )

			return response.user;

		//from collection
		else if( !response.result )

			return response
	}

});



