var api = require('./api');
var AppDispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');


var _store = {
	data: {},
	seed: null
};

function loadCameras(data) {
  var favCams = api.getFavorites();
  favCams.map(function(cam){ 
    _store.data[cam.uin] = cam;
  });
  data.cameras.map(function(cam){ 
    _store.data[cam.uin] = cam;
  });
  _store.seed = data.seeds.next;
}

function loadMore(data) {
  api.load(data);
}

function toggleFavorite(uin) {
  var cam = _store.data[uin];
  cam.favorite = !cam.favorite;
  var favCams = CamerasStore.getFavorites();
  api.saveFavorites(favCams);
} 


var CamerasStore = merge(EventEmitter.prototype, {

  getAll: function() {
    var cams = Object.keys(_store.data).map(function (key) {
      return _store.data[key];
    });
    return cams;
  },

  getFavorites: function(){
    var cams = [];
    Object.keys(_store.data).map(function (key) {
      var cam = _store.data[key];
      if (cam.favorite) {
        cams.push(cam)
      };
    });
    return cams;
  },

  getSeed: function() {
    return _store.seed;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case 'load':
      loadCameras(action.data);
      break;
    case 'more':
      loadMore(action.data);
      break;
    case 'toggleFavorite':
      toggleFavorite(action.data);
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  CamerasStore.emitChange();

  return true;

});

module.exports = CamerasStore;