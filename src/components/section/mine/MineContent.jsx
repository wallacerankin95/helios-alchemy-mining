import React, { useEffect, useState } from "react";
import MineContentStyleWrapper from "./MineContent.style";
import Count from "../../../common/count";
import ProgressBar from "@ramonak/react-progress-bar";
import tooltipText from "../../../assets/helius/tooltipText.json";
import CustomDataTable from "../../../common/customDataTable";
import MineContentNameBalance from "../../../common/minecontentnamebalance";
import heliosAvatar from "../../../assets/helius/HLX.png";
import {
    HeliosAddress, TitanxAddress,
    etherToFixed
} from "../../../const/const";
import { useSelector } from "react-redux";
import { useContractRead, useAccount, useContractWrite, useContractReads, useFeeData } from "wagmi";
import heliosContract from "../../../contract/helios.json";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const TabTable = (
    {
        userActiveMints,
        userClaimableMints,
        userEndedMints,
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
                    Active Miners
                </li>
                <li
                    className={`tabs ${getActiveClass(2, "active-tabs")}`}
                    onClick={() => toggleTab(2)}
                >
                    Claimable Miners
                </li>
                <li
                    className={`tabs ${getActiveClass(3, "active-tabs")}`}
                    onClick={() => toggleTab(3)}
                >
                    Ended Miners
                </li>

            </ul>
            <div className={`content ${getActiveClass(1, "active-content")}`}>
                <CustomDataTable data={userActiveMints} minertype="active" />

            </div>
            <div className={`content ${getActiveClass(2, "active-content")}`}>
                <CustomDataTable data={userClaimableMints} minertype="claim" />

            </div>
            <div className={`content ${getActiveClass(3, "active-content")}`}>
                <CustomDataTable data={userEndedMints} minertype="ended" />
            </div>
        </div>
    );
};

const Content = () => {
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
    const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);       // Fetch the value of HLX price from redux
    const { isConnected, address } = useAccount();
    const [titanToBurn, setTitanToBurn] = useState(0);
    const [userMints, setUserMints] = useState([]); // the value of Titan to start miner
    const [marketMiner, setMartketMiner] = useState(0); // Market Value of Miner
    const [estRoiEndofMiner, setEstRoiEndofMiner] = useState(0);
    const [getcurrentMintableHlx, setGetCurrentMintableHlx] = useState(0); // Current HLX Per Day of Mining
    const [getEarlyAdoptionAmplifier, setGetEarlyAdoptionAmplifier] = useState(0); // 🚀 Early Adoption Amplifier
    const [getBurnBonusAmplifier, setGetBurnBonusAmplifer] = useState(0); // 🔥 Burn Bonus Amplifier
    const [getNextIncreaseTime, setGetNextIncreaseTime] = useState(0); // Next Difficulty Increase
    const [progress, setProgress] = useState(0);
    const [mintCost, setMintCost] = useState(0);
    const [timeStamp, setTimeStamp] = useState(0);

    const [getUserActiveMints, setGetUserActiveMints] = useState([]);
    const [getUserClaimableMints, setGetUserClaimableMints] = useState([]);
    const [getUserEndedMints, setGetUserEndedMints] = useState([]);

    const [allowance, setAllowance] = useState(0);


    const { data: globalHRank } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getGlobalHRank',
        watch: true,
    });

    const [getGlobalHRank, setGetGlobalHRank] = useState(0);
    const [minerLength, setMinerLength] = useState(0);
    const [minerPower, setMinerPower] = useState(0);
    const [minerAmplifier, setMinerAmplifier] = useState(0);
    const [getMintableHlx, setGetMintableHlx] = useState(0);


    const onChangeHandler = (type, value) => {
        if (!type) return
        switch (type) {
            case 'minerLength':
                setMinerLength(value)
                break;
            case 'minerPower':
                setMinerPower(value)
                break;
            case 'minerAmplifier':
                setMinerAmplifier(value)
                break;
            default: break;
        }
        setCheckSuccess(false);
    }



    const { data: mintableHlx } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getMintableHlx',
        watch: true,
        args: [minerPower, minerLength, ethers.utils.parseEther(titanToBurn.toString()), address],
    });
    /**
     * @description: current Mint cost
     */
    const { data: currentMintCost } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentMintCost',
        watch: true,
    });


    /**
     * @description : Get current Mintable HLX => ●	currentHlx per day of mining
     */
    const { data: currentMintableMining } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentMintableHlx',
        watch: true,
    });

    /**
     *@description: 🚀 Early Adoption Amplifier
     */
    const { data: earlyAdoptionAmplifier } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentEAABonus',
        watch: true,
    });

    /**
     *@description: 🔥 Burn Bonus Amplifier
     */
    const { data: burnBonusAmplifier } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getUserBurnAmplifierBonus',
        watch: true,
        args: [address],
    });

    /**
     *@description: genesisTs deployed timestamp
     */
    const { data: genesisTs } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'genesisTs',
        watch: true,
    });

    const { data: currentBlockTimeStamp } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentBlockTimeStamp',
        watch: true,
    });

    console.log(currentBlockTimeStamp);

    const { data: currentContractDay } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentContractDay',
        watch: true,
    });

    /**
     *@description: create Miner
     */
    const [checkSuccess, setCheckSuccess] = useState(false);
    const {
        isLoading: startminerLoading,
        write: startMiner } = useContractWrite({
            address: HeliosAddress,
            abi: heliosContract.abi,
            functionName: "startMint",
            args: [
                minerPower ? minerPower : 1,
                minerLength ? minerLength : 1,
                titanToBurn ? ethers.utils.parseEther(titanToBurn.toString()) : 0,
            ],
            onSuccess(data) {
                toast.success("Create Miner Success");
                setMinerLength(1);
                setMinerPower(1);
                setMinerAmplifier(1);
                setCheckSuccess(true);
            },
            onError(error) {
                setCheckSuccess(false);
                toast.error(error.message.slice(0, 50) + "...", {
                    autoClose: 2000,
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
                startMiner({ from: address });
            },
            onError(error) {
                toast.error(error.message.slice(0, 50) + "...", {
                    autoClose: 2000,
                });
            },
        });

    const createMinerClicked = async () => {
        approveWrite({ from: address });
    };
    const heliosContractObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    };
    const { data } = useContractReads({
        contracts: [
            {
                ...heliosContractObj,
                functionName: "getUserMints",
                args: [address],
            },
            {
                address: TitanxAddress,
                abi: heliosContract.abi,
                functionName: "allowance",
                args: [address, HeliosAddress],
            },
        ],
        watch: true,
    });

    const calculateMintCost = (mintCost, power) => {
        // Use BigNumber for arithmetic to avoid precision issues
        const mintCostWei = ethers.BigNumber.from(mintCost ? mintCost : 1);
        const powerFactor = ethers.BigNumber.from(power ? power : 1);
        const cost = mintCostWei.mul(powerFactor).div(100000); // Assuming `div(100000)` is intended for scaling
        return ethers.utils.formatEther(cost); // Convert to Ether for display
    };



    const getSortableObject = (obj) => {
        return {
            mintId: obj["mId"].toString(),
            hRank: obj["hRank"].toString(),
            gMintPower: obj["gMintPower"].toString(),
            mintPower: obj["mintInfo"].mintPower.toString(),
            length: obj["mintInfo"].numOfDays.toString(),
            mintableHlx: obj["mintInfo"].mintableHlx.toString(),
            status: obj["mintInfo"].status.toString(),
            endDay: obj["mintInfo"].maturityTs.toString(),
            mintPowerBonus: obj["mintInfo"].mintPowerBonus.toString(),
            EAABonus: obj["mintInfo"].EAABonus.toString(),
            mintedHlx: obj["mintInfo"].mintedHlx.toString(),
            startDay: obj["mintInfo"].mintStartTs.toString(),
            mintCost: obj["mintInfo"].mintCost.toString(),
            penalty: obj["mintInfo"].penalty.toString(),
            titanBurned: obj["mintInfo"].titanBurned.toString(),
            value: obj["mintInfo"].mintedHlx.toString() > 0 ? obj["mintInfo"].mintedHlx.toString() * hlx_to_usd : obj["mintInfo"].mintableHlx.toString() * hlx_to_usd,

            percentageDone:
                timeStamp < obj["mintInfo"].maturityTs.toString()
                    ? (
                        100 -
                        ((Math.floor(obj["mintInfo"].maturityTs.toString() - timeStamp) /
                            (3600 * 24)) *
                            100) /
                        obj["mintInfo"].numOfDays
                    ).toFixed(0)
                    : 100,
            claimable:
                (obj["mintInfo"].maturityTs <= timeStamp ||
                    obj["mintInfo"].maturityTs > timeStamp) &&
                obj["mintInfo"].status === 0,
        };
    };

    useEffect(() => {
        setGetMintableHlx((mintableHlx ? mintableHlx.toString() : 0));
        setMartketMiner(parseFloat((mintableHlx / 1e18) * hlx_to_usd).toFixed(2));
        setGetCurrentMintableHlx(currentMintableMining ? currentMintableMining.toString() : 0);
        setGetEarlyAdoptionAmplifier(parseFloat((earlyAdoptionAmplifier ? earlyAdoptionAmplifier : 0).toString() / 1000000).toFixed(2));
        setGetBurnBonusAmplifer(burnBonusAmplifier ? burnBonusAmplifier.toString() : 0);
        setMintCost(calculateMintCost(currentMintCost, minerPower));
        if (data) {
            setUserMints(data[0] ? data[0] : 0);
            setAllowance(data[1] ? parseFloat(etherToFixed(data[1].toString())) : 0);
        }


        if (mintCost > 0) {
            const burnAmount = (parseFloat(mintCost / 100) * minerAmplifier);
            setTitanToBurn(burnAmount);
        }

        if (globalHRank) {
            setGetGlobalHRank(globalHRank.toString());
        }
    }, [minerPower, minerLength, minerAmplifier, mintCost, burnBonusAmplifier, currentMintCost, data, mintableHlx, titanToBurn, currentBlockTimeStamp, currentContractDay]);

    useEffect(() => {
        setEstRoiEndofMiner(((((etherToFixed(mintableHlx ? mintableHlx.toString() : 0)) * hlx_to_usd) / (titanx_to_usd * (parseFloat(mintCost) + parseFloat(titanToBurn)))) - 1) * 100);
    }, [mintableHlx, hlx_to_usd, titanx_to_usd, mintCost, titanToBurn])


    useEffect(() => {
        const genesisTime = genesisTs ? genesisTs.toString() : 0;
        setTimeStamp(currentBlockTimeStamp ? currentBlockTimeStamp.toString() : 0);
        const currentContractDayTime = currentContractDay ? currentContractDay.toString() : 0;

        const startOfNextDay = (currentContractDayTime * 86400) + parseInt(genesisTime);

        // startOfNextDay - blocktimestamp 
        const nextIncrease = startOfNextDay - timeStamp;

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(nextIncrease / 3600);
        const minutes = Math.floor((nextIncrease % 3600) / 60);
        const seconds = nextIncrease % 60;
        const subhour = (hours) * 3600;
        const subminutes = (minutes) * 60;
        const subsec = seconds;
        const progress = ((100 / 86400) * (86400 - (subhour + subminutes + subsec)));
        // Format the result as hh:mm:ss
        const formattedTime = `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;

        setGetNextIncreaseTime(formattedTime);
        setProgress((progress).toFixed(2));
    }, [currentBlockTimeStamp, currentContractDay, genesisTs, timeStamp])

    useEffect(() => {
        if (userMints) {
            const userActiveMints = [];
            const userClaimableMints = [];
            const userEndedMints = [];
            for (let i = 0; i < userMints.length; i++) {
                if (
                    userMints[i]["mintInfo"].maturityTs > timeStamp &&
                    userMints[i]["mintInfo"].status === 0
                ) {
                    userActiveMints.push(getSortableObject(userMints[i]));
                } else if (
                    userMints[i]["mintInfo"].maturityTs <= timeStamp &&
                    userMints[i]["mintInfo"].status === 0
                ) {
                    userClaimableMints.push(getSortableObject(userMints[i]));
                } else if (
                    userMints[i]["mintInfo"].status === 2 ||
                    userMints[i]["mintInfo"].status === 1
                ) {
                    userEndedMints.push(getSortableObject(userMints[i]));
                }
            }
            setGetUserActiveMints(userActiveMints);
            setGetUserClaimableMints(userClaimableMints);
            setGetUserEndedMints(userEndedMints);
        }
    }, [userMints, timeStamp])
    return (
        <MineContentStyleWrapper>
            <div className="mine_container">
                <div className="ether_subtitle">
                    <h2>Spend </h2>
                    <img className="titanx_icon" src="https://assets.coingecko.com/coins/images/32762/standard/TitanXpng_%281%29.png?1704456654" alt="" />
                    <h2>TITANX to create your</h2>
                    <img className="helios_icon" src={heliosAvatar} alt="" />
                    <h2>HLX virtual miners </h2>
                    <p>Spend TITANX to create your HLX virtual miners</p>
                </div>
                <div className="mine_top">
                    <div className="tablist">
                        <div className="tab_container">
                            <div></div>

                            <div className="content-container">
                                <div className="miner-cards-content">
                                    <div className="miner_cards">
                                        <h1>Create HLX Miner</h1>
                                        <Count onChangeHandler={onChangeHandler} checksuccess={checkSuccess} type='minerLength' title="Miner Length" max="250" active="1" min="1" tooltip={tooltipText.mine[0].leftbox.find(asset => 'minerlength' in asset)?.minerlength} />
                                        <Count onChangeHandler={onChangeHandler} checksuccess={checkSuccess} type='minerPower' title="Miner Power" max="100000" active="1" min="1" tooltip={tooltipText.mine[0].leftbox.find(asset => 'minerpower' in asset)?.minerpower} />
                                        <Count onChangeHandler={onChangeHandler} checksuccess={checkSuccess} type='minerAmplifier' title="Burn Amplifier" max="10" active="1" min="0" tooltip={tooltipText.mine[0].leftbox.find(asset => 'burnamplifier' in asset)?.burnamplifier} />

                                        <div className="create_miner_btn">
                                            <button
                                                disabled={!(isConnected && !(startminerLoading || approveLoading))}
                                                onClick={() => {
                                                    if (minerAmplifier > 0) {
                                                        const totalCost = parseFloat(mintCost) + parseFloat(titanToBurn);
                                                        if (allowance < totalCost) {
                                                            createMinerClicked();
                                                        } else {
                                                            startMiner({ from: address });

                                                        }
                                                    } else {
                                                        if (allowance < parseFloat(mintCost)) {
                                                            createMinerClicked();
                                                        } else {
                                                            startMiner({ from: address });
                                                        }

                                                    }
                                                }}>Create Miner</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="mine_details">
                        <div className="summary_estimated">
                            <h2 className="mine_details_subtitle">Summary & Estimated ROI</h2>
                            <MineContentNameBalance color={"#fff"} name={"Est. HLX at End of Miner"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'EstHLXatEndofMiner' in asset)?.EstHLXatEndofMiner}
                                balance={(etherToFixed(getMintableHlx)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
                            <MineContentNameBalance color={"#fff"} name={"TITANX to start miner"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'TITANXtoStartMiner' in asset)?.TITANXtoStartMiner}
                                balance={`${(parseFloat(mintCost) + parseFloat(titanToBurn)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TITANX (~$${((titanx_to_usd * (parseFloat(mintCost) + parseFloat(titanToBurn)))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`} />
                            <MineContentNameBalance color={"#2FF712"} name={"$ Market Value of Miner"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'MarketValueofMiner' in asset)?.MarketValueofMiner}
                                balance={`$${(etherToFixed(getMintableHlx) * hlx_to_usd).toFixed(2)}`} />
                            <MineContentNameBalance color={"#2FF712"} name={"Est. ROI % at End of Miner"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'EstROIatEndofMiner' in asset)?.EstROIatEndofMiner}
                                balance={`${(estRoiEndofMiner).toFixed(0)}%`} />
                        </div>
                        <div className="titanx_details">
                            <h2 className="mine_details_subtitle">HLX Details</h2>
                            <MineContentNameBalance color={"#fff"} name={"HLX Market Price"} tooltip={tooltipText.mine[1].rightbox.find(asset => 'HLXMarketPrice' in asset)?.HLXMarketPrice}
                                balance={`$${hlx_to_usd === 0 ? "0.0012" : parseFloat(hlx_to_usd).toLocaleString('en-US', { maximumFractionDigits: 8, minimumFractionDigits: 8 })}`} />
                        </div>
                        <div className="titanx_more_details">
                            <h2 className="mine_details_subtitle">HLX Miner Details</h2>
                            <MineContentNameBalance color={"#fff"} name={"Global hRank"} tooltip={tooltipText.mine[1].rightbox.find(asset => 'GlobalhRank' in asset)?.GlobalhRank} balance={getGlobalHRank} />
                            <MineContentNameBalance color={"#fff"} name={"Current HLX Per Day of Mining"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'CurrentHLXPerDayofMining' in asset)?.CurrentHLXPerDayofMining}
                                balance={(etherToFixed(getcurrentMintableHlx) / 1000).toLocaleString('en-US', { maximumFractionDigits: 0, maximumFractionDigits: 0 })} />
                            <MineContentNameBalance color={"#2FF712"} name={"🚀 Early Adoption Amplifier"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'EarlyAdoptionAmplifier' in asset)?.EarlyAdoptionAmplifier}
                                balance={`+ ${getEarlyAdoptionAmplifier}%`} />
                            <MineContentNameBalance color={"#2FF712"} name={"🔥 Burn Bonus Amplifier"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'BurnBonusAmplifier' in asset)?.BurnBonusAmplifier} balance={`+ ${minerAmplifier}%`} />
                            <MineContentNameBalance color={"#fff"} name={"HLX Proof of Burn Amplifier"}
                                tooltip={tooltipText.mine[1].rightbox.find(asset => 'HLXProofofBurnBonus' in asset)?.HLXProofofBurnBonus} balance={"+ " + getBurnBonusAmplifier + "%"} />
                            <MineContentNameBalance color={"#fff"} name={"Next Difficulty Increase"} tooltip={tooltipText.mine[1].rightbox.find(asset => 'NextDifficultyIncrease' in asset)?.NextDifficultyIncrease} balance={getNextIncreaseTime} />
                            <div className="progress_p">
                                <span className="progress_span">
                                    <ProgressBar className="progress_bar" completed={parseInt(progress)} bgColor="linear-gradient(90deg, rgba(254,156,1,1) 13%, rgba(186,53,5,1) 87%)" isLabelVisible={false} />
                                </span>
                                <span>{parseInt(progress)}%</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mine-bottom">
                    <TabTable
                        userActiveMints={
                            getUserActiveMints.length > 0 ? getUserActiveMints : []
                        }
                        userClaimableMints={
                            getUserClaimableMints.length > 0 ? getUserClaimableMints : []
                        }
                        userEndedMints={
                            getUserEndedMints.length > 0 ? getUserEndedMints : []
                        }
                    />
                </div>
            </div>
        </MineContentStyleWrapper>
    );
}
export default Content;