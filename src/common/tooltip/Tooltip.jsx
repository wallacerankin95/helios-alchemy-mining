import React from 'react';
import './Tooltip.css';

function Tooltip(props) {
  const { text, children } = props;
  return (
    <div style={{ color: 'white' }} className="tooltipx">
      {children}
      <div className="tooltiptextx">{text}</div>
    </div>
  );
}

export default Tooltip;