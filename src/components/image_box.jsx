import React, { Component } from 'react';

class ImageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
      editing: false,
      hasBeenEdited: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  // ComponentDidMount() {
  //   this.setState({ imageSrc: this.props.imageSrc });
  // }

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
        imageSrc: event.target.value
      });
    }
  }

  renderUrlTextarea() {
    return (
      this.state.hasBeenEdited ?
      <textarea className="form-control" rows="6" value={this.state.imageSrc} onKeyUp={this.handleKeyUp} onChange={this.handleKeyUp} autoFocus={true}></textarea> :
      <textarea className="form-control" rows="6" value={this.props.imageSrc} onKeyUp={this.handleKeyUp} onChange={this.handleKeyUp} autoFocus={true}></textarea>
    );
  }

  createUrl() {
    const originalUrl = this.props.imageSrc;
    let updatedUrl = this.state.imageSrc;

    if (updatedUrl && !updatedUrl.includes('http')) {
      updatedUrl = 'https://mywellmetrics.com' + updatedUrl;
    }

    return this.state.hasBeenEdited ? updatedUrl : originalUrl;
  }

  render() {
    return (
      <div id="image-box" className="stretchy-wrapper" onDoubleClick={this.toggleEdit} onBlur={this.toggleEdit}>
        {
          this.state.editing ?
          this.renderUrlTextarea() :
          <img className="item-info-image" src={this.createUrl()}/>
        }
      </div>
    );
  }
}

export default ImageBox;
