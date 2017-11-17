import React, { Component } from 'react';
import Header from './header';
import TilePreview from './tile_preview';

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
            <TilePreview />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
