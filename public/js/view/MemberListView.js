

var MemberListView = Backbone.View.extend({

	tagName:"div",

	events:{
		"click button.add-user":"addUser"
	},

	initialize:function( opts ){

		this.initializeElements_();

		this.list_ = opts && opts.list? opts.list : new Users();

		this.listenTo( this.list_, 'reset', this.render );

		this.listenTo( this.list_, 'add', this.addOne );

		this.list_.fetch();

	},

	initializeElements_:function(){

		this.$ul_ = $(  $.parseHTML( "<ul></ul>" ) ).appendTo( this.$el );

		$( $.parseHTML( "<button class='add-user'>新增</button>" ) ).appendTo( this.$el )

	},

	template:_.template( "<li class='title'>" +
						 "<div class='id'> id </div>" +
                         "<div class='name'> name </div>" +
						 "<div class='clear-both'></div>" +
						 "</li>"),


	addUser:function(){

		var name = prompt(" Enter your name,please! ");
	
		if( name !== null ) this.list_.create({name:name},{wait: true});
	},

	addOne:function( user ){

		var itemView = new MemberItemView({model:user});

		this.$ul_.append( itemView.render().$el )
	},

	render:function(){

		var _this = this;

		this.$ul_.empty();

		this.$ul_.append( this.template() );

		this.list_.each(function( user ){

			_this.addOne( user );
		});
	}

});


