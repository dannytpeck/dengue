import React, { Component } from 'react';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app">
        <Header />

        <div className="row">
          <div className="col-4 offset-1">
            <form id="form">
              <div className="form-group">
                <label htmlFor="employerName">EmployerName</label>
                <input type="text" className="form-control" id="employerName" placeholder="Limeadedemorb" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control" id="password" placeholder="CoolSkeleton95" />
              </div>
              <div className="form-group">
                <label htmlFor="eventId">Event ID</label>
                <input type="text" className="form-control" id="eventId" placeholder="2350" />
              </div>
            </form>
          </div>

          <div className="col-5 offset-1">
            <div id="tile">
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
          </div>
        </div>

      </div>
    );
  }
}

export default App;
