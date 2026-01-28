import React, { useState, useEffect } from "react";
import StakeContentStyleWrapper from "./StakeContent.style";
import StakeCount from "../../common/stakecount";
import tooltipText from "../../assets/helius/tooltipText.json";
import MineContentNameBalance from "../../common/minecontentnamebalance";
import StakeTable from "../../common/customDataTable/staketable";
import ethereumIcon from "../../assets/helius/ethicon-min.png";
import { useSelector } from "react-redux";
import {
    HeliosAddress,
    etherToFixed,
    TitanxAddress,
    BuyandburnAddress,
} from "../../const/const";
import heliosContract from "../../contract/helios.json";
import buyAndBurnContract from "../../contract/buyandburn.json";
import titanx from "../../contract/titanx.json";

import {
    useContractReads,
    useContractRead,
    useAccount,
    useContractWrite,
    useWaitForTransaction
} from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-toastify";
const TabTable = ({
    userActiveStakes,
    userClaimableStakes,
    userEndedStakes,
}) => {
    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";

    return (
        <div className="tab_container">
            <ul className="tab-list">
                <li
                    className={`tabs ${getActiveClass(1, "active-tabs")}`}
                    onClick={() => toggleTab(1)}
                >
                    Active Stakes
                </li>
                <li
                    className={`tabs ${getActiveClass(2, "active-tabs")}`}
                    onClick={() => toggleTab(2)}
                >
                    Claimable Stakes
                </li>
                <li
                    className={`tabs ${getActiveClass(3, "active-tabs")}`}
                    onClick={() => toggleTab(3)}
                >
                    Ended Stakes
                </li>
            </ul>
            <div className={`content ${getActiveClass(1, "active-content")}`}>
                <StakeTable data={userActiveStakes} staketype="active" />
            </div>
            <div className={`content ${getActiveClass(2, "active-content")}`}>
                <StakeTable data={userClaimableStakes} staketype="claim" />
            </div>
            <div className={`content ${getActiveClass(3, "active-content")}`}>
                <StakeTable data={userEndedStakes} staketype="ended" />
            </div>
        </div>
    );
};

const StakeContent = () => {
    const [stakeLength, setStakeLength] = useState(0);
    const [stakePower, setStakePower] = useState(0);
    const [stakeAmplifier, setStakeAmplifier] = useState(0);

    const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);

    const [contractReadArgs, setContractReadArgs] = useState([]);

    const [userStakes, setUserStakes] = useState([]);
    const [timeStamp, setTimeStamp] = useState(0);
    const [currentShareRate, setCurrentShareRate] = useState(0);
    const [userBalance, setUserBalance] = useState(0);
    const [sharesWithBonus, setSharesWithBonus] = useState(0);
    const [sharesWithoutBonus, setSharesWithoutBonus] = useState(0);
    const [effectiveShareRate, setEffectiveShareRate] = useState(0);
    const [bonusPercentage, setBonusPercentage] = useState(0);
    const [titanPrice, setTitanPrice] = useState(0);
    const [titanToBurn, setTitanToBurn] = useState(0);

    const [allowance, setAllowance] = useState(0);

    const [getUserActiveStakes, setGetUserActiveStakes] = useState([]);
    const [getUserClaimableStakes, setGetUserClaimableStakes] = useState([]);
    const [getUserEndedStakes, setGetUserEndedStakes] = useState([]);

    const { isConnected, address } = useAccount();

    const heliosContractObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    };
    const titanObj = {
        address: TitanxAddress,
        abi: titanx.abi,
    };
    const [checkSuccess, setCheckSuccess] = useState(false);

    const { data: stakeData, isLoading: stakeLoading, write: stakeWrite } = useContractWrite({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: "startStake",
        args: [
            stakePower ? ethers.utils.parseEther(stakePower.toString()) : 0,
            stakeLength ? stakeLength : 0,
            titanToBurn.toString(),
        ],
        onError(error) {
            toast.error(error.reason.slice(0, 150) + "...", {
                autoClose: 3000,
            });
        },
    });

    const { isLoading: isConfirmed } = useWaitForTransaction({
        confirmations: 1,
        hash: stakeData?.hash,
        onSuccess(data) {
            toast.success("Successfully Sent Transaction.", { autoClose: 1300 });
            setStakeLength(0);
            setStakePower(0);
            setStakeAmplifier(0);
            setCheckSuccess(true);
        },
        onError(error) {
            setCheckSuccess(false);
            toast.error(error.reason.slice(0, 150) + "...", {
                autoClose: 3000,
            });
        },
    });

    const {
        isLoading: approveLoading,
        write: approveWrite } = useContractWrite({
            address: TitanxAddress,
            abi: heliosContract.abi,
            functionName: "approve",
            args: [HeliosAddress, ethers.constants.MaxUint256],
            onSuccess(data) {
                stakeWrite({ from: address });
            },
            onError(error) {
                toast.error(error.message.slice(0, 50) + "...", {
                    autoClose: 3000,
                });
            },
        });

    const aproveAndWrite = async () => {
        if (allowance > titanToBurn) {
            stakeWrite({ from: address });
        } else {
            approveWrite({ from: address });
        }
    };

    const { data } = useContractReads({
        contracts: [
            {
                ...heliosContractObj,
                functionName: "getCurrentBlockTimeStamp",
            },
            {
                ...heliosContractObj,
                functionName: "getCurrentShareRate",
            },
            {
                ...heliosContractObj,
                functionName: "getUserStakes",
                args: [address],
            },
            {
                ...heliosContractObj,
                functionName: "balanceOf",
                args: [address],
            },
            {
                address: BuyandburnAddress,
                abi: buyAndBurnContract.abi,
                functionName: "getCurrentTitanPrice",
            },
            {
                ...heliosContractObj,
                functionName: "getShareBonus",
                args: [20]
            },
            {
                ...titanObj,
                functionName: "allowance",
                args: [address, HeliosAddress]
            }
        ],
        watch: true,
    });


    const { data: calculatedShares } = useContractRead({
        ...heliosContractObj,
        functionName: "estimateShares",
        args: contractReadArgs,
        watch: true,
    });

    const getSortableObject = (obj) => {
        return {
            stakeId: obj["sId"].toString(),
            globalStakeId: obj["globalStakeId"].toString(),
            length: obj["stakeInfo"].numOfDays.toString(),
            shares: obj["stakeInfo"].shares.toString(),
            status: obj["stakeInfo"].status.toString(),
            endDay: obj["stakeInfo"].maturityTs.toString(),
            hlxAmount: obj["stakeInfo"].hlxAmount.toString(),
            startDay: obj["stakeInfo"].stakeStartTs.toString(),
            shareRate: (etherToFixed(obj["stakeInfo"].hlxAmount.toString()) / etherToFixed(obj["stakeInfo"].shares.toString())
            ).toFixed(2),
            value: (etherToFixed(obj["stakeInfo"].hlxAmount.toString()) * hlx_to_usd).toFixed(3),
            percentageDone:
                timeStamp < obj["stakeInfo"].maturityTs.toString()
                    ? (
                        100 -
                        ((Math.floor(obj["stakeInfo"].maturityTs.toString() - timeStamp) /
                            (3600 * 24)) *
                            100) /
                        obj["stakeInfo"].numOfDays
                    ).toFixed(0)
                    : 100,
            claimable:
                (obj["stakeInfo"].maturityTs <= timeStamp ||
                    obj["stakeInfo"].maturityTs > timeStamp) &&
                obj["stakeInfo"].status === 0,
        };
    };

    useEffect(() => {
        if (data) {
            setTimeStamp(data[0]?.toString() || 0);
            setCurrentShareRate(data[1]?.toString() || 0);
            setUserStakes(data[2] ? data[2] : 0);
            setUserBalance(data[3]?.toString() || 0);
            setTitanPrice(data[4]?.toString() || 0);
            setAllowance(data[6] ? parseFloat(data[6].toString()) : 0);
        }

        if (userStakes) {
            const userActiveStakes = [];
            const userClaimableStakes = [];
            const userEndedStakes = [];
            for (let i = 0; i < userStakes.length; i++) {
                if (
                    userStakes[i]["stakeInfo"].maturityTs > timeStamp &&
                    userStakes[i]["stakeInfo"].status === 0
                ) {
                    userActiveStakes.push(getSortableObject(userStakes[i]));
                } else if (
                    userStakes[i]["stakeInfo"].maturityTs <= timeStamp &&
                    userStakes[i]["stakeInfo"].status === 0
                ) {
                    userClaimableStakes.push(getSortableObject(userStakes[i]));
                } else if (
                    userStakes[i]["stakeInfo"].status === 2 ||
                    userStakes[i]["stakeInfo"].status === 1
                ) {
                    userEndedStakes.push(getSortableObject(userStakes[i]));
                }
            }
            setGetUserActiveStakes(userActiveStakes);
            setGetUserClaimableStakes(userClaimableStakes);
            setGetUserEndedStakes(userEndedStakes);
        }

        if (calculatedShares) {
            const withBonus = parseFloat(
                etherToFixed(calculatedShares["sharesWithBonus"])
            );
            const withoutBonus = parseFloat(
                etherToFixed(calculatedShares["sharesWithoutBonus"])
            );
            const extraShares = (withBonus * stakeAmplifier) / 100;

            const totalShares = withBonus + extraShares;

            setSharesWithBonus(totalShares.toFixed(2));
            setSharesWithoutBonus(
                etherToFixed(calculatedShares["sharesWithoutBonus"])
            );
            const bonus = (((withBonus - withoutBonus) * 100) / withoutBonus).toFixed(
                2
            );
            setBonusPercentage(stakeLength && stakeLength >= 30 ? (bonus > 0 ? bonus : 0) : 0);
            if (stakePower) {
                setEffectiveShareRate(
                    totalShares.toFixed(2) >= 1
                        ? (stakePower / totalShares.toFixed(2)).toFixed(2)
                        : 0
                );
            }
        }

        setContractReadArgs([
            ethers.utils.parseEther(stakePower ? stakePower.toString() : "0"), // Ensure default values or checks for undefined
            stakeLength ? stakeLength : 0,
        ]);

        const stakePowerInWei = stakePower ? ethers.utils.parseEther(stakePower.toString()) : ethers.utils.parseEther("0");
        setTitanToBurn(stakePowerInWei.isZero === true ? 0 : stakePowerInWei.mul(titanPrice).mul(stakeAmplifier ? stakeAmplifier : 0).div(ethers.constants.WeiPerEther).div(100)
        );

    }, [
        userStakes,
        timeStamp,
        data,
        stakePower,
        stakeLength,
        stakeAmplifier,
        calculatedShares,
    ]);

    const onChangeHandler = (type, value) => {
        if (!type) return;
        switch (type) {
            case "stakeLength":
                setStakeLength(value);
                break;
            case "stakePower":
                setStakePower(value);
                break;
            case "stakeAmplifier":
                setStakeAmplifier(value);
                break;
            default:
                break;
        }
        setCheckSuccess(false);
    };
    return (
        <StakeContentStyleWrapper>
            <div className="mine_container">
                <div className="ether_subtitle">
                    <h2>Earn </h2>{" "}
                    <img
                        src="https://assets.coingecko.com/coins/images/32762/standard/TitanXpng_%281%29.png?1704456654 "
                        alt=""
                    />
                    <h2>TitanX and</h2>
                    <img src={ethereumIcon} alt="" />
                    <h2>ETH passive income </h2>
                    <p>Earn TitanX and ETH passive income</p>
                </div>
                <div className="mine_top">
                    <div className="tablist">
                        <div className="tab_container">
                            <div className="content-container">
                                <div className="miner-cards-content">
                                    <div className="miner_cards">
                                        <h1>Stake your HLX</h1>
                                        <StakeCount
                                            checksuccess={checkSuccess}
                                            title="Stake Amount"
                                            onChangeHandler={onChangeHandler}
                                            type="stakePower"
                                            active="1"
                                            max={
                                                userBalance ? `${ethers.utils.formatEther(userBalance)}` : 0
                                            }
                                            min="0"
                                            tooltip={
                                                tooltipText.stake[0].leftbox.find(
                                                    (asset) => "StakeAmount" in asset
                                                )?.StakeAmount
                                            }
                                        />
                                        <StakeCount
                                            checksuccess={checkSuccess}
                                            title="Stake Length"
                                            onChangeHandler={onChangeHandler}
                                            type="stakeLength"
                                            active="1"
                                            max="830"
                                            min="30"
                                            tooltip={
                                                tooltipText.stake[0].leftbox.find(
                                                    (asset) => "StakeLength" in asset
                                                )?.StakeLength
                                            }
                                        />
                                        <StakeCount
                                            checksuccess={checkSuccess}
                                            title="Burn Amplifier"
                                            onChangeHandler={onChangeHandler}
                                            type="stakeAmplifier"
                                            active="1"
                                            max="20"
                                            min="0"
                                            tooltip={
                                                tooltipText.stake[0].leftbox.find(
                                                    (asset) => "BurnAmplifier" in asset
                                                )?.BurnAmplifier
                                            }
                                        />

                                        <div className="create_miner_btn">
                                            <button
                                                disabled={
                                                    !(isConnected && !(stakeLoading || approveLoading || isConfirmed))
                                                }
                                                onClick={() => {
                                                    stakeAmplifier && stakeAmplifier > 0
                                                        ? aproveAndWrite()
                                                        : stakeWrite({ from: address });
                                                }}
                                            >
                                                {isConnected ? "Start Stake" : "Connect To Start Stake"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mine_details">
                        <div className="summary_estimated">
                            <h2 className="mine_details_subtitle">Summary & Estimated ROI</h2>
                            <MineContentNameBalance
                                color={"#fff"}
                                name={"HLX in Stake"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "HLXinstake" in asset
                                    )?.HLXinstake
                                }
                                balance={parseFloat(stakePower).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            />

                            <MineContentNameBalance
                                color={"#fff"}
                                name={"TITANX Burned"}
                                tooltip={tooltipText.stake[1].rightbox.find(
                                    (asset) => "titanburned" in asset
                                )?.titanburned}
                                balance={parseFloat(etherToFixed(titanToBurn)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            />
                            <MineContentNameBalance
                                color={"#fff"}
                                name={"Number of Shares"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "ofshares" in asset
                                    )?.ofshares
                                }
                                balance={parseFloat(sharesWithBonus).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                            />
                        </div>
                        <div className="titanx_details">
                            <h2 className="mine_details_subtitle">HLX Stake Details</h2>
                            <MineContentNameBalance
                                color={"#fff"}
                                name={"Current Share Rate (excl. Bonuses)"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "sharerate" in asset
                                    )?.sharerate
                                }
                                balance={etherToFixed(currentShareRate ? currentShareRate : 0).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                            />
                            <MineContentNameBalance
                                color={"#fff"}
                                name={"Base Shares (excl. Bonuses)"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "baseshares" in asset
                                    )?.baseshares
                                }
                                balance={parseFloat(sharesWithoutBonus).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                            />
                            {/* <div className="stake_share_bonus"> */}
                            {/* <p>Stake Share Bonuses</p> */}
                            <MineContentNameBalance
                                color={"#2ff712"}
                                name={"Duration Amplifier"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "durationamplifier" in asset
                                    )?.durationamplifier
                                }
                                balance={bonusPercentage + " %"}
                            />
                            <MineContentNameBalance
                                color={"#2ff712"}
                                name={"Burn Amplifier"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "burnamplifier" in asset
                                    )?.burnamplifier
                                }
                                balance={stakeAmplifier + " %"}
                            />
                            {/* </div> */}
                            <MineContentNameBalance
                                color={"#fff"}
                                name={"Effective Share Rate (incl. Bonuses)"}
                                tooltip={
                                    tooltipText.stake[1].rightbox.find(
                                        (asset) => "effectivesharerate" in asset
                                    )?.effectivesharerate
                                }
                                balance={parseFloat(effectiveShareRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            />
                        </div>
                    </div>
                </div>
                <div className="mine-bottom">
                    <TabTable
                        userActiveStakes={
                            getUserActiveStakes.length > 0 ? getUserActiveStakes : []
                        }
                        userClaimableStakes={
                            getUserClaimableStakes.length > 0 ? getUserClaimableStakes : []
                        }
                        userEndedStakes={
                            getUserEndedStakes.length > 0 ? getUserEndedStakes : []
                        }
                    />
                </div>
            </div>
        </StakeContentStyleWrapper>
    );
};
export default StakeContent;
