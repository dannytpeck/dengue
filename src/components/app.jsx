import React, { Component } from 'react';
import Header from './header';
import TilePreview from './tile_preview';

/* global $ */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: 'https://d1dyf6uqjwvcrk.cloudfront.net/cfs-file.ashx/__key/CommunityServer-Components-PostAttachments/00-19-63-91-59/Ember_5F00_Tile.png',
      title: 'Your mobile experience is here',
      description: '<div style="font-size: 14px; line-height: 1.3em"><div class="ember-content" style="padding-bottom: 20px;"><p><em>Ember</em> is your digital companion. It will enable you to become the best version of yourself.</p> <h3>Ember allows you to:</h3><ul><li>Prioritize what matters most to you</li><li>Pick your goals and monitor your progress</li> <li>Access interesting and relevant content + videos</li> <li>Participate in self-guided learning</li> <li>Book your screening &amp; coaching appointments on-the-go</li></ul></div><div class="app-store-container" style="position: relative; height: 80px; padding: 0 0; margin-bottom: 0;"><div class="app-store-icon ios-download-icon" style="width: 50%; height: 100%; display: inline-block; float: left; padding-top: 16px;"><a href="" style="margin: 0 0 0 48px;"><img src="https://mywellnessnumbers.com/HumanPerformance/images/ios-download-icon.png" alt="Download ember on the iOS App Store"></a> </div> <div class="app-store-icon android-download-icon" style="width: 50%; height: 100%; display: inline-block; float: left; padding-top: 16px;"> <a href="" style="margin: 0 48px 0 16px;"><img src="https://mywellnessnumbers.com/HumanPerformance/images/android-download-icon.png" alt="Download ember on the Google Play Store"></a></div></div></div>'
    };

    this.getToken = this.getToken.bind(this);
    this.getEventData = this.getEventData.bind(this);
  }

  getEventData(eventId, token) {
    const url = `https://api.limeade.com/api/activity/${eventId}/Get?types=5&status=2&attributes=1&contents=32319`;
    const headers = {
      Authorization: `Bearer ${token}`
    };

    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const event = data.Data[0];

        this.setState({
          imageSrc: event.MediumImageSrc,
          title: event.Title,
          description: event.HtmlDescription
        });
      }
    });
  }

  getToken(e) {
    e.preventDefault();

    const headers = {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNTZ2w4Zzg1ZDNELUlVaFY3dXB5bkQzMEVYTSIsImtpZCI6IlNTZ2w4Zzg1ZDNELUlVaFY3dXB5bkQzMEVYTSJ9.eyJjbGllbnRfaWQiOiJpbnRlcm5hbGNsaWVudCIsInNjb3BlIjpbImFwaWFjY2VzcyIsIm9wZW5pZCIsInBpaWlkZW50aXR5Il0sInN1YiI6IjM3NzY0NzEiLCJhbXIiOiJwYXNzd29yZCIsImF1dGhfdGltZSI6MTUwMDQ5MzM5NiwiaWRwIjoiaWRzcnYiLCJuYW1lIjoib21lbGV0dGUiLCJlbXBsb3llcmlkIjoiMTAwODQ1Iiwicm9sZSI6IlVzZXIiLCJlbXBsb3llcm5hbWUiOiJXZWxsbWV0cmljc0RlbW8iLCJlbWFpbCI6Impvc2VwaC5wYWtAYWR1cm9saWZlLmNvbSIsImdpdmVuX25hbWUiOiJKb3NlcGgiLCJmYW1pbHlfbmFtZSI6IlBhayIsImlzcyI6Ind3dy5saW1lYWRlLmNvbSIsImF1ZCI6Ind3dy5saW1lYWRlLmNvbS9yZXNvdXJjZXMiLCJleHAiOjE1MzIwMjkzOTYsIm5iZiI6MTUwMDQ5MzM5Nn0.Yp6t1W9o8oJWqUGXtjr6fVwnRi3kdann3MJVXBPHoRB_AAnniRbbUkZbggh6fBgDvRvlDOs029K9vkNJ1DehyAO1cwZK0LibPoKvHy1Y65GiK-LoTQHalTMYryuK76GhQ-sxu8pA7JwRS0p0_LxRhY8-pf7gORAawhXwCZ4wz_sClyWsPn6DnqYEWEkEfyIEvT88hyClnZGILuDjv12qIm2EqXrGYLG6JeZzlnj7z915MXHPWFLywin7_Ff7CYcbbnIce0aQts26P0R2srbjtxiIeJBBxuq_StS-HMexzz5p0gFihlPxhFVLsb7OYiubPXBjPQpCqm85b7NrVQUwaw',
      'Content-Type': 'application/json'
    };

    const employerName = $('#employerName').val();
    const password = $('#password').val();
    const eventId = $('#eventId').val();

    const data = {
      Username: employerName,
      Password: password
    };

    $.ajax({
      url: 'https://api.limeade.com/api/usertoken',
      type: 'post',
      headers: headers,
      data: JSON.stringify(data),
      dataType: 'json',
      success: (data) => {
        this.getEventData(eventId, data.access_token);
      }
    });
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
              <button type="submit" className="btn btn-primary" onClick={this.getToken}>Submit</button>
            </form>
          </div>

          <div className="col-5 offset-1">
            <TilePreview imageSrc={this.state.imageSrc} title={this.state.title} description={this.state.description} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
