import React, { Component } from 'react';

class ImageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateImageSrc = this.updateImageSrc.bind(this);
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  updateImageSrc(event) {
    const ESCAPE_KEY = 27;
    if (event.which === ESCAPE_KEY) {
      this.toggleEdit();
    } else {
      this.props.setImage(event.target.value);
    }
  }

  createUrl() {
    let url = this.props.imageSrc;

    if (!url.includes('http')) {
      url = 'https://mywellmetrics.com' + url;
    }

    return url;
  }

  render() {
    return (
      <div id="image-box" className="stretchy-wrapper" onDoubleClick={this.toggleEdit} onBlur={this.toggleEdit}>
        {
          this.state.editing ?
          <textarea className="form-control" rows="9" value={this.props.imageSrc} onKeyUp={this.updateImageSrc} onChange={this.updateImageSrc} autoFocus={true}></textarea> :
          <img className="item-info-image" src={this.createUrl()}/>
        }
      </div>
    );
  }
}

export default ImageBox;
