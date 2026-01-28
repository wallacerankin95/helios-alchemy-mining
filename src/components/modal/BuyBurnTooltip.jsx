import './ClaimDistToolTip.css';
import treasuryConrtact from "../../contract/treasury.json";
import buyandburnContract from "../../contract/buyandburn.json";
import { useContractRead } from "wagmi";
import { useSelector } from "react-redux";
import { BuyandburnAddress, TreasuryAddress, etherToFixed } from "../../const/const";
import { useEffect, useState } from "react";

const BuyBurnTooltip = (props) => {
    const { children } = props;
    // Start Get Redux store variables
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux


    const { data: buyburn } = useContractRead({
        address: BuyandburnAddress,
        abi: buyandburnContract.abi,
        functionName: 'getBuyAndBurnCap',
        watch: true,
    });

    const [userReward, setUserReward] = useState(0);
    const [userRewardUsd, setUserRewardUsd] = useState(0);

    useEffect(() => {
        setUserReward((etherToFixed(buyburn ? buyburn : 0) * 0.0033).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
        setUserRewardUsd(parseFloat((etherToFixed(buyburn ? buyburn : 0) * 0.0033) * titanx_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }, [buyburn]);

    return (
        <div className="buyburntooltip">
            {children}
            <div className="buyburntooltip_content">
                <header className="modal_header">
                    <div className="header_top">Buys HLX from the Uniswap LP and burns them!</div>
                    <div className="header_bottom">(Use MEVBlocker.io)</div>
                </header>
                <main className="modal_content">
                    <div className="content_container">

                        <div className="counter_box_buyburn">
                            <div className="token_counter">
                                <div className="token_counter_name">
                                    <span>User Reward</span>
                                </div>
                                <div className="token_value">{userReward} TITANX</div>
                            </div>
                            <div className="dollar_counter">≈${userRewardUsd}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BuyBurnTooltip;