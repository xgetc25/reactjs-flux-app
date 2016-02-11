var React = require('react')
var CamerasActions = require('../CamerasActions');

module.exports = React.createClass({
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