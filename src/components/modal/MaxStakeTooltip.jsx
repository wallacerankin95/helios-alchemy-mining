import './ClaimDistToolTip.css';
import treasuryConrtact from "../../contract/treasury.json";
import { useContractRead } from "wagmi";
import { useSelector } from "react-redux";
import { TreasuryAddress, etherToFixed } from "../../const/const";
import { useEffect, useState } from "react";

const MaxStakeTooltip = (props) => {
    const { children } = props;
    // Start Get Redux store variables 
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux


    const { data: titanBalance } = useContractRead({
        address: TreasuryAddress,
        abi: treasuryConrtact.abi,
        functionName: 'getTitanBalance',
        watch: true,
    });

    const [titanx, setTitanx] = useState(0);
    const [titanxUsd, setTitanxUsd] = useState(0);
    const [userReward, setUserReward] = useState(0);
    const [userRewardUsd, setUserRewardUsd] = useState(0);

    useEffect(() => {
        setTitanx(etherToFixed(titanBalance ? titanBalance : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
        setTitanxUsd((etherToFixed(titanBalance ? titanBalance : 0) * titanx_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setUserReward(parseFloat((etherToFixed(titanBalance ? titanBalance : 0)) * 0.001).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
        setUserRewardUsd(parseFloat((etherToFixed(titanBalance ? titanBalance : 0)) * 0.001 * titanx_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }, [titanBalance]);

    return (
        <div className="maxstaketooltip">
            {children}
            <div className="maxstaketooltip_content">
                <header className="modal_header">
                    <div className="header_top">Max Stakes Liquid TITANX</div>
                    <div className="header_bottom">from Helios Treasury into TitanX Stake Pool</div>
                </header>
                <main className="modal_content">
                    <div className="content_container">
                        <div className="counter_box">
                            <div className="token_counter">
                                <div className="token_counter_name">
                                    <span><img className='iconimg' src="https://assets.coingecko.com/coins/images/32762/standard/TitanXpng_%281%29.png?1704456654 " alt="" /></span>
                                    <span>To Be Staked</span>
                                </div>
                                <div className="token_value">{titanx} TITANX</div>
                            </div>
                            <div className="dollar_counter">≈${titanxUsd}</div>
                        </div>
                        <div className="counter_box">
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

export default MaxStakeTooltip;