import React, { Component } from 'react';
import Header from './header';
import TilePreview from './tile_preview';

/* global $ */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      imageSrc: 'https://mywellmetrics.com/cfs-file.ashx/__key/CommunityServer-Components-PostAttachments/00-19-63-91-59/Ember_5F00_Tile.png',
      title: 'Your mobile experience is here',
      description: '<div style="font-size: 14px; line-height: 1.3em"><div class="ember-content" style="padding-bottom: 20px;"><p><em>Ember</em> is your digital companion. It will enable you to become the best version of yourself.</p><h3>Ember allows you to:</h3><ul><li>Prioritize what matters most to you</li><li>Pick your goals and monitor your progress</li><li>Access interesting and relevant content + videos</li><li>Participate in self-guided learning</li><li>Book your screening &amp; coaching appointments on-the-go</li></ul></div><div class="app-store-container" style="position: relative; height: 80px; padding: 0 0; margin-bottom: 0;"><div class="app-store-icon ios-download-icon" style="width: 50%; height: 100%; display: inline-block; float: left; padding-top: 16px;"><a href="" style="margin: 0 0 0 48px;"><img src="https://mywellnessnumbers.com/HumanPerformance/images/ios-download-icon.png" alt="Download ember on the iOS App Store"></a></div><div class="app-store-icon android-download-icon" style="width: 50%; height: 100%; display: inline-block; float: left; padding-top: 16px;"><a href="" style="margin: 0 48px 0 16px;"><img src="https://mywellnessnumbers.com/HumanPerformance/images/android-download-icon.png" alt="Download ember on the Google Play Store"></a></div></div></div>',
      points: '100',
      maxOccurrences: '',
      displayPriority: '',
      targeting: ''
    };

    this.getToken = this.getToken.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.submitData = this.submitData.bind(this);
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
        this.getInitialData(eventId, data.access_token);
      }
    });
  }

  getInitialData(eventId, token) {
    // Literally just used to get MaxOccurrences and EventImageUrl
    const url = `https://api.limeade.com/api/activity/${eventId}/Get?types=1&status=1&attributes=1&contents=31`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const event = data.Data[0];
        const imageUrl = event.MediumImageSrc;
        const maxOccurrences = event.Reward.MaxCount;
        this.getEventData(eventId, headers, imageUrl, maxOccurrences);
      }
    });
  }

  getEventData(eventId, headers, imageUrl, maxOccurrences) {
    // Gets all other data
    const url = `https://api.limeade.com/api/admin/activity/-${eventId}`;

    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const event = data.Data;
        this.setState({
          title: event.Name,
          description: event.AboutChallenge,
          points: event.ActivityReward.Value,
          displayPriority: event.DisplayPriority,
          targeting: event.Targeting,
          imageSrc: imageUrl,
          maxOccurrences: maxOccurrences,
          hasLoaded: true
        });
      }
    });
  }

  submitData(e) {
    e.preventDefault();

    // Forced to use the old API... ughhh.
    const csv = createCSV();
    console.log(csv);
    uploadToLimeade(csv);

    function clean(dirtyText) {
    // Gets rid of anything we don't want in the final HTML output
      const cleanText = dirtyText
        .replace(/\u00A9/g, '&copy;')
        .replace(/\u2013/g, '-')
        .replace(/\u2014/g, '-')
        .replace(/\u2019/g, '\'')
        .replace(/\u201C/g, '"')
        .replace(/\u201D/g, '"')
        .replace(/\t/g, '')
        .replace('rgb(255, 255, 255)', '#fff')
        .replace('rgb(255, 255, 255)', '#fff')
        .replace('rgb(228, 229, 231)', '#e4e5e7')
        .replace('rgb(61, 98, 116)', '#3d6274');

      return cleanText;
    }

    // Create a CSV for CIE uploads
    function createCSV() {
      let data = [[
        'EmployerName',
        'EventId',
        'EventName',
        'DisplayPriority',
        'RewardType',
        'PointsAwarded',
        'RewardDescription',
        'AllowSameDayDuplicates',
        'IsOngoing',
        'IsDisabled',
        'ShowInProgram',
        'IsSelfReport',
        'DataFeedMode',
        'Notify',
        'ButtonText',
        'TargetUrl',
        'EventImageUrl',
        'MaxOccurrences',
        'StartDate',
        'EndDate',
        'ViewPages',
        'Dimensions',
        'ShortDescription',
        'HtmlDescription',
        'SubgroupId',
        'Field1Name',
        'Field1Value',
        'Field2Name',
        'Field2Value',
        'Field3Name',
        'Field3Value'
      ]];

      const eventName = $('.info-title').html();
      const htmlDescription = $('.description-text').html();
      const employerName = $('#employerName').val();
      const eventId = $('#eventId').val();
      const pointsAwarded = $('.info-points span').html();
      const fullImageUrl = $('.item-info-image').attr('src');
      const eventImageUrl = fullImageUrl.substring(fullImageUrl.indexOf('/cfs'));
      const maxOccurrences = $('#maxOccurrences').val();
      const displayPriority = $('#displayPriority').val();

      const cie = [
        employerName,
        eventId,
        '"' + eventName.replace('&amp;', '&') + '"',
        displayPriority,
        'IncentivePoints',
        pointsAwarded.replace(',', ''),
        '',
        '0',
        '0',
        '0',
        '1',
        '0',
        '0',
        '0',
        '',
        '',
        eventImageUrl,
        maxOccurrences,
        '',
        '',
        '',
        '',
        '',
        '"' + clean(htmlDescription).replace(/"/g, '""') + '"',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ];

      data.push(cie);

      return data;
    }

    // Upload CSV to Limeade
    function uploadToLimeade(csv) {
      const headers = csv[0].join(',');
      const url = 'http://mywellnessnumbers.sftp.adurolife.com/limeade-upload/';

      const oneIncentiveEvent = csv[1].join(',');

      const params = {
        e: $('#employerName').val(),
        psk: $('#psk').val(),
        data: headers + '\n' + oneIncentiveEvent,
        type: 'IncentiveEvents'
      };

      $.post(url, params).done(function(response) {
        console.log(response);
      });

    }

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
                <input type="text" className="form-control" id="employerName" placeholder="Limeadedemorb" readOnly={this.state.hasLoaded} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control" id="password" placeholder="CoolSkeleton95" readOnly={this.state.hasLoaded} />
              </div>
              <div className="form-group">
                <label htmlFor="eventId">Event ID</label>
                <input type="text" className="form-control" id="eventId" placeholder="2350" readOnly={this.state.hasLoaded} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.getToken} disabled={this.state.hasLoaded}>Fetch CIE</button>
              </div>
            </form>

            <form id="form">
              <div className="form-group">
                <label htmlFor="psk">PSK</label>
                <input type="text" className="form-control" id="psk" placeholder="ABCD-1234-ABCD-1234" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.submitData}>Upload Changes</button>
              </div>
            </form>

            <div className="form-group">
              <label htmlFor="maxOccurrences">Max Occurrences</label>
              <input type="text" className="form-control" id="maxOccurrences" placeholder="1" value={this.state.maxOccurrences} />
            </div>
            <div className="form-group">
              <label htmlFor="displayPriority">Display Priority</label>
              <input type="text" className="form-control" id="displayPriority" value={this.state.displayPriority} />
            </div>
            <div className="form-group" id="targetingContainer">
              <label htmlFor="targeting">Targeting</label>
              <input type="text" className="form-control" id="targeting" value={this.state.targeting} />
            </div>

          </div>

          <div className="col-5 offset-1">
            <TilePreview imageSrc={this.state.imageSrc} title={this.state.title} description={this.state.description} points={this.state.points} />
          </div>

        </div>

      </div>
    );
  }
}

export default App;
