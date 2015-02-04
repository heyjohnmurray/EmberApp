App = Ember.Application.create();

App.Router.map(function(){
  	this.route('add');
});

App.AddRoute = Ember.Route.extend({
	model: function(){
		return add;
	}
});