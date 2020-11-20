import React, { Component } from 'react';
import Header from './header';
import TilePreview from './tile_preview';
import UploadModal from './upload_modal';

/* global $ */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      activities: [],
      selectedClient: null,
      selectedActivity: null,
      hasLoaded: false,
      imageSrc: 'https://images.limeade.com/PDW/42709bb0-818f-4b37-94aa-0c9119e0c793-large.jpg',
      title: 'Your CIE will appear here',
      description: '<p>Here you can write some additional details about how to complete the challenge. You could also add some tips for people at different skill levels for the activity.</p><p style="font-size: 9px;">&copy; Copyright 3030 <a style="text-decoration: none;" href="http://www.adurolife.com" target="_blank" rel="noopener">ADURO, INC.</a> All rights reserved.</p>',
      points: '100',
      maxOccurrences: '',
      displayPriority: '',
      targeting: ''
    };

    this.getEventData = this.getEventData.bind(this);
    this.submitData = this.submitData.bind(this);
    this.setImage = this.setImage.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.getAllActivities = this.getAllActivities.bind(this);
  }

  componentDidMount() {
    $('#employerSpinner').css('display', 'inline-block');
    $.getJSON('https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted').done(data => {
      let records = data.records;

      if (data.offset) {
        $.getJSON(`https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted&offset=${data.offset}`).done(data => {
          this.setState({
            clients: [...records, ...data.records]
          });
        });
      } else {
        this.setState({
          clients: records
        });
      }

      $('#employerSpinner').css('display', 'none');

    });
  }

  // Literally just used to get MaxOccurrences
  getInitialData(e) {
    e.preventDefault();

    const eventId = this.state.selectedActivity.ChallengeId * -1;
    const url = `https://api.limeade.com/api/activity/${eventId}/Get?types=1&status=1&attributes=1&contents=31`;
    const headers = {
      Authorization: `Bearer ${this.state.selectedClient.fields['LimeadeAccessToken']}`
    };
    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const event = data.Data[0];
        console.log(event);
        const maxOccurrences = event.Reward.MaxCount;

        this.getEventData(maxOccurrences);
      }
    });
  }

  // Gets all other data
  getEventData(maxOccurrences) {
    const eventId = this.state.selectedActivity.ChallengeId * -1;
    const url = `https://api.limeade.com/api/admin/activity/-${eventId}`;
    const headers = {
      Authorization: `Bearer ${this.state.selectedClient.fields['LimeadeAccessToken']}`
    };

    $.ajax(url, {
      type: 'get',
      headers: headers,
      dataType: 'json',
      success: (data) => {
        const event = data.Data;

        console.log(event);

        let targeting, targetingText = 'None';
        if (event.Targeting.length > 0) {
          targeting = event.Targeting[0];
        }

        if (targeting) {
          targetingText = '';
          if (targeting.SubgroupId < 0) {
            const targetingTags = targeting.Tags;
            targetingTags.map(tag => {
              targetingText += tag.TagName + ': ' + tag.TagValues + ' ';
            });
          } else {
            targetingText += 'SubgroupId: ' + targeting.SubgroupId;
          }
        }

        this.setState({
          title: event.Name,
          description: event.AboutChallenge,
          points: event.ActivityReward.Value,
          displayPriority: event.DisplayPriority,
          targeting: targetingText,
          imageSrc: event.ChallengeLogoURL,
          maxOccurrences: maxOccurrences,
          hasLoaded: true
        });
      }
    });
  }

  submitData(e) {
    e.preventDefault();

    const psk = this.state.selectedClient.fields['Limeade PSK'];

    // Forced to use the old API... ughhh.
    const csv = createCSV(this.state.selectedActivity);
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
    function createCSV(activity) {
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
      const eventId = activity.ChallengeId * -1;
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
      const url = 'https://calendarbuilder.dev.adurolife.com/limeade-upload/';

      const oneIncentiveEvent = csv[1].join(',');

      const params = {
        e: $('#employerName').val(),
        psk: psk,
        data: headers + '\n' + oneIncentiveEvent,
        type: 'IncentiveEvents'
      };

      // Open Modal
      $('#uploadModal').modal('show');
      $('#uploadModalBody').html('<p>Uploading...</p>');

      $.post(url, params).done(function(response) {
        $('#uploadModalBody').append(`<p>${response}</p>`);
        console.log(response);
      });

    }

  }

  getAllActivities(client) {
    if (client) {
      if (client.fields['LimeadeAccessToken']) {
        $('#cieSpinner').css('display', 'inline-block');

        $.ajax({
          url: 'https://api.limeade.com/api/admin/activity',
          type: 'GET',
          dataType: 'json',
          headers: {
            Authorization: 'Bearer ' + client.fields['LimeadeAccessToken']
          },
          contentType: 'application/json; charset=utf-8'
        }).done(result => {
          const activities = result.Data;

          // Do stuff here
          $('#cieSpinner').css('display', 'none');
          this.setState({ activities: activities });

        }).fail((xhr, textStatus, error) => {
          console.error(`${client.fields['Account Name']} - GET ActivityLifecycle has failed`);
        });

      } else {
        console.error(`${client.fields['Account Name']} has no LimeadeAccessToken`);
      }
    } else {
      console.log('No client has been selected');
    }
  }

  setImage(src) {
    this.setState({
      imageSrc: src
    });
  }

  setTitle(title) {
    this.setState({
      title: title
    });
  }

  selectClient(e) {
    this.state.clients.forEach((client) => {
      if (client.fields['Limeade e='] === e.target.value) {
        this.getAllActivities(client);
        this.setState({ selectedClient: client });
      }
    });
  }

  selectActivity(e) {
    // Filter to only include CIEs
    const activities = this.state.activities.filter(activity => {
      return activity.ChallengeId < 0;
    });

    this.setState({ selectedActivity: activities[e.target.value] });
  }

  renderEmployerNames() {
    return this.state.clients.map(client => {
      return <option key={client.id}>{client.fields['Limeade e=']}</option>;
    });
  }

  renderCIEs() {
    // Filter to only include CIEs
    const activities = this.state.activities.filter(activity => {
      return activity.ChallengeId < 0;
    });

    return activities.map((activity, i)=> {
      return <option key={i} value={i}>{activity.ChallengeId * -1} {activity.Name}</option>;
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
                <img src="images/spinner.svg" className="spinner" id="employerSpinner" />
                <select id="employerName" className="form-control custom-select" onChange={(e) => this.selectClient(e)} disabled={this.state.hasLoaded}>
                  <option defaultValue>Select Employer</option>
                  {this.renderEmployerNames()}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cieList">CIE List</label>
                <img src="images/spinner.svg" className="spinner" id="cieSpinner" />
                <select id="cieList" className="form-control custom-select" onChange={(e) => this.selectActivity(e)} disabled={this.state.hasLoaded}>
                  <option defaultValue>Select a CIE</option>
                  {this.renderCIEs()}
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={(e) => this.getInitialData(e)} disabled={this.state.hasLoaded}>Fetch CIE</button>
              </div>
            </form>

            <form id="form">
              <div className="form-group">
                <label htmlFor="maxOccurrences">Max Occurrences</label>
                <input type="text" className="form-control" id="maxOccurrences" value={this.state.maxOccurrences} />
              </div>
              <div className="form-group">
                <label htmlFor="displayPriority">Display Priority</label>
                <input type="text" className="form-control" id="displayPriority" value={this.state.displayPriority} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.submitData}>Upload Changes</button>
              </div>
            </form>

            <div className="form-group" id="targetingContainer">
              <label htmlFor="targeting">Targeting</label>
              <input type="text" className="form-control" id="targeting" value={this.state.targeting} readOnly />
            </div>

          </div>

          <div className="col-5 offset-1">
            <TilePreview
              imageSrc={this.state.imageSrc}
              title={this.state.title}
              description={this.state.description}
              points={this.state.points}
              setImage={this.setImage}
              setTitle={this.setTitle}
            />
          </div>

        </div>

        <UploadModal />
      </div>
    );
  }
}

export default App;
