var React = require('react');
var CamerasActions = require('../CamerasActions');
var CamerasStore = require('../CamerasStore');
var CamerasList = require('./CameraList');


function getAppState() {
  return {
    cameras: CamerasStore.getAll(),
    seed: CamerasStore.getSeed()
  };
}

var Cameras = React.createClass({
  getInitialState: function() {
      return getAppState();
  },
  componentDidMount: function() {
    CamerasStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CamerasStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getAppState());
  },

  render: function() {
    return (
      <div className="cameras">
        <h1>Favorite cameras</h1>
        <CamerasList data={this.state.cameras} />
      </div>
    );
  }
});


module.exports = Cameras