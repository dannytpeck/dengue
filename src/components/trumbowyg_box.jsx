/* global $ */
import React, { Component } from 'react';
import cleanPastedHTML from '../helpers/clean_pasted_html';

class TrumbowygBox extends Component {
  constructor(props) {
    super(props);
  }

	componentDidMount() {
		$('#description-text').trumbowyg()
    .on('tbwpaste', (event) => {
      event.target.innerHTML = cleanPastedHTML(event.target.innerHTML);
    });

		$('.trumbowyg-button-pane').click(() => {
			// $('#' + this.props.name).html($('#' + this.props.name + 'Edit').html());
		});
	}

	render() {

		return (
			<div className="trumbowyg-box">
				<div id="description-text" dangerouslySetInnerHTML={{ __html: this.props.text}}></div>
			</div>
		);
	}
}

export default TrumbowygBox;
