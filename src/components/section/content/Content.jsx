import React from "react";
import './Content.css'
import { useEffect, useState } from "react";
import { fetchBalance, getAccount } from '@wagmi/core';
import { ethers } from "ethers";
import RewardPoolPayout from "../../../common/rewardspoolpayout/RewardPoolPayout";
import heliosContract from "../../../contract/helios.json";
import { useAccount, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import heliosAvatar from "../../../assets/helius/HLX.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    HeliosAddress,
    TitanxAddress,
    calculatePrice,
    calculateTotalPrice,
    etherToFixed,
} from "../../../const/const";
import tooltipText from "../../../assets/helius/tooltipText.json";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "../../../common/tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
const Content = () => {
    // Start Get Redux store variables
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
    const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);       // Fetch the value of HLX price from redux
    // End Get Redux store variables

    const [userEthBalance, setUserEthBalance] = useState(0);
    const [userTitanBalance, setUserTitanBalance] = useState(0);
    const [userHlxBalance, setUserHlxBalance] = useState(0);
    const [rewardPoolEther, setRewardPoolEther] = useState(0);
    const [rewardPoolTitanx, setRewardPoolTitanx] = useState(0);
    const [claimableTitanX, setClaimableTitanX] = useState(0);
    const [claimableETH, setClaimableETH] = useState(0);
    const [userMints, setUserMints] = useState([]);
    const [userStakes, setUserStakes] = useState([]);
    const [timeStamp, setTimeStamp] = useState(0);

    const [getUserActiveStakes, setGetUserActiveStakes] = useState([]);
    const [getUserClaimableStakes, setGetUserClaimableStakes] = useState([]);
    const [getUserEndedStakes, setGetUserEndedStakes] = useState([]);

    const [getUserActiveMints, setGetUserActiveMints] = useState([]);
    const [getUserClaimableMints, setGetUserClaimableMints] = useState([]);
    const [getUserEndedMints, setGetUserEndedMints] = useState([]);


    const { address, isConnected } = useAccount();

    const heliosObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    }

    const titanxObj = {
        address: TitanxAddress,
        abi: heliosContract.abi,
    }

    // Reads from contract function
    const { data } = useContractReads({
        contracts: [
            {
                ...heliosObj,
                functionName: 'getUserTitanXClaimableTotal',
                args: [address],
            },
            {
                ...heliosObj,
                functionName: 'balanceOf',
                args: [address],
            },
            {
                ...titanxObj,
                functionName: 'balanceOf',
                args: [address],
            },
            {
                ...heliosObj,
                functionName: 'getETHCyclePayoutPool',
                args: [22],
            },
            {
                ...heliosObj,
                functionName: 'getETHCyclePayoutPool',
                args: [69],
            },
            {
                ...heliosObj,
                functionName: 'getETHCyclePayoutPool',
                args: [420],
            },
            {
                ...heliosObj,
                functionName: 'getCyclePayoutPool',
                args: [22],
            },
            {
                ...heliosObj,
                functionName: 'getCyclePayoutPool',
                args: [69],
            },
            {
                ...heliosObj,
                functionName: 'getCyclePayoutPool',
                args: [420],
            },
            {
                ...heliosObj,
                functionName: 'getUserETHClaimableTotal',
                args: [address],
            },
            {
                ...heliosObj,
                functionName: "getUserStakes",
                args: [address],
            },
            {
                ...heliosObj,
                functionName: "getUserMints",
                args: [address],
            },
            {
                ...heliosObj,
                functionName: "getCurrentBlockTimeStamp",
            },
        ],
        watch: true,
    });

    /**
     *@description  Start write contract function (claimallpayout)
     * */
    const {
        data: claimAllPayoutData,
        write: claimAll,
        isLoading: isClaimAllLoading,
    } = useContractWrite({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: "claimUserAvailablePayouts",
        onError(error) {
            toast.error(error.reason.slice(0, 150) + "...", {
                autoClose: 3000,
            });
        },
    });

    const claimAllPayout = async () => {
        claimAll({ args: [], from: address });
    }
    /**
     * @descrition : Check TX for claimAll function
     * */
    const { isLoading: isConfirmationLoading } = useWaitForTransaction({
        confirmations: 1,
        hash: claimAllPayoutData?.hash,
        onSuccess(data) {
            toast.success("Successfully Claimed", { autoClose: 1300 });
        },
        onError(error) {
            toast.error(error.reason.slice(0, 150) + "...", {
                autoClose: 3000,
            });
        },
    });

    const getTotalMintHlxAmount = (mints, currentTimeStamp) => {

        let total = 0;

        mints.forEach((mint) => {
            if (mint.mintInfo.status === 0 && mint.mintInfo.maturityTs > currentTimeStamp) {
                total += parseFloat(etherToFixed(mint.mintInfo.mintableHlx));
            }
            else if (mint.mintInfo.status === 0 && mint.mintInfo.maturityTs <= currentTimeStamp) {
                total += parseFloat(etherToFixed(mint.mintInfo.mintableHlx));
            }
            else {
                total += parseFloat(etherToFixed(mint.mintInfo.mintedHlx));
            }
        });
        return total;
    }

    const getTotalMintCost = (mints) => {

        let total = 0;

        mints.forEach((mint) => {
            total += (parseFloat(etherToFixed(mint.mintInfo.mintCost)) + parseFloat(etherToFixed(mint.mintInfo.titanBurned)));
        });
        return total;
    }
    const getTotalHlxStaked = (stakes) => {

        let total = 0;

        stakes.forEach((mint) => {
            total += parseFloat(etherToFixed(mint.stakeInfo.hlxAmount));
        });
        return total;

    }

    const getTotalHlxShares = (stakes) => {

        let total = 0;

        stakes.forEach((mint) => {
            total += parseFloat(etherToFixed(mint.stakeInfo.shares));
        });
        return total;

    }

    const processUserItems = (userItems, currentTimeStamp) => {
        const userActiveItems = [];
        const userClaimableItems = [];
        const userEndedItems = [];

        userItems.forEach((item) => {
            const itemInfo = item.mintInfo || item.stakeInfo;
            if (itemInfo.maturityTs > currentTimeStamp && itemInfo.status === 0) {
                userActiveItems.push(item);
            } else if (itemInfo.maturityTs <= currentTimeStamp && itemInfo.status === 0) {
                userClaimableItems.push(item);
            } else if (itemInfo.status === 1 || itemInfo.status === 2) {
                userEndedItems.push(item);
            }
        });

        return {
            activeItems: userActiveItems,
            claimableItems: userClaimableItems,
            endedItems: userEndedItems,
        };
    };

    useEffect(() => {
        if (data) {
            setClaimableTitanX(data[0] ? data[0].toString() : 0)
            setUserHlxBalance(data[1] ? data[1].toString() : 0)
            setUserTitanBalance(data[2] ? data[2].toString() : 0)
            setRewardPoolEther((parseFloat(etherToFixed(data[3] ? data[3] : 0)) + parseFloat(etherToFixed(data[4] ? data[4] : 0)) + parseFloat(etherToFixed(data[5] ? data[5] : 0))).toFixed(2));
            setRewardPoolTitanx((parseFloat(etherToFixed(data[6] ? data[6] : 0)) + parseFloat(etherToFixed(data[7] ? data[7] : 0)) + parseFloat(etherToFixed(data[8] ? data[8] : 0))).toFixed(2));
            setClaimableETH(data[9] ? data[9].toString() : 0);
            setUserStakes(data[10] ? data[10] : 0)
            setUserMints(data[11] ? data[11] : 0);
            setTimeStamp(data[12] ? data[12].toString() : 0);
        }


        if (userStakes) {
            const { activeItems: activeStakes, claimableItems: claimableStakes, endedItems: endedStakes } = processUserItems(userStakes, timeStamp);
            setGetUserActiveStakes(activeStakes);
            setGetUserClaimableStakes(claimableStakes);
            setGetUserEndedStakes(endedStakes);
        }

        if (userMints) {
            const { activeItems: activeMints, claimableItems: claimableMints, endedItems: endedMints } = processUserItems(userMints, timeStamp);
            setGetUserActiveMints(activeMints);
            setGetUserClaimableMints(claimableMints);
            setGetUserEndedMints(endedMints);
        }


        const fetchData = async () => {
            try {
                const balanceUserData = await fetchBalance({
                    address: getAccount().address,
                });
                setUserEthBalance(ethers.utils.formatEther(balanceUserData.value.toString()));

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data, userStakes, userMints]);

    const buyTtanxClicked = () => {
        window.open("https://app.uniswap.org/swap?exactField=input&chain=mainnet&inputCurrency=ETH&outputCurrency=0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1", "_blank");
    }

    const buyHLXClicked = () => {
        window.open("https://hlx-link", "_blank");
    }

    return (
        <div className="full">
            <div className="wrapper">
                <div className="dashboard_container">
                    <div className="ether_subtitle">
                        <h2 className="first_title_helius">Your </h2>  <span><img src={heliosAvatar} alt="" /> </span>
                        <h2 className="second_title_helius">Helios Ecosystem at a Glance </h2>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="assets_cards">
                                <h1 className="title_h1_cards">Assets</h1>

                                <div className="cards_content">
                                    <div className="cards_content_text">

                                        <table className="reward_pool_count_table">
                                            <tbody>
                                                <tr>
                                                    <td className="title_amount_titanx_td">
                                                        <div className="tooltip_text_dashboard">
                                                            <p style={{ fontWeight: "bold", margin: "0" }}>Ethereum</p>
                                                            <Tooltip text={tooltipText.dashboard[0].assets.find(asset => 'ethereum' in asset)?.ethereum}>
                                                                <AiOutlineQuestionCircle />
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                    <td className="amount_titanx_td" style={{ fontWeight: "bold", margin: "0" }}>{parseFloat(userEthBalance).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} </td>
                                                    <td className="titanx_name_td" style={{ fontWeight: "bold", margin: "0" }}>ETH</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="amount_usd_td dashboard_tr" style={{ fontWeight: "bold", margin: "0" }}>≈ ${`${parseFloat(calculatePrice(userEthBalance, ether_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td>
                                                    <td className="name_usd_td dashboard_tr" style={{ fontWeight: "bold", margin: "0" }}>USD</td>
                                                </tr>
                                                <tr>
                                                    <td className="title_amount_titanx_td">
                                                        <div className="tooltip_text_dashboard">
                                                            <p style={{ fontWeight: "bold", margin: "0" }}>TitanX</p>
                                                            <Tooltip text={tooltipText.dashboard[0].assets.find(asset => 'titanx' in asset)?.titanx}>
                                                                <AiOutlineQuestionCircle />
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                    <td className="amount_titanx_td" style={{ fontWeight: "bold", margin: "0" }}>{(etherToFixed(userTitanBalance)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} </td>
                                                    <td className="titanx_name_td" style={{ fontWeight: "bold", margin: "0" }}>TITANX</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="amount_usd_td dashboard_tr" style={{ fontWeight: "bold", margin: "0" }}>≈ ${`${parseFloat(calculatePrice(etherToFixed(userTitanBalance), titanx_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</td>
                                                    <td className="name_usd_td dashboard_tr" style={{ fontWeight: "bold", margin: "0" }}>USD</td>
                                                </tr>
                                                <tr>
                                                    <td className="title_amount_titanx_td">
                                                        <div className="tooltip_text_dashboard">
                                                            <p style={{ fontWeight: "bold", margin: "0" }}>Helios</p>
                                                            <Tooltip text={tooltipText.dashboard[0].assets.find(asset => 'Helios' in asset)?.Helios}>
                                                                <AiOutlineQuestionCircle />
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                    <td className="amount_titanx_td" style={{ fontWeight: "bold", margin: "0" }}>{parseFloat(etherToFixed(userHlxBalance)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                    <td className="titanx_name_td" style={{ fontWeight: "bold", margin: "0" }}>HLX</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="amount_usd_td dashboard_tr" style={{ fontWeight: "bold", margin: "0" }}>≈ ${`${parseFloat(calculatePrice(etherToFixed(userHlxBalance), hlx_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td>
                                                    <td className="name_usd_td dashboard_tr" style={{ fontWeight: "bold", margin: "0" }}>USD</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <div className="btn_group">
                                    <button className="buy_hlx" onClick={buyHLXClicked}>Buy HLX</button>
                                    <button className="buy_hlx" onClick={buyTtanxClicked}>Buy TITANX</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="rewards_cards">
                                <Link to="/rewardpools" className="title_with_tooltip">
                                    <h1 className="title_h1_cards">Rewards</h1>
                                </Link>
                                <div className="cards_content" style={{ marginBottom: "13px", fontWeight: "bold" }}>
                                    <div className="cards_content_text">
                                        <RewardPoolPayout
                                            name="Cycle Reward Pool"
                                            titanx={parseFloat(rewardPoolTitanx).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            ether={(parseFloat(rewardPoolEther).toLocaleString('en-US', { minimumFractionDigits: 4 }))}
                                            usd={((rewardPoolTitanx * titanx_to_usd) + (rewardPoolEther * ether_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tooltip={tooltipText.dashboard[1].rewards.find(assets => 'cyclerewardpool' in assets)?.cyclerewardpool} />
                                        <RewardPoolPayout
                                            type="rewardpool"
                                            name="Claimable Rewards"
                                            titanx={parseFloat(etherToFixed(claimableTitanX)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            ether={parseFloat(etherToFixed(claimableETH)).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                            usd={parseFloat(calculateTotalPrice(calculatePrice(etherToFixed(claimableTitanX), titanx_to_usd), calculatePrice(etherToFixed(claimableETH), ether_to_usd))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tooltip={tooltipText.dashboard[1].rewards.find(asset => 'claimablerewards' in asset)?.claimablerewards}
                                        />
                                    </div>


                                </div>
                                <div className="btn_group">
                                    <button className="claim" onClick={claimAllPayout} disabled={!(isConnected && !(isClaimAllLoading || isConfirmationLoading))}>CLAIM</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="miners_cards">
                                <Link to="/mine"><h1 className="title_h1_cards">Miners</h1></Link>
                                {/* <div className="table_text">
                                    
                                </div> */}
                                <div className="cards_content">
                                    <table className="cards_content_table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Total</th>
                                                <th>Est. HLX w/hRank Bonus</th>
                                                <th>ROI</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="active_td">Active</td>
                                                <td>{(getUserActiveMints).length}</td>
                                                <td>{parseFloat(getTotalMintHlxAmount(getUserActiveMints, timeStamp)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                {/* Calculate 'temp' outside of JSX */}
                                                {(() => {
                                                    const temp = parseFloat(((((hlx_to_usd * getTotalMintHlxAmount(getUserActiveMints, timeStamp))) / (getTotalMintCost(getUserActiveMints) * titanx_to_usd)) - 1) * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                                    if (temp > 0) {
                                                        return <td className="green_font_color">{"+ " + temp + " %"}</td>;
                                                    } else {
                                                        return <td>{temp + "%"}</td>;
                                                    }
                                                })()}
                                            </tr>
                                            <tr>
                                                <td className="claimable_td">Claimable</td>
                                                <td>{(getUserClaimableMints).length}</td>
                                                <td>{parseFloat(getTotalMintHlxAmount(getUserClaimableMints, timeStamp)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                {(() => {
                                                    const temp = (((((hlx_to_usd * getTotalMintHlxAmount(getUserClaimableMints, timeStamp))) / (getTotalMintCost(getUserClaimableMints) * titanx_to_usd)) - 1) * 100).toFixed(2);
                                                    if (temp > 0) {
                                                        return <td className="green_font_color">{"+ " + temp + " %"}</td>;
                                                    } else {
                                                        return <td>{temp + "%"}</td>;
                                                    }
                                                })()}

                                            </tr>
                                            <tr>
                                                <td className="ended_td">Ended</td>
                                                <td>{(getUserEndedMints).length}</td>
                                                <td>{parseFloat(getTotalMintHlxAmount(getUserEndedMints, timeStamp)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="staked_cards">
                                <Link to="/stake"><h1 className="title_h1_cards">Staked</h1></Link>

                                <div className="cards_content">

                                    <table className="cards_content_table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Total</th>
                                                <th>HLX Staked</th>
                                                <th>Shares</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="active_td">Active</td>
                                                <td>{(getUserActiveStakes).length}</td>
                                                <td>{parseFloat(getTotalHlxStaked(getUserActiveStakes)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                <td>{parseFloat(getTotalHlxShares(getUserActiveStakes)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td>{"$ " + (parseFloat(hlx_to_usd * parseFloat(getTotalHlxStaked(getUserActiveStakes)).toFixed(2)).toFixed(2))}</td>
                                            </tr>
                                            <tr>
                                                <td className="claimable_td">Claimable</td>
                                                <td>{(getUserClaimableStakes).length}</td>
                                                <td>{parseFloat(getTotalHlxStaked(getUserClaimableStakes)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                <td>{parseFloat(getTotalHlxShares(getUserClaimableStakes)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td>{"$ " + (parseFloat(hlx_to_usd * parseFloat(getTotalHlxStaked(getUserClaimableStakes)).toFixed(2)).toFixed(2))}</td>

                                            </tr>
                                            <tr>
                                                <td className="ended_td">Ended</td>
                                                <td>{(getUserEndedStakes).length}</td>
                                                <td>{parseFloat(getTotalHlxStaked(getUserEndedStakes)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                <td>{parseFloat(getTotalHlxShares(getUserEndedStakes)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Content;