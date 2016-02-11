var React = require('react')
var Camera = require('./Camera');
var CamerasActions = require('../CamerasActions');

module.exports = React.createClass({

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