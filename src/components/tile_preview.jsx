import React, { Component } from 'react';

class TilePreview extends Component {
  createHtml() {
    return { __html: this.props.description };
  }

  render() {
    return (
      <div id="tile-preview">
        <div className="stretchy-wrapper">
          <img className="item-info-image" src={this.props.imageSrc} alt="" />
        </div>
        <div id="more-info-container">
          <div className="info-header">
            <h3 className="info-title">{this.props.title}</h3>
          </div>
          <div className="item-info-details">
            <div className="description-text" dangerouslySetInnerHTML={this.createHtml()}></div>
          </div>
          <div className="item-info-actions">
            <button className="button button-primary">Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TilePreview;
