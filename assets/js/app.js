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

App = Ember.Application.create();

App.Router.map(function(){
	this.resource('add');
	this.resource('view');
});

App.AddRoute = Ember.Route.extend({
	// print preset items to page
	model: function(){
	  	return itemLibrary; 
	}
});

App.AddController = Ember.ObjectController.extend({
	actions: {
		// add the clicked item to userLibrary JSON object
		addToList: function(){
			var value = this.get('itemName');	// gets text input value
			userLibrary.push(value);			// adds it to JSON Object
			console.log(userLibrary);
		},
	}
});