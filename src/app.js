var React = require('react')
var ReactDOM = require('react-dom')

var api = require('./api');
var Store = require('./CamerasStore')
var Cameras = require('./Cameras')



api.load();

ReactDOM.render(
 <Cameras />,
  document.getElementById('app')
);