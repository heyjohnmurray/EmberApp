App = Ember.Application.create();

App.Router.map(function(){
	this.resource('nav');
	this.resource('add');
	this.resource('view');
});