import React, { Component } from 'react';
import cleanPastedHTML from '../helpers/clean_pasted_html';

class TrumbowygBox extends Component {
  constructor(props) {
    super(props);
  }

	componentDidMount() {
    /* global $ */
		$('.description-text').trumbowyg().on('tbwpaste', (event) => {
      event.target.innerHTML = cleanPastedHTML(event.target.innerHTML);
    });
	}

	render() {
		return (
			<div className="trumbowyg-box">
				<div class="description-text" dangerouslySetInnerHTML={{ __html: this.props.text }}></div>
			</div>
		);
	}
}

export default TrumbowygBox;
