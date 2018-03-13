import React, { Component } from 'react';
import cleanPastedHTML from '../helpers/clean_pasted_html';

class TrumbowygBox extends Component {
  constructor(props) {
    super(props);
  }

	componentDidMount() {
    /* global $ */
		$('.description-text').trumbowyg(
			{ btns: 
				[
				['viewHTML'],
        ['undo', 'redo'], // Only supported in Blink browsers
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['foreColor', 'backColor'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat']
				] }
			).on('tbwpaste', (event) => {
      event.target.innerHTML = cleanPastedHTML(event.target.innerHTML);
    });
	}

	render() {
		return (
			<div className="trumbowyg-box">
				<div className="description-text" dangerouslySetInnerHTML={{ __html: this.props.text }}></div>
			</div>
		);
	}
}

export default TrumbowygBox;
