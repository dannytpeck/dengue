import React, { useEffect } from 'react';
import cleanPastedHTML from '../helpers/clean_pasted_html';

/* global $ */
function TrumbowygBox({ text }) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable trumbowyg
    $(function() {
      $('.description-text').trumbowyg({
        btns: [
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
        ]
      }).on('tbwpaste', (event) => {
        event.target.innerHTML = cleanPastedHTML(event.target.innerHTML);
      });
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <div className="trumbowyg-box">
      <div className="description-text" dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );

}

export default TrumbowygBox;
