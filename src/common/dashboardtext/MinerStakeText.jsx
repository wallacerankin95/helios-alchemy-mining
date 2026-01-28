import React from "react";
import "./DashboardText.css"

const MinerStakeText = ({ colors, first, second }) => {

    return (
        <div className="active_text_content">
            <div className="left_text" style={{color: `${colors}`}}>{first}</div>
            <div className="right_text" style={{color: `${colors}`}}>{second}</div>
        </div>
    );
};

export default MinerStakeText;
