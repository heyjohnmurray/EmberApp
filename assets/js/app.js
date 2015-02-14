////////////////////////////
//	JSON objects
////////////////////////////
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

var userList = [];

////////////////////////////
// create application
//////////////////////////// 

App = Ember.Application.create();

////////////////////////////
// main router
//////////////////////////// 
App.Router.map(function(){
	this.resource('addItems');
	this.resource('viewItems');
	this.resource('itemDetails', {path: '/details/:itemName'}, function(){ // the dynamic segment name doesn't seem to be tied to the param named passed to it from the template
	  	this.route('addInfo');
	});
});

	// Notes: as long as you have a resource mapped, you can't 'link-to' it

//////////////////////////// 
// 'add' template code
//////////////////////////// 
App.AddItemsRoute = Ember.Route.extend({
	model: function() {
		return Ember.RSVP.hash({ // RSVP.hash lets me have multiple models in one router http://stackoverflow.com/questions/20521967/emberjs-how-to-load-multiple-models-on-the-same-route
			presetItems: itemLibrary,
			userItems: userList
		});
    }
});

App.AddItemsController = Ember.ObjectController.extend({
	actions: {
		// item entry form submit
		inputSubmit: function(){
			var value = this.get('itemName');	// gets text input value
			userList.pushObject({
				name: value
			});
			document.querySelector('.js-input-add-item').value = ''; // clear input on submit
			return userList.slice().reverseObjects();	// list newest item first add .reverseObjects(), but figure out why it's not perfect
		}
	}
});

////////////////////////////////////////////////////////////////////// 
// 'presetItems' click function :: extend view to make div clickable
//////////////////////////////////////////////////////////////////////
// event delegation :: http://emberjs.com/guides/views/handling-events/
App.ClickableView = Ember.View.extend({
	click: function(evt) {
		var itemName = evt.target.innerHTML;
		userList.pushObject({
			name: itemName
		});
		return userList;
	}
});

// App.MyView = Ember.View.extend({
//   tagName: 'button',
//   classNameBindings: ['add-item-button'],
//   href: "http://emberjs.com",
//   template: Ember.Handlebars.compile('I am the template')
// });

App.MyView = Ember.View.extend({
	classNames: ['button, add-item-button'],
	tagName: 'button',
	attributeBindings: ['customHref:data'],
  customHref: "http://emberjs.com",
	click: function (evt) {
		var itemName = evt.target.innerHTML;
		userList.pushObject({
			name: itemName
		});
		return userList;
	}
});

// this just outputs the list on the 'viewItems' page
App.ViewItemsRoute = Ember.Route.extend({
	model: function(){
	  	return userList;
	}
});

// App.DetailsRoute = Ember.Route.extend({ // this should return more than just the name but this is a start
//     model: function(params) {
//         return userList.findBy('name', params.itemName); // assuming you want to find the details by it's name
//     }
// });