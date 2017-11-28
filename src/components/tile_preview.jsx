import React, { Component } from 'react';
import TitleBox from './title_box';
import DescriptionBox from './description_box';

class TilePreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tile-preview">
        <div className="stretchy-wrapper">
          <img className="item-info-image" src={this.props.imageSrc} />
        </div>
        <div id="more-info-container">

          <TitleBox text={this.props.title} points={this.props.points} />
          <DescriptionBox text={this.props.description} />

          <div className="item-info-actions">
            <button className="button button-primary">Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TilePreview;
