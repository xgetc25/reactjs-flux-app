var CamerasActions = require('./CamerasActions');
var API_URL = "http://api.ivideon.com/tv/cameras";

module.exports = {
	load: function(seed) {
		$.ajax({
		  url: API_URL,
		  jsonp: 'jsonp',
		  dataType: 'jsonp',
		  data: {
		    limit: 5,
		    seed: seed
		  },
		  success: function(data){
		  	console.log(data.response)

		  	CamerasActions.loadCameras(data.response);
		  },
		  cache: false
		})
	},

	saveFavorites: function(cameras){
		localStorage.setItem('favorites', JSON.stringify(cameras) );
	},

	getFavorites: function(){
		return JSON.parse(localStorage.getItem('favorites')) || [];
	}
}
