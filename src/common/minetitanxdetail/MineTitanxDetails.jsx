import React from 'react';
import './MineTitanxDetails.css';
import Tooltip from '../tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

function MineTitanxDetails(props) {
    const { name, tooltip, balance } = props;
    return (
        <div className="mine_titanx_container">
            <div className="mine_titanx_name">
                <span>{name}</span>
                <Tooltip text={tooltip}>
                    <AiOutlineQuestionCircle />
                </Tooltip>
            </div>
            <div className="mine_titanx_balance">
                <span className="span_right">{balance}</span>
            </div>
        </div>
    );
}

export default MineTitanxDetails;