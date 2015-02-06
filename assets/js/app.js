/*

	MVC basics

	http://addyosmani.com/blog/understanding-mvc-and-mvp-for-javascript-and-backbone-developers/
	http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

	M 	= MODEL	(data like JSON files or database code)	
		= Models manage the data for an application.

	V 	= VIEW 	(user interface code)	
		= Views are a visual representation of models that present a filtered view of their current state. 

	C 	= CONTROLLER
		= Controllers are an intermediary between models and views which are classically responsible 
		for two tasks: they both update the view when the model changes and update the model when the user 
		manipulates the view.

	Templating:

	JavaScript templating solutions (such as Handlebars.js and Mustache) are often used to define templates for views 
	as markup (either stored externally or within script tags with a custom type – e.g text/template) 
	containing template variables.

	MVC flow:

	Model updates View
	View sees User
	User uses Controller
	Controller manipulates Model

	Routes:

	Assist in managing application state (e.g allowing users to bookmark a particular view they have navigated to). 
	Routers are neither a part of MVC nor present in every MVC-like framework.

*/

App = Ember.Application.create();

App.Router.map(function(){
	this.resource('add');
	this.resource('view');
});

App.AddRoute = Ember.Route.extend({
	model: function(){
	  	return itemLibrary;
	}
});

App.AddController = Ember.ObjectController.extend({
	actions: {
		addToList: function(){
			alert('hey');
			// now write code that adds this item to your library of items
		}
	}
});


var itemLibrary = [
	{
		'name' : 'bread'
	},
	{
		'name' : 'milk'
	},
	{
		'name' : 'eggs'
	},
	{
		'name' : 'cereal'
	}
];

var userLibrary = [];