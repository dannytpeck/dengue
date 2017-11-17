import React, { Component } from 'react';

class DescriptionBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      editing: false,
      hasBeenEdited: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  ComponentDidMount() {
    this.setState({ text: this.props.text });
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  handleKeyUp(event) {
    const ESCAPE_KEY = 27;
    if (event.which === ESCAPE_KEY) {
      this.toggleEdit();
    } else {
      this.setState({
        hasBeenEdited: true,
        text: event.target.value
      });
    }
  }

  renderDescriptionTextarea() {
    return (
      this.state.hasBeenEdited ?
      <textarea className="form-control" rows="6" value={this.state.text} onKeyUp={this.handleKeyUp} onChange={this.handleKeyUp}></textarea> :
      <textarea className="form-control" rows="6" value={this.props.text} onKeyUp={this.handleKeyUp} onChange={this.handleKeyUp}></textarea>
    );
  }

  createHtml() {
    return this.state.hasBeenEdited ?
    { __html: this.state.text } :
    { __html: this.props.text };
  }

  render() {
    return (
      <div id="description-box" className="item-info-details" onDoubleClick={this.toggleEdit} onBlur={this.toggleEdit}>
        {
          this.state.editing ?
          this.renderDescriptionTextarea() :
          <div className="description-text" dangerouslySetInnerHTML={this.createHtml()}></div>
        }
      </div>
    );
  }
}

export default DescriptionBox;
