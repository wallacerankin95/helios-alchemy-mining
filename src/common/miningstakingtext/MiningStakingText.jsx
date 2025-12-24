import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tooltip from "../tooltip";
import "./MiningStakingText.css"

const MiningStakingText = ({ name, tooltip, balance }) => {

    return (
        <div className="stats_position_card_name_with_balance">
            <div className="position_card_name">
                <h5 style={{ color: '#fff' }}>{name}</h5>
                <Tooltip text={tooltip}>
                    <AiOutlineQuestionCircle />
                </Tooltip>
            </div>
            <div className="position_card_balance">
                <h5 className="span_right">{balance}</h5>
            </div>
        </div>
    );
};

export default MiningStakingText;
