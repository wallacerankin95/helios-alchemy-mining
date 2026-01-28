import React from 'react';
import './MineContentNameBalance.css';
import Tooltip from '../tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

function MineContentNameBalance(props) {
    const { color, name, tooltip, balance } = props;
    return (
        <div className="position_card_name_with_balance">
            <div className="position_card_name">
                <h5 style={{ color: `${color}` }}>{name}</h5>
                <Tooltip text={tooltip}>
                    <AiOutlineQuestionCircle />
                </Tooltip>
            </div>
            <div className="position_card_balance">
                <h5 style={{ color: `${color}` }} className="span_right">{balance}</h5>
            </div>
        </div>
    );
}

export default MineContentNameBalance;