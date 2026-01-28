import React from "react";
import "./DashboardText.css"
import Tooltip from "../tooltip";
import tooltipText from "../../assets/helius/tooltipText.json";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const DashboardText = ({ name, balance, usd, tooltip, token }) => {

    return (
        <table className="reward_pool_count_table">
            <tbody>
                <tr>
                    <td className="title_amount_titanx_td">
                        <div className="tooltip_text_dashboard">
                            <p className="tooltip_text_dashboard_name">{name}</p>
                            <Tooltip text={tooltip}>
                                <AiOutlineQuestionCircle />
                            </Tooltip>
                        </div>
                    </td>
                    <td className="amount_titanx_td">{balance}</td>
                    <td className="titanx_name_td">{token}</td>
                </tr>

                <tr>
                    <td colSpan={2} className="amount_usd_td">≈ ${usd}</td>
                    <td className="name_usd_td">USD</td>
                </tr>
            </tbody>
        </table>
    );
};

export default DashboardText;
