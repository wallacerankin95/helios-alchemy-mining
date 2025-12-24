import React from "react";
import './BurnPoolTime.css';
import Tooltip from "../tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const BurnPoolTime = ({ name, hour, tooltip }) => {
    return (
        <table className="reward_pool_count_table">
            <tbody>
                <tr>
                    <td className="title_amount_titanx_td_burnpool">
                        <p className="title_amount_td_burnpool_text">{name}</p>
                    </td>
                    <td>
                        <Tooltip text={tooltip}>
                            <AiOutlineQuestionCircle />
                        </Tooltip>
                    </td>
                    <td className="amount_titanx_td">{hour}</td>
                    <td className="titanx_name_td">HOURS</td>
                </tr>
            </tbody>
        </table>
    );
}

export default BurnPoolTime;