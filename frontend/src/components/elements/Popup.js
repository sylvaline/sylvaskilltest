import React from 'react';

function Popup({text, color}) {
  return <div className="popup" style={{backgroundColor: color?color:"gray"}}>
      <div className="popup_inner">
          <p>{text ? text : "Experiment have started.."}</p>
      </div>
  </div>;
}

export default Popup;
