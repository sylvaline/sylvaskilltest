import React from 'react';


function Modal({title, subtitle, content, won=false}) {
  return <div className="modal">
      <div className="modal_inner won">
          <h3>{title}</h3>
          <p style={{color:won?"green":"red"}}>{subtitle}</p>
          {content}
      </div>
  </div>;
}

export default Modal;
