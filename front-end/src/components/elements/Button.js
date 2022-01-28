import React from 'react';

function Button({func, content, setWonModal}) {
  return <button onClick={()=>func && func() }>
      {content}
  </button>;
}

export default Button;
