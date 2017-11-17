import React, { Component } from 'react';

class TilePreview extends Component {
  render() {
    return (
      <div id="tile-preview">
        <div className="stretchy-wrapper">
          <img className="item-info-image" src="https://d1dyf6uqjwvcrk.cloudfront.net/cfs-file.ashx/__key/CommunityServer-Components-PostAttachments/00-19-63-91-59/Ember_5F00_Tile.png" alt="" />
        </div>
        <div id="more-info-container">
          <div className="info-header">
            <h3 className="info-title">This is the Title</h3>
          </div>
          <div className="item-info-details">
            <div className="description-text">
              {/* Begin HTML Description */}
              <div className="ember-content">
                <p><em>Ember</em> is your digital companion. It will enable you to become the best version of yourself.</p>
                <h3>Ember allows you to:</h3>
                <ul>
                  <li>Prioritize what matters most to you</li>
                  <li>Pick your goals and monitor your progress</li>
                  <li>Access interesting and relevant content + videos</li>
                  <li>Participate in self-guided learning</li>
                  <li>Book your screening &amp; coaching appointments on-the-go</li>
                </ul>
              </div>
              {/* End HTML Description */}
            </div>
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
