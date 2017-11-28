import React, { Component } from 'react';

class TitleBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      editing: false,
      hasBeenEdited: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.revertChanges = this.revertChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  ComponentDidMount() {
    this.setState({ text: this.props.text });
  }

  toggleEdit(e) {
    this.setState({
      editing: !this.state.editing
    });
  }

  revertChanges() {
    this.setState({
      hasBeenEdited: false,
      text: this.props.title
    });
  }

  saveChanges(event) {
    this.setState({
      hasBeenEdited: true,
      text: event.target.value
    });
  }

  handleKeyDown(event) {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    switch (event.which) {
      case ESCAPE_KEY:
        this.revertChanges();
        this.toggleEdit();
        break;
      case ENTER_KEY:
        this.saveChanges(event);
        this.toggleEdit();
        break;
    }
  }

  renderTitleInput() {
    return (
      this.state.hasBeenEdited ?
      <input type="text" className="form-control" value={this.state.text} onChange={this.saveChanges} onKeyDown={this.handleKeyDown} autoFocus={true} /> :
      <input type="text" className="form-control" value={this.props.text} onChange={this.saveChanges} onKeyDown={this.handleKeyDown} autoFocus={true} />
    );
  }

  renderTitle() {
    return (
      this.state.hasBeenEdited ?
      <h3 className="info-title">{this.state.text}</h3> :
      <h3 className="info-title">{this.props.text}</h3>
    );
  }

  render() {
    return (
      <div id="title-box" className="info-header" onDoubleClick={this.toggleEdit} onBlur={this.toggleEdit}>
        {
          this.state.editing ?
          this.renderTitleInput() :
          this.renderTitle()
        }
      </div>
    );
  }
}

export default TitleBox;
