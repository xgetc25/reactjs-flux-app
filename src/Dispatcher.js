var Dispatcher = require('flux').Dispatcher;
var merge = require('merge');

module.exports = merge(new Dispatcher(), {
	handleAction: function(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		})
	}

});