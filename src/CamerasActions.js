var AppDispatcher = require('./Dispatcher');
var api = require('./api');
module.exports = {

  loadCameras: function(data) {
    AppDispatcher.handleAction({
      actionType: 'load',
      data: data
    })
  },

  loadMore: function(data) {
    AppDispatcher.handleAction({
      actionType: 'more',
      data: data
    })
  },

  toggleFavorite: function(data) {
    AppDispatcher.handleAction({
      actionType: 'toggleFavorite',
      data: data
    })
  }

};