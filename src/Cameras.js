var React = require('react');
var CamerasActions = require('./CamerasActions');
var CamerasStore = require('./CamerasStore');


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

var Camera = React.createClass({
  getInitialState: function() {
      return {
        expanded: false
      };
  },

  toggleFavorite: function(){
    CamerasActions.toggleFavorite(this.props.uin)
  },

  expand: function(e){
    e.stopPropagation();
    this.setState({expanded: true});
  },

  collapse: function(e){
    e.stopPropagation();
    this.setState({expanded: false});
  },

  render: function() {
    var cssState = 'camera';
    if (this.props.favorite) { 
      cssState += ' favorite';
    };

    if (this.state.expanded) { 
      cssState += ' expanded';
    };

    return (
      <div className={cssState}>
        <div className="camera-picture-block" onClick={this.expand} >
          <div className="close close-icon" onClick={this.collapse}>X</div>
          <img src={this.props.pic} className="camera-picture" />
        </div>
        <div className="camera-info">
          <p>{this.props.name}</p>
          <p>{this.props.views}</p>
        </div>
        <div className="camera-actions">
          <button className="add-to-favorites" onClick={this.toggleFavorite}>*</button>
        </div>
        
      </div>
    );
  }
});

var CamerasList = React.createClass({

  moveToTop: function(){
    $('body').scrollTop(0);
  },

  showMore: function(){
    CamerasActions.loadMore(this.props.seed)
  },

  render: function() {
    var cameras = this.props.data.map(function(cam) {
          var pic = "https://streaming.ivideon.com/preview/live?server=" + cam.server + "&camera=" + cam.camera;
          return (
            <Camera key={cam.uin} uin={cam.uin} favorite={cam.favorite} pic={pic} name={cam.camera_name} views={cam.total_views} />
          );
        });
    return (
      <div className="cameras-list">
        {cameras}
        <div className="controls">
          <button className="to-top-button" onClick={this.moveToTop}>To top</button>
          <button className="more-button" onClick={this.showMore}>More</button>
        </div> 
      </div>
    );
  }
});

module.exports = Cameras