import React, { useEffect, useState } from "react";
import RewardContentStyleWrapper from "./RewardPoolContent.style";
import ProgressBar from "@ramonak/react-progress-bar";
import RewardPoolPayout from "../../../common/rewardspoolpayout/RewardPoolPayout";
import DashboardText from "../../../common/dashboardtext/DashboardText";
import tooltipText from "../../../assets/helius/tooltipText.json";
import { fetchBalance } from '@wagmi/core';
import heliosContract from "../../../contract/helios.json";
import treasuryConrtact from "../../../contract/treasury.json";
import titanxContract from "../../../contract/titanx.json";
import { useAccount, useContractRead, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { useSelector } from "react-redux";
import { TreasuryAddress, HeliosAddress, etherToFixed, TitanxAddress } from "../../../const/const";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "../../../common/tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import MaxStakeTooltip from "../../modal/MaxStakeTooltip";
import ClaimDistTooltip from "../../modal/ClaimDistTooltip";
import DistTinethTooltip from "../../modal/DistTinethTooltip";
import DistPayoutTooltip from "../../modal/DistPayoutTooltip";

const RewardPoolContent = () => {

    const { address, isConnected } = useAccount();

    // Start Get Redux store variables
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
    const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);


    const [ethCycle22Payout, setEthCycle22Payout] = useState(0);
    const [ethCycle69Payout, setEthCycle69Payout] = useState(0);
    const [ethCycle420Payout, setEthCycle420Payout] = useState(0);
    const [cycle22Payout, setCycle22Payout] = useState(0);
    const [cycle69Payout, setCycle69Payout] = useState(0);
    const [cycle420Payout, setCycle420Payout] = useState(0);
    const [userEthCycle22Payout, setUserEthCycle22Payout] = useState(0);
    const [userEthCycle69Payout, setUserEthCycle69Payout] = useState(0);
    const [userEthCycle420Payout, setUserEthCycle420Payout] = useState(0);
    const [userCycle22Payout, setUserCycle22Payout] = useState(0);
    const [userCycle69Payout, setUserCycle69Payout] = useState(0);
    const [userCycle420Payout, setUserCycle420Payout] = useState(0);
    const [liquidTitanX, setLiquidTitanX] = useState(0);
    const [titanxStaked, setTitanxStaked] = useState(0);
    const [claimableETH, setClaimableETH] = useState(0);
    const [investmentBalance, setInvestimentBalance] = useState(0);
    const [activeHlxStakeContract, setActiveHlxStakeContract] = useState(TreasuryAddress);
    const [disableButton, setDisableButton] = useState(false);

    const heliosObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    }
    const treasuryObj = {
        address: TreasuryAddress,
        abi: treasuryConrtact.abi
    }
    const titanxObj = {
        address: TitanxAddress,
        abi: titanxContract.abi
    }

    const { data: userEst } = useContractReads({
        contracts: [
            {
                ...heliosObj,
                functionName: 'getGlobalActiveShares'
            },
            {
                ...heliosObj,
                functionName: 'getUserCurrentActiveShares',
                args: [address],
            },
        ],
        watch: true,
    })

    const { data } = useContractReads({
        contracts: [
            {
                ...heliosObj,
                functionName: 'getGlobalActiveShares',
            },
            {
                ...heliosObj,
                functionName: "getETHCyclePayoutPool",
                args: [22],
            },
            {
                ...heliosObj,
                functionName: "getETHCyclePayoutPool",
                args: [69],
            },
            {
                ...heliosObj,
                functionName: "getETHCyclePayoutPool",
                args: [420],
            },
            {
                ...heliosObj,
                functionName: "getCyclePayoutPool",
                args: [22],
            },
            {
                ...heliosObj,
                functionName: "getCyclePayoutPool",
                args: [69],
            },
            {
                ...heliosObj,
                functionName: "getCyclePayoutPool",
                args: [420],
            },
            {
                ...heliosObj,
                functionName: "calculateUserCycleReward",
                args: [address, 22],
            },
            {
                ...heliosObj,
                functionName: "calculateUserCycleReward",
                args: [address, 69],
            },
            {
                ...heliosObj,
                functionName: "calculateUserCycleReward",
                args: [address, 420],
            },
            {
                ...heliosObj,
                functionName: "getUndistributedTitanX",
            },
            {
                ...heliosObj,
                functionName: "getUndistributedETH",
            }
        ],
        watch: true,
    });

    const { data: treasuryData } = useContractReads({
        contracts: [
            {
                ...treasuryObj,
                functionName: "getTitanBalance"
            },
            {
                ...treasuryObj,
                functionName: "getTotalTitanStaked"
            },
            {
                ...treasuryObj,
                functionName: "getTotalTitanUnstaked"
            },
            {
                ...titanxObj,
                functionName: "getUserETHClaimableTotal",
                args: [activeHlxStakeContract]
            },
            {
                ...treasuryObj,
                functionName: "activeHlxStakeContract",
            }
        ],
        watch: true,
    })

    /**
     *@description: Distribute payout
     */
    const {
        data: distributePayoutData,
        write: distributePayout,
        isLoading: isDistributePayoutLoading,
    } = useContractWrite({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: "triggerPayouts",
        onError(error) {
            toast.error("No funds in payout pool", {
                autoClose: 3000,
            });
        },
    });

    const distributePayoutClicked = async () => {
        distributePayout({ args: [] });
    }

    const { isLoading: isDistributePayoutConfirmed } = useWaitForTransaction({
        confirmations: 1,
        hash: distributePayoutData?.hash,
        onSuccess(data) {
            toast.success("Distributed PayOuts Successfully");
        },
        onError(error) {
            toast.error("No funds in payout pool", { autoClose: 3000 });
        },
    });

    /**
     *@description: Distribute TitanX
     */
    const {
        data: distributeTitanxData,
        write: distributeTitanx,
        isLoading: isdistributeTitanxLoading,
    } = useContractWrite({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: "distributeTitanX",
        onError(error) {
            toast.error(error.message.slice(0, 50) + "...", {
                autoClose: 3000,
            });
        },
    });

    const distributeTitanxClicked = async () => {
        distributeTitanx({ args: [] });
    }

    const { isLoading: isdistributeTitanxConfirmed } = useWaitForTransaction({
        confirmations: 1,
        hash: distributeTitanxData?.hash,
        onSuccess(data) {
            toast.success("Distributed Titanx/ETH Successfully");
        },
        onError(error) {
            toast.error(error.message.slice(0, 50) + "...", {
                autoClose: 3000,
            });
        },
    });
    /**
     *@description: Max Stake button stakeTITANX()
     */
    const {
        data: maxStakeData,
        write: maxStake,
        isLoading: isMaxStakeLoading,
    } = useContractWrite({
        address: TreasuryAddress,
        abi: treasuryConrtact.abi,
        functionName: "stakeTITANX",
        onError(error) {
            // toast.error(error.message.slice(0, 50) + "...", {
            //     autoClose: 3000,
            // });
            toast.error("No funds in treasury or min wait time", { autoClose: 3000 });
        },
    });

    const maxStakeClicked = async () => {
        maxStake({ args: [] });
    }

    const { isLoading: isMaxStakeConfirmed } = useWaitForTransaction({
        confirmations: 1,
        hash: maxStakeData?.hash,
        onSuccess(data) {
            toast.success("Max Staked Titanx Successfully");
        },
        onError(error) {
            toast.error("No funds in treasury or min wait time", {
                autoClose: 3000,
            });
        },
    });


    /**
     *@description: Claim Distribute -> claimReward()
     */
    const {
        data: claimDistributeData,
        write: claimDistribute,
        isLoading: isClaimDistributeLoading,
    } = useContractWrite({
        address: TreasuryAddress,
        abi: treasuryConrtact.abi,
        functionName: "claimReward",
        onError(error) {
            toast.error(error.message.slice(0, 50) + "...", {
                autoClose: 3000,
            });
        },
    });

    const claimDistributeClicked = async () => {
        claimDistribute({ args: [] });
    }

    const { isLoading: isClaimDistributeConfirmed } = useWaitForTransaction({
        confirmations: 1,
        hash: claimDistributeData?.hash,
        onSuccess(data) {
            toast.success("Claimed & Distributed Successfully");
        },
        onError(error) {
            toast.error(error.message.slice(0, 50) + "...", {
                autoClose: 3000,
            });
        },
    });


    // Get getCurrentContractDay
    const { data: currentContractDay } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentContractDay',
        watch: true,
    });
    /**
     *@description: getCurrentBlockTimeStamp
     */
    const { data: cur_blockTimestamp } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentBlockTimeStamp',
        watch: true,
    });
    /**
     *@description genesisTs
     */
    const { data: genesisTs } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'genesisTs',
        watch: true,
    });

    const { data: investaddress } = useContractRead({
        address: TreasuryAddress,
        abi: treasuryConrtact.abi,
        functionName: 'getInvestmentPoolAddress',
        watch: true,
    });
    const [getTwoProgress, setGetTwoprogress] = useState();
    const [getSixProgress, setGetSixprogress] = useState();
    const [getFourProgress, setGetFourprogress] = useState();

    function calculatePoolCompletionPercentage(currentContractDay, payoutCycleLength) {
        // Calculate the number of days into the current payout cycle
        const daysIntoCurrentCycle = currentContractDay % payoutCycleLength;

        // Calculate the percentage of the cycle completed
        const percentageOfCycleCompleted = (daysIntoCurrentCycle / payoutCycleLength) * 100;

        return percentageOfCycleCompleted;
    }
    const [userTitanx22, setuserTitanx22] = useState(0);
    const [userTitanx69, setuserTitanx69] = useState(0);
    const [userTitanx420, setuserTitanx420] = useState(0);
    const [userEther22, setuserEther22] = useState(0);
    const [userEther69, setuserEther69] = useState(0);
    const [userEther420, setuserEther420] = useState(0);
    const [userUsd22, setuserUsd22] = useState(0);
    const [userUsd69, setuserUsd69] = useState(0);
    const [userUsd420, setuserUsd420] = useState(0);

    useEffect(() => {
        if (data) {
            setEthCycle22Payout(data[1] ? data[1]?.toString() : 0);
            setEthCycle69Payout(data[2] ? data[2]?.toString() : 0);
            setEthCycle420Payout(data[3] ? data[3]?.toString() : 0);
            setCycle22Payout(data[4] ? data[4]?.toString() : 0);
            setCycle69Payout(data[5] ? data[5]?.toString() : 0);
            setCycle420Payout(data[6] ? data[6]?.toString() : 0);
            setUserEthCycle22Payout(data[7] ? data[7]?.ethRewards.toString() : 0);
            setUserEthCycle69Payout(data[8] ? data[8]?.ethRewards.toString() : 0);
            setUserEthCycle420Payout(data[9] ? data[9]?.ethRewards.toString() : 0);
            setUserCycle22Payout(data[7] ? data[7]?.rewards?.toString() : 0);
            setUserCycle69Payout(data[8] ? data[8]?.rewards?.toString() : 0);
            setUserCycle420Payout(data[9] ? data[9]?.rewards?.toString() : 0);
            if ((data[11] ? data[11].toString() : 0) === 0 && (data[10] ? data[10].toString() : 0) === 0) {
                setDisableButton(true);
            } else {
                setDisableButton(false);
            }
            if (userEst) {
                if (parseFloat(userEst[0]) !== 0) {
                    const userEstRate = (userEst[1] ? userEst[1].toString() : 0) / (userEst[0] ? (userEst[0]).toString() : 0);
                    setuserTitanx22(etherToFixed(data[4] ? data[4] : 0) * userEstRate);
                    setuserTitanx69(etherToFixed(data[5] ? data[5] : 0) * userEstRate);
                    setuserTitanx420(etherToFixed(data[6] ? data[6] : 0) * userEstRate);
                    setuserEther22(etherToFixed(data[1] ? data[1] : 0) * userEstRate);
                    setuserEther69(etherToFixed(data[2] ? data[2] : 0) * userEstRate);
                    setuserEther420(etherToFixed(data[3] ? data[3] : 0) * userEstRate);

                    setuserUsd22((etherToFixed(data[4] ? data[4] : 0) * userEstRate * titanx_to_usd) + (etherToFixed(data[1] ? data[1] : 0) * userEstRate * ether_to_usd));
                    setuserUsd69((etherToFixed(data[5] ? data[5] : 0) * userEstRate * titanx_to_usd) + (etherToFixed(data[2] ? data[2] : 0) * userEstRate * ether_to_usd));
                    setuserUsd420((etherToFixed(data[6] ? data[6] : 0) * userEstRate * titanx_to_usd) + (etherToFixed(data[3] ? data[3] : 0) * userEstRate * ether_to_usd));
                }
            }
        }
        setGetTwoprogress(calculatePoolCompletionPercentage((currentContractDay ? parseInt(currentContractDay.toString()) : 0), 22));
        setGetSixprogress(calculatePoolCompletionPercentage((currentContractDay ? parseInt(currentContractDay.toString()) : 0), 69));
        setGetFourprogress(calculatePoolCompletionPercentage((currentContractDay ? parseInt(currentContractDay.toString()) : 0), 420));

        if (treasuryData) {
            setLiquidTitanX(treasuryData[0] ? treasuryData[0].toString() : 0);
            setTitanxStaked(treasuryData[1] ? (treasuryData[2] ? (parseFloat(etherToFixed(treasuryData[1])) - parseFloat(etherToFixed(treasuryData[2])))?.toString() : 0) : 0);
            setActiveHlxStakeContract(treasuryData[4] ? treasuryData[4].toString() : 0);
        }

        const investmentAddress = investaddress ? investaddress : 0;
        const fetchData = async () => {
            try {
                const balanceUserData = await fetchBalance({
                    address: investmentAddress,
                });
                setInvestimentBalance(balanceUserData?.value?.toString());
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, [data, treasuryData, disableButton]);

    useEffect(() => {
        if (treasuryData) {
            setClaimableETH(treasuryData[3] ? treasuryData[3].toString() : 0);
        }
    }, [treasuryData])


    const heliosContractObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    };
    const { data: datawithcount } = useContractReads({
        contracts: [
            {
                ...heliosContractObj,
                functionName: "getNextCyclePayoutDay",
                args: [22],
            },
            {
                ...heliosContractObj,
                functionName: "getNextCyclePayoutDay",
                args: [69],
            },
            {
                ...heliosContractObj,
                functionName: "getNextCyclePayoutDay",
                args: [420],
            },
        ],
        watch: true,
    });
    const [twoNextPayoutDay, setTwoNextPayoutDay] = useState(0);
    const [fourNextPayoutDay, setFourNextPayoutDay] = useState(0);
    const [sixNextPayoutDay, setSixNextPayoutDay] = useState(0);
    const [twoCountDown, setTwoCountDown] = useState('');
    const [sixCountDown, setSixCountDown] = useState('');
    const [fourCountDown, setFourCountDown] = useState('');
    useEffect(() => {
        if (datawithcount) {
            setTwoNextPayoutDay(datawithcount[0]?.toString());
            setSixNextPayoutDay(datawithcount[1]?.toString());
            setFourNextPayoutDay(datawithcount[2]?.toString());
            const two_next_day = datawithcount[0]?.toString();
            const six_next_day = datawithcount[1]?.toString();
            const four_next_day = datawithcount[2]?.toString();
            const genesisTs_timestamp = genesisTs?.toString();
            const current_timestamp = cur_blockTimestamp?.toString();

            const calculateTimeDifference = (timestamp, currentTimestamp, genesisTs) => {
                const timestampSeconds = timestamp * 86400; // Convert timestamp to seconds
                const timeDifferenceSeconds = timestampSeconds - (currentTimestamp - genesisTs) - 86400; // Calculate difference in seconds
                const days = Math.floor(timeDifferenceSeconds / 86400); // Calculate number of days
                const remainingSeconds = timeDifferenceSeconds % 86400; // Calculate remaining seconds after subtracting days
                const date = new Date(remainingSeconds * 1000); // Convert remaining seconds to date
                const hours = date.getUTCHours().toString().padStart(2, '0');
                const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                const seconds = date.getUTCSeconds().toString().padStart(2, '0');
                return `${days}D:${hours}H:${minutes}M:${seconds}S`;
            };


            const two_next_day_formatted = calculateTimeDifference(two_next_day, current_timestamp, genesisTs_timestamp);
            const six_next_day_formatted = calculateTimeDifference(six_next_day, current_timestamp, genesisTs_timestamp);
            const four_next_day_formatted = calculateTimeDifference(four_next_day, current_timestamp, genesisTs_timestamp);
            setTwoCountDown(two_next_day_formatted);
            setSixCountDown(six_next_day_formatted);
            setFourCountDown(four_next_day_formatted);
        }
    }, [datawithcount, cur_blockTimestamp, genesisTs]);
    return (
        <RewardContentStyleWrapper>
            <div className="reward_container">
                <div className="ether_subtitle">
                    <h2 className="assets_under_management">Assets Under Management </h2>
                </div>
                <div className="rows">
                    <div className="cols">
                        <div className="reward_pool_cards">
                            <h1 className="cycle_reward_pool">Cycle Reward Pools</h1>
                            <div className="cards_contents">
                                <h3>22 DAY</h3>
                                <div className="card_content_rewards">
                                    <RewardPoolPayout name="Global Payout"
                                        titanx={etherToFixed(cycle22Payout ? cycle22Payout : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        ether={etherToFixed(ethCycle22Payout ? ethCycle22Payout : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={((parseFloat(etherToFixed(ethCycle22Payout ? ethCycle22Payout : 0)) * ether_to_usd) + (parseFloat(etherToFixed(cycle22Payout)) * titanx_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[0].leftbox.find(asset => 'GlobalPayout' in asset)?.GlobalPayout} />
                                    <RewardPoolPayout name="Your Est. Payout"
                                        type="rewardpool"
                                        titanx={(userTitanx22 ? userTitanx22 : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        ether={(userEther22 ? userEther22 : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={(userUsd22 ? userUsd22 : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[0].leftbox.find(asset => 'yourestpayout' in asset)?.yourestpayout} />
                                </div>
                                <div className="progress_content">
                                    <ProgressBar className="progress_bar" completed={getTwoProgress ? parseFloat(getTwoProgress.toFixed(0)) : 0}
                                        bgColor="linear-gradient(90deg, rgba(254,156,1,1) 13%, rgba(186,53,5,1) 87%)" isLabelVisible={true} />
                                    <Tooltip text={tooltipText.rewardpools[0].leftbox.find(asset => 'progressbar' in asset)?.progressbar}>
                                        <AiOutlineQuestionCircle />
                                    </Tooltip>
                                </div>
                                <div className="nextpayoutday_countdown">
                                    <div className="nextpayoutday">
                                        <div className="nextpayoutday_title">
                                            <span>Next Payout Day:</span>
                                            <span className="number_next_day"> {twoNextPayoutDay}</span>
                                        </div>
                                        <div className="countdown_value">{twoCountDown}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="cards_contents">
                                <h3>69 DAY</h3>
                                <div className="card_content_rewards">
                                    <RewardPoolPayout name="Global Payout"
                                        titanx={etherToFixed(cycle69Payout ? cycle69Payout : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        ether={etherToFixed(ethCycle69Payout ? ethCycle69Payout : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={((parseFloat(etherToFixed(ethCycle69Payout ? ethCycle69Payout : 0)) * ether_to_usd) + (parseFloat(etherToFixed(cycle69Payout)) * titanx_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[0].leftbox.find(asset => 'GlobalPayout' in asset)?.GlobalPayout} />
                                    <RewardPoolPayout name="Your Est. Payout"
                                        type="rewardpool"
                                        titanx={(userTitanx69 ? userTitanx69 : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        ether={(userEther69 ? userEther69 : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={(userUsd69 ? userUsd69 : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[0].leftbox.find(asset => 'yourestpayout' in asset)?.yourestpayout} />
                                </div>
                                <div className="progress_content">
                                    <ProgressBar className="progress_bar" completed={getSixProgress ? parseFloat(getSixProgress.toFixed(0)) : 0}
                                        bgColor="linear-gradient(90deg, rgba(254,156,1,1) 13%, rgba(186,53,5,1) 87%)" isLabelVisible={true} />
                                    <Tooltip text={tooltipText.rewardpools[0].leftbox.find(asset => 'progressbar' in asset)?.progressbar}>
                                        <AiOutlineQuestionCircle />
                                    </Tooltip>
                                </div>
                                <div className="nextpayoutday_countdown">
                                    <div className="nextpayoutday">
                                        <div className="nextpayoutday_title">
                                            <span>Next Payout Day:</span>
                                            <span className="number_next_day"> {sixNextPayoutDay}</span>
                                        </div>
                                        <div className="countdown_value">{sixCountDown}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="cards_contents">
                                <h3>420 DAY</h3>
                                <div className="card_content_rewards">
                                    <RewardPoolPayout name="Global Payout"
                                        titanx={etherToFixed(cycle420Payout ? cycle420Payout : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        ether={etherToFixed(ethCycle420Payout ? ethCycle420Payout : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={((parseFloat(etherToFixed(ethCycle420Payout ? ethCycle420Payout : 0)) * ether_to_usd) + (parseFloat(etherToFixed(cycle420Payout)) * titanx_to_usd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[0].leftbox.find(asset => 'GlobalPayout' in asset)?.GlobalPayout} />
                                    <RewardPoolPayout name="Your Est. Payout"
                                        type="rewardpool"
                                        titanx={(userTitanx420 ? userTitanx420 : 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        ether={(userEther420 ? userEther420 : 0).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={(userUsd420 ? userUsd420 : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[0].leftbox.find(asset => 'yourestpayout' in asset)?.yourestpayout} />
                                </div>
                                <div className="progress_content">
                                    <ProgressBar className="progress_bar" completed={getFourProgress ? parseFloat(getFourProgress.toFixed(0)) : 0}
                                        bgColor="linear-gradient(90deg, rgba(254,156,1,1) 13%, rgba(186,53,5,1) 87%)" isLabelVisible={true} />
                                    <Tooltip text={tooltipText.rewardpools[0].leftbox.find(asset => 'progressbar' in asset)?.progressbar}>
                                        <AiOutlineQuestionCircle />
                                    </Tooltip>
                                </div>
                                <div className="nextpayoutday_countdown">
                                    <div className="nextpayoutday">
                                        <div className="nextpayoutday_title">
                                            <span>Next Payout Day:</span>
                                            <span className="number_next_day"> {fourNextPayoutDay}</span>
                                        </div>
                                        {/* <div className="nextpayoutday_value">{fourNextPayoutDay}</div> */}
                                        <div className="countdown_value">{fourCountDown}</div>
                                    </div>
                                </div>
                                <div className="reward_pool_btn_group">
                                    <DistTinethTooltip>
                                        <button className="distribute_button" id="disttitaneth"
                                            disabled={disableButton || !(isConnected && !(isdistributeTitanxLoading || isdistributeTitanxConfirmed))}
                                            onClick={distributeTitanxClicked}
                                        >DISTRIBUTE TITANX/ETH
                                        </button>
                                    </DistTinethTooltip>
                                    <DistPayoutTooltip>
                                        <button className="distribute_button"
                                            disabled={(!(isConnected && !(isDistributePayoutConfirmed || isDistributePayoutLoading)))}
                                            onClick={distributePayoutClicked}
                                        // onClick={toggleDistPayout}
                                        >DISTRIBUTE PAYOUTS</button>
                                    </DistPayoutTooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cols">
                        <div className="reward_pool_cards">
                            <div className="cards_contents">
                                <h1>TREASURY </h1>

                                <div className="card_content_rewards">
                                    <DashboardText token="TITANX" name="Liquid TITANX"
                                        balance={parseFloat(etherToFixed(liquidTitanX)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        usd={parseFloat(titanx_to_usd * parseFloat(etherToFixed(liquidTitanX))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[1].rightbox.find(asset => 'liquidtitanx' in asset)?.liquidtitanx} />
                                    <DashboardText token="TITANX" name="TITANX Staked"
                                        balance={parseFloat(titanxStaked).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        usd={parseFloat(titanx_to_usd * parseFloat(titanxStaked)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[1].rightbox.find(asset => 'titanxstaked' in asset)?.titanxstaked} />
                                    <DashboardText token="ETH" name="Claimable Rewards"
                                        balance={parseFloat(etherToFixed(claimableETH)).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={parseFloat(ether_to_usd * parseFloat(etherToFixed(claimableETH))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[1].rightbox.find(asset => 'claimablerewards' in asset)?.claimablerewards} />
                                </div>
                                <div className="reward_pool_btn_group">
                                    <MaxStakeTooltip>
                                        <button className="distribute_button"
                                            disabled={!(isConnected && !(isMaxStakeLoading || isMaxStakeConfirmed))}
                                            onClick={maxStakeClicked}
                                        >MAX STAKE</button>
                                    </MaxStakeTooltip>
                                    <ClaimDistTooltip claimData={claimableETH}>
                                        <button className="distribute_button"
                                            disabled={!(isConnected && !(isClaimDistributeLoading || isClaimDistributeConfirmed))}
                                            onClick={claimDistributeClicked}
                                        >CLAIM & DISTRIBUTE</button>
                                    </ClaimDistTooltip>
                                </div>
                            </div>
                            <div className="cards_contents">
                                <h1>INVESTMENT POOL </h1>

                                <div className="card_content_rewards">
                                    <DashboardText token="ETH" name="Balance"
                                        balance={parseFloat(etherToFixed(investmentBalance)).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                        usd={(parseFloat(etherToFixed(investmentBalance)) * ether_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        tooltip={tooltipText.rewardpools[1].rightbox.find(asset => 'balance' in asset)?.balance} />
                                </div>
                            </div>
                            <div className="cards_contents">
                                <h1>V2 TREASURY </h1>

                                <div className="card_content_rewards">
                                    <h3>Coming soon!  Be sure to participate in governance, and let your voice be heard!</h3>
                                </div>
                                <div className="progress_content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </RewardContentStyleWrapper>
    );
}
export default RewardPoolContent;