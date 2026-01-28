import React from "react";
import './RewardPoolPayout.css';
import Tooltip from "../tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const RewardPoolPayout = ({ type, name, titanx, ether, usd, tooltip }) => {
    return (
        <table className="reward_pool_count_table">
            <tbody>
                <tr>
                    <td className="title_amount_titanx_td">
                        <div className="tooltip_text_dashboard">
                            <p className="tooltip_name_reward">{name}</p>
                            <Tooltip text={tooltip}>
                                <AiOutlineQuestionCircle />
                            </Tooltip>
                        </div>
                    </td>
                    <td className="amount_titanx_td" style={{ color: type === "rewardpool" ? "#2FF712" : null }}>{titanx}</td>
                    <td className="titanx_name_td" style={{ color: type === "rewardpool" ? "#2FF712" : null }}>TITANX</td>
                </tr>
                <tr>
                    <td colSpan={2} className="amount_eth_td" style={{ color: type === "rewardpool" ? "#2FF712" : null }}>{ether}</td>
                    <td className="name_eth_td" style={{ color: type === "rewardpool" ? "#2FF712" : null }}>
                        ETH
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="amount_usd_td">≈ ${usd}</td>
                    <td className="name_usd_td">USD</td>
                </tr>
            </tbody>
        </table >
    );
}

export default RewardPoolPayout;