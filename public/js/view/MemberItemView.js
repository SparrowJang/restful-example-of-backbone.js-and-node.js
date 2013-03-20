
var MemberItemView = Backbone.View.extend({

	tagName:"li",

	events:{
		"click .name":"changeName",
		"click button.save":"save",
		"click button.del":"delete"
	},

	template:_.template( "<div class='id'> <%= id %> </div>" + 
						 "<div class='name'> <%= name %> </div>" +
						 "<div class='btn-group'> <button class='save'>save</button><button class='del'>delete</button> </div>" +
						 "<div class='clear-both'></div>" ),

	initialize:function( opts ){

		this.listenTo( this.model, 'change', this.render );

		this.listenTo( this.model, 'destroy', this.remove );

		this.listenTo( this.model, 'invalid', this.enterError );
		
	},

	enterError:function( model, error, options ){
		alert( error );
	},

	changeName:function( event ){

		var name = prompt(" Enter your name,please! ");

		if( name !== null ) this.model.set({name:name},{validate:true});
	},

	save:function(){
		this.model.save();
	},

	delete:function(){
		this.model.destroy();
	},

	render:function(){
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	}

});

