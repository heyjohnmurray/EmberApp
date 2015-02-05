App = Ember.Application.create();

App.Router.map(function(){
	this.resource('add');
	this.resource('view');
});

App.IndexController = Ember.ObjectController.extend({
	isVisible : false,

	actions: {
		show: function(){
			this.set('isVisible', true);
		},

		hide: function(){
		  	this.set('isVisible', false);
		}
	},
});