import React, { Component } from 'react';

class TilePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleText: this.props.title,
      editingTitle: false,
      editingDescription: false
    };

    this.toggleEditTitle = this.toggleEditTitle.bind(this);
    this.handleTitleKeyDown = this.handleTitleKeyDown.bind(this);
    this.handleUpdateTitleText = this.handleUpdateTitleText.bind(this);
  }

  toggleEditTitle() {
    this.setState({
      editingTitle: !this.state.editingTitle
    });
  }

  handleTitleKeyDown(event) {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    switch (event.which) {
      case ESCAPE_KEY:
        this.setState({ titleText: this.props.title });
        this.toggleEditTitle();
        break;
      case ENTER_KEY:
        this.handleUpdateTitleText(event);
        this.toggleEditTitle();
        break;
    }
  }

  handleUpdateTitleText(event) {
    this.setState({ titleText: event.target.value });
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
          <div className="info-header" onDoubleClick={this.toggleEditTitle} onBlur={this.toggleEditTitle}>
            {
              this.state.editingTitle ?
              <input type="text" className="form-control" value={this.state.titleText} onChange={this.handleUpdateTitleText} onKeyDown={this.handleTitleKeyDown} /> :
              <h3 className="info-title">{this.state.titleText}</h3>
            }
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
