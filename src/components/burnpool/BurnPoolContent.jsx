import React, { useEffect, useState } from "react";
import BurnPoolStyleWrapper from "./BurnPool.style";
import RewardPoolPayout from "../../common/rewardspoolpayout/RewardPoolPayout";
import BurnPoolTime from "../../common/burnpooltime/BurnPoolTime";
import tooltipText from "../../assets/helius/tooltipText.json";
import buynburnContract from "../../contract/buyandburn.json";
import heliosContract from "../../contract/helios.json";
import {
    useContractReads,
    useContractWrite,
    useWaitForTransaction,
    useAccount,
    useContractRead,
} from "wagmi";
import { useSelector } from "react-redux";
import { BuyandburnAddress, HeliosAddress, etherToFixed } from "../../const/const";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BurnPoolText from "../../common/dashboardtext/BurnPoolText";
import BuyBurnTooltip from "../modal/BuyBurnTooltip";
import Timer from "../../common/timer/Timer";

const BurnPoolContent = () => {
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd); // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux

    const { isConnected, address } = useAccount();

    const buyAndBurnContractObj = {
        address: BuyandburnAddress,
        abi: buynburnContract.abi,
    };

    const { data } = useContractReads({
        contracts: [
            {
                ...buyAndBurnContractObj,
                functionName: "getTitanXBalance",
            },
            {
                ...buyAndBurnContractObj,
                functionName: "getWethBalance",
            },
            {
                ...buyAndBurnContractObj,
                functionName: "getWethBuyAndBurnCap",
            },
            {
                ...buyAndBurnContractObj,
                functionName: "getBuyAndBurnCap",
            },
            {
                ...buyAndBurnContractObj,
                functionName: "getBuynBurnInterval",
            },
            {
                ...buyAndBurnContractObj,
                functionName: "getlastBuynBurnCall",
            }
        ],
        watch: true,
    });

    const {
        data: buynburnData,
        write: buynburn,
        isLoading: isbuynburnLoading,
    } = useContractWrite({
        address: BuyandburnAddress,
        abi: buynburnContract.abi,
        functionName: "buynBurn",
        args: [],
        onError(error) {
            toast.error(
                error.reason?.slice(0, 150) + "..." ||
                error.message.slice(0, 150) + "...",
                {
                    autoClose: 3000,
                }
            );
        },
    });

    const { isLoading: isConfirmed } = useWaitForTransaction({
        confirmations: 1,
        hash: buynburnData?.hash,
        onSuccess(data) {
            toast.success("Successfully Sent Transaction.", { autoClose: 1300 });
        },
        onError(error) {
            toast.error(error.reason.slice(0, 150) + "...", {
                autoClose: 3000,
            });
        },
    });
    const { data: currentBlockTimeStamp } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentBlockTimeStamp',
        watch: true,
    });
    // --------- ------------
    const [titanBalance, setTitanBalance] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);
    const [getUsdBalance, setGetUsdBalance] = useState();
    const [ethSwapCap, setETHSwapCap] = useState(0);
    const [swapCap, setSwapCap] = useState(0);
    const [buynBurnInterval, setBuynBurnInterval] = useState(0);
    const [getUsdCapSwap, setGetUsdCapSwap] = useState();
    const [checkButton, setCheckButton] = useState(true);
    const [countDown, setCountdown] = useState();
    const convertToHourFormat = (timer) => {
        const remainingSeconds = timer % 86400; // Calculate remaining seconds after subtracting days
        const date = new Date(remainingSeconds * 1000); // Convert remaining seconds to date
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        return (`${hours}H:${minutes}M:${seconds}S`);
    }
    useEffect(() => {
        if (data) {
            setTitanBalance(etherToFixed(data[0] ? data[0].toString() : 0));
            setEthBalance(etherToFixed(data[1] ? data[1].toString() : 0));
            setETHSwapCap(etherToFixed(data[2] ? data[2].toString() : 0));
            setSwapCap(data[3] ? etherToFixed(data[3]) : "0.00");
            setBuynBurnInterval((data[4] ? data[4].toNumber() / 3600 : 0).toFixed(2));

            const buyburnInterval = data[4] ? data[4].toNumber() : 0;
            const lastBurnCall = data[5] ? data[5].toNumber() : 0;
            const currentBlockTime = currentBlockTimeStamp ? currentBlockTimeStamp.toString() : 0;
            const timer = parseInt(buyburnInterval) + parseInt(lastBurnCall) - parseInt(currentBlockTime);

            if (timer < 0) {
                setCheckButton(false);
                setCountdown(0);
            } else {
                setCheckButton(true);
                setCountdown(timer);
            }
        }
        setGetUsdBalance(
            (parseFloat(parseFloat(titanBalance ? titanBalance : 0) * titanx_to_usd) +
                parseFloat(parseFloat(ethBalance ? ethBalance : 0) * ether_to_usd)).toFixed(2)
        );
        const usdcap = (parseFloat(swapCap ? swapCap : 0) * titanx_to_usd +
            parseFloat((ethSwapCap ? ethSwapCap : 0) * ether_to_usd)).toFixed(2);
        setGetUsdCapSwap(usdcap);
    }, [
        data,
        ethBalance,
        swapCap,
        ethSwapCap,
        titanBalance,
        ether_to_usd,
        titanx_to_usd,
        buynBurnInterval,
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (countDown > 0) {
                setCountdown(countDown - 1);
            } else {
                clearInterval(timer);
                setCheckButton(false);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [countDown, checkButton]);

    const buyandburnClicked = () => {
        if (checkButton === true) {
            toast.error("Minimum wait time has not been exceeded.  Please wait and try again.", { autoClose: 700 });
        } else {
            buynburn({ from: address });
        }
    }

    return (
        <BurnPoolStyleWrapper>
            <div className="dashboard_container">
                <div className="ether_subtitle">
                    <h2>Burn, Baby, Burn 🔥</h2>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="burnpool_cards">
                            <div className="burnpool_title">
                                <p className="burnpool_card_title">TITANX BURN POOL</p>
                            </div>
                            <div className="burnpool_cards_content">
                                <BurnPoolText
                                    token="Soon"
                                    name="BALANCE"
                                    balance="Coming"
                                    usd="0"
                                    tooltip={
                                        tooltipText.rewardpools[1].rightbox.find(
                                            (asset) => "titanxburnpoolbalance" in asset
                                        )?.titanxburnpoolbalance
                                    }
                                />
                                <div style={{ visibility: "hidden", height: "15px" }}>asdf</div>
                                <BurnPoolText
                                    token="Soon"
                                    name="CAP PER SWAP"
                                    balance="Coming"
                                    usd="0"
                                    tooltip={
                                        tooltipText.rewardpools[1].rightbox.find(
                                            (asset) => "capperswap" in asset
                                        )?.capperswap
                                    }
                                />
                                <div style={{ visibility: "hidden", height: "15px" }}>asdf</div>
                                <BurnPoolText
                                    name="CALLABLE EVERY"
                                    balance="0"
                                    token="HOUR"
                                    usd="hour"
                                    tooltip={
                                        tooltipText.rewardpools[1].rightbox.find(
                                            (asset) => "callableevery" in asset
                                        )?.callableevery
                                    }
                                />
                            </div>
                            <div className="trigger_btn">
                                <button disabled={true}>COMING SOON</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="burnpool_cards">
                            <p className="burnpool_card_title">HLX BURN POOL</p>
                            <div className="burnpool_cards_content">
                                <RewardPoolPayout
                                    name="BALANCE"
                                    titanx={parseFloat(titanBalance).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    ether={parseFloat(ethBalance).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                    usd={parseFloat(getUsdBalance).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    tooltip={
                                        tooltipText.rewardpools[1].rightbox.find(
                                            (asset) => "titanxburnpoolbalance" in asset
                                        )?.titanxburnpoolbalance
                                    }
                                />
                                <RewardPoolPayout
                                    name="CAP PER SWAP"
                                    titanx={parseFloat(swapCap).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    ether={parseFloat(ethSwapCap).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                    usd={parseFloat(getUsdCapSwap).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    tooltip={
                                        tooltipText.rewardpools[1].rightbox.find(
                                            (asset) => "capperswap" in asset
                                        )?.capperswap
                                    }
                                />
                                <BurnPoolTime
                                    name="CALLABLE EVERY"
                                    hour={buynBurnInterval}
                                    tooltip={
                                        tooltipText.rewardpools[1].rightbox.find(
                                            (asset) => "callableevery" in asset
                                        )?.callableevery
                                    }
                                />
                            </div>
                            <div className="trigger_btn">
                                <BuyBurnTooltip>
                                    <button
                                        disabled={!(isConnected && !(isConfirmed || isbuynburnLoading))}
                                        onClick={buyandburnClicked}
                                    >
                                        BUY & BURN
                                    </button>
                                </BuyBurnTooltip>
                            </div>
                            <div className="timer_text">{convertToHourFormat(countDown)} </div>
                        </div>
                    </div>
                </div>
                <div className="modal_text">
                    <p>
                        Use <a href="https://mevblocker.io/#rpc" style={{ color: 'white', textDecoration: 'underline' }}>MEVBlocker.io</a> RPC network when calling the Buy & Burn.
                        It makes the buy & burn a lot more lucrative and effective. It's also a security best practice.
                        Learn more <a href="https://www.youtube.com/watch?v=Zou5TA5fdLI&ab_channel=CyberScrilla" style={{ color: 'white', textDecoration: 'underline' }}>here</a> — it's 1-click, takes 2 seconds & only needs to be done once.
                    </p>
                </div>
            </div>
        </BurnPoolStyleWrapper>
    );
};
export default BurnPoolContent;
