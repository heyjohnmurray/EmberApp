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
	this.resource('product-details', {path: '/product-details/:name'});
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
		addToList: function(){
			var value = this.get('itemName');	// gets text input value
			userList.pushObject({
				name: value
			});
			console.log('fuck');
			return userList.reverseObjects();	// list newest item first
		}
	}
});

/////////////////////// add preset items to user list on click
// this is how you do basic event delegation :: http://emberjs.com/guides/views/handling-events/
App.ClickableView = Ember.View.extend({
	click: function(evt) {
		var itemName = evt.target.innerHTML;
		userList.pushObject({
			name: itemName
		});
		return userList.reverseObjects();	// list newest item first
	}
});