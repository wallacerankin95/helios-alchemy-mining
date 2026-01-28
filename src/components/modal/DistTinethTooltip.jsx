import ethereumIcon from "../../assets/helius/ethicon-min.png";
import './RewardLeft.css';
import heliosContract from "../../contract/helios.json";
import { useContractReads } from "wagmi";
import { useSelector } from "react-redux";
import { HeliosAddress, etherToFixed } from "../../const/const";
import { useEffect, useState } from "react";

const DistTinethTooltip = (props) => {
    const { children } = props;
    // Start Get Redux store variables
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux

    const heliosObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    }
    const { data } = useContractReads({
        contracts: [
            {
                ...heliosObj,
                functionName: 'getUndistributedETH',
            },
            {
                ...heliosObj,
                functionName: 'getUndistributedTitanX',
            },
        ]
    });

    const [ether, setEther] = useState(0);
    const [etherUsd, setEtherUsd] = useState(0);
    const [titanx, setTitanx] = useState(0);
    const [titanxUsd, setTitanxUsd] = useState(0);
    const [userReward, setUserReward] = useState(0);
    const [userRewardUsd, setUserRewardUsd] = useState(0);

    useEffect(() => {
        if (data) {
            setEther(etherToFixed(data[0] ? data[0] : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }));
            setEtherUsd((etherToFixed(data[0] ? data[0] : 0) * ether_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            setTitanx(etherToFixed(data[1] ? data[1] : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
            setTitanxUsd((etherToFixed(data[1] ? data[1] : 0) * titanx_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            setUserReward(parseFloat((etherToFixed(data[1] ? data[1] : 0)) * 0.003).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
            setUserRewardUsd(parseFloat((etherToFixed(data[1] ? data[1] : 0)) * 0.003 * titanx_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
    }, [data]);

    return (
        <div className="disttinethtooltip">
            {children}

            <div className="disttinethtooltip_content">
                <header className="modal_header">
                    <div className="header_top">Distributes to</div>
                    <div className="header_bottom">Payouts + Buy & Burn + Treasury + Genesis</div>
                </header>
                <main className="modal_content">
                    <div className="content_container">
                        <div className="counter_left_box">
                            <div className="token_counter">
                                <div className="token_counter_name">
                                    <span><img className='iconimg' src={ethereumIcon} alt="" /></span>
                                    <span>To Be Distributed</span>
                                </div>
                                <div className="token_value">{ether} ETH</div>
                            </div>
                            <div className="dollar_counter">≈${etherUsd}</div>
                        </div>
                        <div className="counter_left_box">
                            <div className="token_counter">
                                <div className="token_counter_name">
                                    <span><img className='iconimg' src="https://assets.coingecko.com/coins/images/32762/standard/TitanXpng_%281%29.png?1704456654 " alt="" /></span>
                                    <span>To Be Distributed</span>
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

export default DistTinethTooltip;