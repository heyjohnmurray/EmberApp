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

App = Ember.Application.create();

////////////////////////////
// main router
//////////////////////////// 
App.Router.map(function(){
	this.resource('add');
	this.resource('view');
	this.resource('details', {path: '/details/:itemName'});
});

//////////////////////////// 
// 'add' template code
//////////////////////////// 
App.AddRoute = Ember.Route.extend({
	model: function() {
		return Ember.RSVP.hash({ // RSVP.hash lets me have multiple models in one router http://stackoverflow.com/questions/20521967/emberjs-how-to-load-multiple-models-on-the-same-route
			presetItems: itemLibrary,
			userItems: userList
		});
    }
});

App.AddController = Ember.ObjectController.extend({
	actions: {
		/////////////////////// add the clicked item to userList JSON object
		inputSubmit: function(){
			var value = this.get('itemName');	// gets text input value
			userList.pushObject({
				name: value
			});
			return userList;	// list newest item first add .reverseObjects(), but figure out why it's not perfect
		}
	}
});

/////////////////////// add preset items to user list on click
// event delegation :: http://emberjs.com/guides/views/handling-events/
App.ClickableView = Ember.View.extend({
	click: function(evt) {
		var itemName = evt.target.innerHTML;
		userList.pushObject({
			name: itemName
		});
		return userList;	// list newest item first add .reverseObjects(), but figure out why it's not perfect
	}
});