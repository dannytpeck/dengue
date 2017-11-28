import React, { Component } from 'react';
import Header from './header';
import TilePreview from './tile_preview';

/* global $ */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      imageSrc: 'https://d1dyf6uqjwvcrk.cloudfront.net/cfs-file.ashx/__key/CommunityServer-Components-PostAttachments/00-19-63-91-59/Ember_5F00_Tile.png',
      title: 'Your mobile experience is here',
      description: '<div style="font-size: 14px; line-height: 1.3em"><div class="ember-content" style="padding-bottom: 20px;"><p><em>Ember</em> is your digital companion. It will enable you to become the best version of yourself.</p><h3>Ember allows you to:</h3><ul><li>Prioritize what matters most to you</li><li>Pick your goals and monitor your progress</li><li>Access interesting and relevant content + videos</li><li>Participate in self-guided learning</li><li>Book your screening &amp; coaching appointments on-the-go</li></ul></div><div class="app-store-container" style="position: relative; height: 80px; padding: 0 0; margin-bottom: 0;"><div class="app-store-icon ios-download-icon" style="width: 50%; height: 100%; display: inline-block; float: left; padding-top: 16px;"><a href="" style="margin: 0 0 0 48px;"><img src="https://mywellnessnumbers.com/HumanPerformance/images/ios-download-icon.png" alt="Download ember on the iOS App Store"></a></div><div class="app-store-icon android-download-icon" style="width: 50%; height: 100%; display: inline-block; float: left; padding-top: 16px;"><a href="" style="margin: 0 48px 0 16px;"><img src="https://mywellnessnumbers.com/HumanPerformance/images/android-download-icon.png" alt="Download ember on the Google Play Store"></a></div></div></div>',
      points: '100',
      displayPriority: '',
      targeting: ''
    };

    this.getToken = this.getToken.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
    this.getEventData = this.getEventData.bind(this);
  }

  getEventData(eventId, headers, imageUrl) {
    const url = `https://api.limeade.com/api/admin/activity/-${eventId}`;

    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const event = data.Data;
        this.setState({
          imageSrc: imageUrl,
          title: event.Name,
          description: event.AboutChallenge,
          points: event.ActivityReward.Value,
          displayPriority: event.DisplayPriority,
          targeting: event.Targeting,
          hasLoaded: true
        });
      }
    });
  }

  getImageUrl(eventId, token) {
    const url = `https://api.limeade.com/api/activity/${eventId}/Get?types=1&status=1&attributes=1&contents=15`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const imageUrl = data.Data[0].MediumImageSrc;
        this.getEventData(eventId, headers, imageUrl);
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
        this.getImageUrl(eventId, data.access_token);
      }
    });
  }

  submitData() {
    // Forced to use the old API... ughhh.
    /*
    {
      "Message": "",
      "Data": [
        {
          "Id": 2350,
          "GoalId": 2350,
          "Title": "Welcome to Human Performance",
          "Type": 1,
          "Frequency": 0,
          "TargetGoal": 0,
          "Status": 2,
          "Attributes": 28,
          "TrackingMode": 0,
          "WinStrategy": 0,
          "TargetUrl": "",
          "StartDate": "1/1/0001",
          "EndDate": "12/31/9999",
          "Reward": {
            "Value": "0",
            "MaxCount": 1,
            "Type": 0
          },
          "SupportedDevices": [],
          "DevicesNeedingReauth": [],
          "CommentsCount": 0,
          "ActiveParticipantCount": 0,
          "Leaderboards": [],
          "Source": 1,
          "ShortDescription": "",
          "HtmlDescription": "<p><strong>What is Human Performance?</strong> <br>Human Performance addresses the interconnected elements of life: <strong>Health &amp; Fitness</strong>, <strong>Money &amp; Prosperity</strong>, <strong>Growth &amp; Development</strong> and <strong>Contribution &amp; Sustainability</strong>. Improving one element makes the others stronger &ndash; for example, improving your finances can lead to better health. Maximizing Human Performance creates the foundation you need for a more fulfilling life.</p><p style=\"margin-top:10px\">Click on any one of the Human Performance elements on your home page to learn why they're important, how they impact the other areas of your life and how you can use our resources to achieve your goals.</p><img src=\"https://challenges.mywellnessnumbers.com/images/HP_AboutTheProgram.png\" alt=\"hp_abouttheprogram\" width=\"100%\" />",
          "ExtendedProperties": {},
          "ActivityLog": [],
          "Progress": null,
          "Actions": [
            {
              "Type": "RedirectToTarget",
              "Details": {
                "Text": "Close",
                "Url": ""
              },
              "Text": "Close",
              "Url": ""
            }
          ],
          "FlagText": 0,
          "StrategyText": null,
          "PrivacyFlag": 0,
          "IsTeamChallenge": false,
          "TeamSizeMax": 0,
          "TeamSizeMin": 0,
          "IsWeightChallenge": false,
          "ShowWeeklyCalendar": false,
          "ShowExtendedDescription": false,
          "LastTrackedDate": null,
          "MediumImageSrc": "https://d1dyf6uqjwvcrk.cloudfront.net/cfs-file.ashx/__key/CommunityServer-Components-PostAttachments/00-18-07-97-79/BestLife_5F00_Tile.png",
          "SmallImageSrc": "https://d1dyf6uqjwvcrk.cloudfront.net/cfs-file.ashx/__key/CommunityServer-Components-PostAttachments/00-18-26-11-60/thumb_5F00_BestLife_5F00_5F00_5F00_Tile.png",
          "IsPHITargeted": false,
          "IsDSTLeaderboardEnabled": false,
          "IsPartnerVerifiedChallenge": false,
          "IsPeerToPeerChallenge": false,
          "IsLearningChallenge": false
        }
      ],
      "RecordCount": 0,
      "CreateTime": "2017-11-28T08:56:39"
    }
    */

    // Create a CSV for CIE uploads
    const createCSV = () => {
      let data = [[
        'EmployerName',
        'EventId',
        'EventName',
        'DisplayPiority',
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

      const eventName = '';
      const htmlDescription = '';
      const employerName = '';
      const eventId = '';
      const pointsAwarded = '';
      const eventImageUrl = '';
      const maxOccurrences = '';

      const cie = [
        employerName,
        eventId,
        '"' + eventName + '"',
        '',
        'IncentivePoints',
        pointsAwarded,
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
        '"' + htmlDescription.replace(/"/g, '""') + '"',
      ];

      data.push(cie);

      return data;
    };

    const uploadToLimeade = (type) => {
      const csv = createCSV(type);
      const headers = csv[0].join(',');
      const url = 'http://mywellnessnumbers.sftp.adurolife.com/limeade-upload/';

      const oneIncentiveEvent = csv[1].join(',');

      const params = {
        e: $('#employer-name').val(),
        psk: $('#limeadePSK').val(),
        data: headers + '\n' + oneIncentiveEvent,
        type: 'IncentiveEvents'
      };

      $.post(url, params).done(function(response) {
        console.log(response);
      });

    };

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
                <label htmlFor="psk">PSK</label>
                <input type="text" className="form-control" id="psk" placeholder="ABCD-1234-ABCD-1234" readOnly={this.state.hasLoaded} />
              </div>
              <div className="form-group">
                <label htmlFor="eventId">Event ID</label>
                <input type="text" className="form-control" id="eventId" placeholder="2350" readOnly={this.state.hasLoaded} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.getToken} disabled={this.state.hasLoaded}>Fetch CIE</button>
            </form>
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
