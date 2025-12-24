import React from "react";
import "./BurnPoolText.css"
import Tooltip from "../tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const BurnPoolText = ({ name, balance, usd, tooltip, token }) => {

    return (
        <table className="reward_pool_count_table_burnpool">
            <tbody>
                <tr>
                    <td className="title_amount_titanx_td">
                        <div className="tooltip_text_dashboard">
                            <p className="tooltip_text_name_dashboard">{name}</p>
                            <Tooltip text={tooltip}>
                                <AiOutlineQuestionCircle />
                            </Tooltip>
                        </div>
                    </td>
                    {/* <td className="space_td"></td> */}
                    <td className="amount_titanx_td">{balance}</td>
                    <td className="titanx_name_td_burnpool">{token}</td>
                </tr>
                {usd == "hour" ? undefined : (
                    <tr>
                        <td colSpan={2} className="amount_usd_td">≈ ${usd}</td>
                        <td className="name_usd_td">USD</td>
                    </tr>
                )}

            </tbody>
        </table>
    );
};

export default BurnPoolText;
