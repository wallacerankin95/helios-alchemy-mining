import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tooltip from "../tooltip";
import "./StatsText.css"

const StatesText = ({ color, name, balance, usd, tooltip }) => {
    return (
        <table className="reward_pool_count_table">
            <tbody>
                <tr>
                    <td className="title_amount_titanx_td">
                        <span style={{ color: `${color}`, fontWeight: "bold", marginRight: "5px" }}>{name}</span>
                        <Tooltip text={tooltip}>
                            <AiOutlineQuestionCircle />
                        </Tooltip></td>
                    <td style={{ color: `${color}`, fontWeight: "bold" }} className="amount_titanx_td">{balance}</td>
                    <td style={{ color: `${color}`, fontWeight: "bold" }} className="titanx_name_td">HLX</td>
                </tr>

                <tr>
                    <td colSpan={2} className="amount_usd_td">≈ ${usd}</td>
                    <td className="name_usd_td">USD</td>
                </tr>
            </tbody>
        </table >
    );
};

export default StatesText;
