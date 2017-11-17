import React, { Component } from 'react';
import TitleBox from './title_box';

class TilePreview extends Component {
  constructor(props) {
    super(props);
  }

  createHtml() {
    return { __html: this.props.description };
  }

  render() {
    return (
      <div id="tile-preview">
        <div className="stretchy-wrapper">
          <img className="item-info-image" src={this.props.imageSrc} />
        </div>
        <div id="more-info-container">

          <TitleBox text={this.props.title} />

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
