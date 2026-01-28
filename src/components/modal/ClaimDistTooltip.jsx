import ethereumIcon from "../../assets/helius/ethicon-min.png";
import './ClaimDistToolTip.css';
import { useSelector } from "react-redux";
import { TreasuryAddress, etherToFixed } from "../../const/const";
import { useEffect, useState } from "react";

const ClaimDistTooltip = (props) => {
    const { children, claimData } = props;
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux

    const [titanx, setTitanx] = useState(0);
    const [titanxUsd, setTitanxUsd] = useState(0);
    const [user, setUser] = useState(0);
    const [userUsd, setUserusd] = useState(0);

    useEffect(() => {
        setTitanxUsd(etherToFixed((claimData) * ether_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTitanx(etherToFixed(claimData).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }));
        setUser((etherToFixed(claimData) * 0.001).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }));
        setUserusd((etherToFixed(claimData) * 0.001 * ether_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2 }));
    }, [claimData]);
    return (
        <div className="claimdisttooltip">
            {children}
            <div className="claimdisttooltip_content">
                <header className="modal_header">
                    <div className="header_top">Claim ETH from TITANX Staking</div>
                </header>
                <main className="modal_content">
                    <div className="content_container">
                        <div className="counter_box">
                            <div className="token_counter">
                                <div className="token_counter_name">
                                    <span>
                                        <img className="iconimg" src={ethereumIcon} alt="" /></span>
                                    <span>To Be Distributed</span>
                                </div>
                                <div className="token_value">{titanx} ETH</div>
                            </div>
                            <div className="dollar_counter">≈${titanxUsd}</div>
                        </div>
                        <div className="counter_box">
                            <div className="token_counter">
                                <div className="token_counter_name">
                                    <span>User Reward</span>
                                </div>
                                <div className="token_value">{user} ETH</div>
                            </div>
                            <div className="dollar_counter">≈${userUsd}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClaimDistTooltip;