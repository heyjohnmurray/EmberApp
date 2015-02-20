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
			return userList;
		}
	}
});

////////////////////////////////////////////////////////////////////// 
// 'presetItems' click function :: extend view to make div clickable
//////////////////////////////////////////////////////////////////////
// event delegation :: http://emberjs.com/guides/views/handling-events/
// Info on how to create custom views, view classes, view attributes, etc ...
//		http://emberjs.com/guides/views/customizing-a-views-element/ 										
//		http://emberjs.com/guides/views/customizing-a-views-element/#toc_attribute-bindings-on-a-view
//		http://emberjs.com/api/classes/Ember.View.html#toc_templates

App.ClickableView = Ember.View.extend({
	click: function(evt) {
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

App.ItemDetailsRoute = Ember.Route.extend({
	actions: {
		inputSubmit: function(){
			var itemName = this.controller.get('itemName');
			var itemQuantity = this.controller.get('itemQuantity');
			var itemContainerSize = this.controller.get('itemContainerSize');
			var itemDate = this.controller.get('itemDate');
			var itemDescription = this.controller.get('itemDescription');

			var matched = false;

			for (var i in userList) {
				// check userList to see if name already exists
				if (userList[i].name == itemName) {

					userList[i].name = itemName;
					userList[i].quantity = itemQuantity;
					userList[i].size = itemContainerSize;
					userList[i].date = itemDate;
					userList[i].description = itemDescription;

					console.log(userList);
					break; //Stop this loop, we found it!
				}
			}
		}
	}
});

// userList.addMyItem = function (item) {
// var matched = false;

// for(var i = 0; i < this.items.length; i++) {
// 	if (this.items[i].name === item.name) {
// 		matched = true;
		
// 		// match, do an update

// 		// replace our old item with the new one
// 		this.items[i] = item;
// 		}
// 	}

// 	if (!matched) {
// 		// new item, add it
// 		this.pushObject(item);
// 	}
// };