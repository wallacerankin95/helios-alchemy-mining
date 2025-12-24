import React from 'react';
import './HeaderTooltip.css';

function ContractDayTooltip(props) {
    const { text, children } = props;
    return (
        <div style={{ color: 'white' }} className="tooltipx_header">
            {children}
            <div className="tooltiptextx_header">{text}</div>
        </div>
    );
}

export default ContractDayTooltip;