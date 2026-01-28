import React, { useEffect, useState } from "react";
import ClaculatorStyleWrapper from "./CalculatorContent.style";
import Logo from "../../assets/helius/share.png";
import html2canvas from 'html2canvas';
import { HeliosAddress, etherToFixed } from "../../const/const";
import { useSelector, useDispatch } from "react-redux";
import { useContractRead, useAccount, useContractReads } from "wagmi";
import heliosContract from "../../contract/helios.json";
import { ethers } from "ethers";

const CalculatorContent = () => {
    const [ToggleState, setToggleState] = useState(1);
    const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
    const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
    const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);       // Fetch the value of HLX price from redux

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";

    const takeScreenshot = () => {
        const elementToDownload = document.querySelector('.tab_container');

        html2canvas(elementToDownload).then(canvas => {
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'summary_staker_right.png';
            a.click();
        });
    };

    const [minerLength, setMinerLength] = useState(0);
    const [minerPower, setMinerPower] = useState(0);
    const [burnAmplifier, setBurnAmplifier] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [stakeLength, setStakeLength] = useState(0);
    const [getstakeBurnAmplifier, setStakeBurnAmplifier] = useState(0);
    const { address } = useAccount();

    const onChangeInputHandler = (event, type) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue)) {
            switch (type) {
                case "minerLength": newValue > 250 ? setMinerLength(250) : setMinerLength(newValue); break;
                case "minerPower": newValue > 100000 ? setMinerPower(10000) : setMinerPower(newValue); break;
                case "burnAmplifier": newValue > 10 ? setBurnAmplifier(10) : setBurnAmplifier(newValue); break;
                case "stakeAmount": newValue > 999999999999999 ? setStakeAmount(9999999999999999) : setStakeAmount(newValue); break;
                case "stakeLength": newValue > 830 ? setStakeLength(830) : setStakeLength(newValue); break;
                case "stakeBurnAmplifier": newValue > 20 ? setStakeBurnAmplifier(20) : setStakeBurnAmplifier(newValue); break;
                default: break;
            }
        }
    }
    /**
    * @description : Get Mintable HLX
    */
    const [getMintableHlx, setGetMintableHlx] = useState([]);
    const [titanxStartMiner, setTitanxStartMiner] = useState(0);
    const [marketMiner, setMartketMiner] = useState(0);
    const [estRoiEndofMiner, setEstRoiEndofMiner] = useState(0);
    const [mintCost, setMintCost] = useState(0);
    const [titanToBurnMine, setTitanToBurnMine] = useState(0);
    const [contractDay, setContractDay] = useState(0);
    const [userStakedbalance, setUserStakedBalance] = useState(0);


    const heliosContractObj = {
        address: HeliosAddress,
        abi: heliosContract.abi,
    };

    const { data: currentContractDay } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentContractDay',
        watch: true,
    });

    const { data: mintableHlx } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getMintableHlx',
        watch: true,
        args: [minerPower, minerLength, ethers.utils.parseEther(titanToBurnMine.toString()), address ? address : "0x0000000000000000000000000000000000000000"],
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


    const { data } = useContractReads({
        contracts: [
            {
                ...heliosContractObj,
                functionName: "balanceOf",
                args: [address],
            },
        ],
        watch: true,
    });

    useEffect(() => {
        setGetMintableHlx(etherToFixed(mintableHlx ? mintableHlx.toString() : 0).toFixed(4));
        setTitanxStartMiner(parseFloat(mintCost) + titanToBurnMine);
        setMartketMiner((parseFloat(etherToFixed(mintableHlx ? mintableHlx.toString() : 0)) * hlx_to_usd).toFixed(4));
        setContractDay(currentContractDay ? currentContractDay.toString() : 0);
    }, [mintableHlx, hlx_to_usd, mintCost, currentContractDay, titanToBurnMine]);

    useEffect(() => {
        setMintCost(calculateMintCost(currentMintCost, minerPower));
    }, [currentMintCost, minerPower])

    useEffect(() => {

        if (mintCost > 0) {
            const burnAmount = (parseFloat(mintCost / 100) * burnAmplifier);
            setTitanToBurnMine(burnAmount);
        }

    }, [mintCost, burnAmplifier])


    useEffect(() => {
        setEstRoiEndofMiner(((((getMintableHlx) * hlx_to_usd) / (titanx_to_usd * parseInt(titanxStartMiner))) - 1) * 100);
    }, [getMintableHlx, hlx_to_usd, titanx_to_usd, titanxStartMiner])


    const minerLengthMaxButtonCliked = () => {
        setMinerLength(250);
    }
    const minerPowerMaxButtonCliked = () => {
        setMinerPower(100000);
    }
    const burnAmplifierMaxButtonCliked = () => {
        setBurnAmplifier(10);
    }
    const stakeAmountMaxClicked = () => {
        setStakeAmount(userBalance ? ethers.utils.formatEther(userBalance) : 0);
    }
    const stakeLengthMaxClicked = () => {
        setStakeLength(830);
    }
    const stakeBurnAmplifierMaxClicked = () => {
        setStakeBurnAmplifier(20);
    }

    //// --------HLX STAKE -----------------////
    const [contractReadArgs, setContractReadArgs] = useState([]);
    const [sharesWithBonus, setSharesWithBonus] = useState(0);
    const [effectiveShareRate, setEffectiveShareRate] = useState(0);
    const [userBalance, setUserBalance] = useState(0);
    const [getGlobalShares, setGetGlobalShares] = useState(0);


    const { data: calculatedShares } = useContractRead({
        ...heliosContractObj,
        functionName: "estimateShares",
        args: contractReadArgs,
        watch: true,
    });


    const [gettwoEstTitanPayout, settwoEstTitanPayout] = useState(0);
    const [getsixEstTitanPayout, setsixEstTitanPayout] = useState(0);
    const [getfourEstTitanPayout, setfourEstTitanPayout] = useState(0);
    const [gettwoEstEthPayout, settwoEstEthPayout] = useState(0);
    const [getsixEstEthPayout, setsixEstEthPayout] = useState(0);
    const [getfourEstEthPayout, setfourEstEthPayout] = useState(0);

    const [twoPercentageCompleted, setTwoPercentageCompleted] = useState(0);
    const [sixPercentageCompleted, setSixPercentageCompleted] = useState(0);
    const [fourPercentageCompleted, setFourPercentageCompleted] = useState(0);

    const [userUsdTotal22, setUserUsdTotal22] = useState(0);
    const [userUsdTotal69, setUserUsdTotal69] = useState(0);
    const [userUsdTotal420, setUserUsdTotal420] = useState(0);

    const [userUsdTotal, setUserUsdTotal] = useState(0);

    const [userROI, setUserROI] = useState(0);

    const [cycleNum22, setCycleNum22] = useState(0);
    const [cycleNum69, setCycleNum69] = useState(0);
    const [cycleNum420, setCycleNum420] = useState(0);


    /**
     *@description: Get Global payout TITANX/HLX for days 22 69 420
     */
    /**
     *@description: Get User active shares
     */
    const { data: userActiveShares } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getUserCurrentActiveShares',
        watch: true,
        args: [address],
    });
    
    /**
     *@description: getCyclePayoutPool Get TitanxEstimated payoutpool
     */
    const { data: twocyclePayoutPool } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCyclePayoutPool',
        watch: true,
        args: [22],
    });



    const { data: sixcyclePayoutPool } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCyclePayoutPool',
        watch: true,
        args: [69],
    });
    const { data: fourcyclePayoutPool } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCyclePayoutPool',
        watch: true,
        args: [420],
    });
    /**
     *@description: getCyclePayoutPool Get Ether Estimated payoutpool
     */
    const { data: twoethcyclePayoutPool } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getETHCyclePayoutPool',
        watch: true,
        args: [22],
    });
    const { data: sixethcyclePayoutPool } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getETHCyclePayoutPool',
        watch: true,
        args: [69],
    });
    const { data: fourethcyclePayoutPool } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getETHCyclePayoutPool',
        watch: true,
        args: [420],
    });
    /**
     *@description: Global Active Shares
     */
    const { data: globalActiveShares } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getGlobalActiveShares',
        watch: true,
    });


    const calculateMintCost = (mintCost, power) => {
        // Use BigNumber for arithmetic to avoid precision issues
        const mintCostWei = ethers.BigNumber.from(mintCost ? mintCost : 1);
        const powerFactor = ethers.BigNumber.from(power ? power : 1);
        const cost = mintCostWei.mul(powerFactor).div(100000); // Assuming `div(100000)` is intended for scaling
        return ethers.utils.formatEther(cost); // Convert to Ether for display
    };
    function calculatePoolCompletionPercentage(currentContractDay, payoutCycleLength) {
        // Calculate the number of days into the current payout cycle
        const daysIntoCurrentCycle = (currentContractDay % payoutCycleLength);

        // Calculate the percentage of the cycle completed
        const percentageOfCycleCompleted = (daysIntoCurrentCycle / payoutCycleLength) * 100;

        return percentageOfCycleCompleted;
    }

    function estimateTotalRewardAtEnd(currentReward, percentageCompletion) {
        // Ensure percentageCompletion is not 0 to avoid division by zero
        if (percentageCompletion <= 0) {
            console.error("Percentage completion must be greater than 0");
            return 0;
        }

        // Convert percentage completion to a decimal if given as a whole number (e.g., 50 instead of 0.5)
        if (percentageCompletion > 1) {
            percentageCompletion = percentageCompletion / 100;
        }

        // Calculate the estimated total reward
        const estimatedTotalReward = currentReward / percentageCompletion;
        return estimatedTotalReward;
    }
    function calculateFullPayoutCycles(stakeLength, currentContractDay, payoutCycleLength) {
        // Calculate days into the current cycle
        const daysIntoCurrentCycle = currentContractDay % payoutCycleLength;

        // Calculate the remaining days in the current cycle
        const remainingDaysInCurrentCycle = payoutCycleLength - daysIntoCurrentCycle;

        // If the stake length extends beyond the current cycle, adjust it by subtracting the remaining days in the current cycle
        const effectiveStakeLength = stakeLength > remainingDaysInCurrentCycle ? stakeLength - remainingDaysInCurrentCycle : stakeLength;

        // Calculate the number of complete cycles in the adjusted (or original) stake length
        const completeCycles = Math.floor(effectiveStakeLength / payoutCycleLength);

        // Include the current cycle if the stake length is longer than the remaining days in the current cycle
        const includeCurrentCycle = stakeLength > remainingDaysInCurrentCycle ? 1 : 0;

        // Total cycles are the sum of complete cycles and the current cycle (if included)
        const totalCycles = includeCurrentCycle + completeCycles;

        return totalCycles;
    }
    useEffect(() => {

        if (data) {
            setUserBalance(data[0] ? data[0].toString() : 0);
        }

        setContractReadArgs([
            ethers.utils.parseEther(stakeAmount ? stakeAmount.toString() : "0"), // Ensure default values or checks for undefined
            stakeLength ? stakeLength : 0,
        ]);

        if (calculatedShares) {
            const withBonus = parseFloat(
                etherToFixed(calculatedShares["sharesWithBonus"])
            );
            const extraShares = (withBonus * getstakeBurnAmplifier) / 100;

            const totalShares = withBonus + extraShares;

            setSharesWithBonus(totalShares.toFixed(2));
            if (stakeAmount) {
                setEffectiveShareRate(
                    totalShares.toFixed(2) >= 1
                        ? (stakeAmount / totalShares.toFixed(2)).toFixed(2)
                        : 0
                );
            }
        }

        setGetGlobalShares((parseFloat(sharesWithBonus) * 100) / (etherToFixed(globalActiveShares ? globalActiveShares.toString() : 0) + parseFloat(sharesWithBonus)));

        const pieceOfPool = (parseFloat(sharesWithBonus) / (etherToFixed(globalActiveShares ? globalActiveShares.toString() : 0) + parseFloat(sharesWithBonus)));

        settwoEstTitanPayout((estimateTotalRewardAtEnd(parseFloat(etherToFixed(twocyclePayoutPool ? twocyclePayoutPool.toString() : 0)), twoPercentageCompleted)) * pieceOfPool);
        setsixEstTitanPayout((estimateTotalRewardAtEnd(parseFloat(etherToFixed(sixcyclePayoutPool ? sixcyclePayoutPool.toString() : 0)), sixPercentageCompleted)) * pieceOfPool);
        setfourEstTitanPayout((estimateTotalRewardAtEnd(parseFloat(etherToFixed(fourcyclePayoutPool ? fourcyclePayoutPool.toString() : 0)), fourPercentageCompleted)) * pieceOfPool);
        settwoEstEthPayout((estimateTotalRewardAtEnd(parseFloat(etherToFixed(twoethcyclePayoutPool ? twoethcyclePayoutPool.toString() : 0)), twoPercentageCompleted)) * pieceOfPool);
        setsixEstEthPayout((estimateTotalRewardAtEnd(parseFloat(etherToFixed(sixethcyclePayoutPool ? sixethcyclePayoutPool.toString() : 0)), sixPercentageCompleted)) * pieceOfPool);
        setfourEstEthPayout((estimateTotalRewardAtEnd(parseFloat(etherToFixed(fourethcyclePayoutPool ? fourethcyclePayoutPool.toString() : 0)), fourPercentageCompleted)) * pieceOfPool);
        setTwoPercentageCompleted(calculatePoolCompletionPercentage(parseFloat(contractDay), 22));
        setSixPercentageCompleted(calculatePoolCompletionPercentage(parseFloat(contractDay), 69));
        setFourPercentageCompleted(calculatePoolCompletionPercentage(parseFloat(contractDay), 420));

    }, [stakeAmount, stakeLength, getstakeBurnAmplifier, calculatedShares, data, twocyclePayoutPool, sixcyclePayoutPool, fourcyclePayoutPool, twoethcyclePayoutPool, sixethcyclePayoutPool, twoPercentageCompleted, sixPercentageCompleted, fourPercentageCompleted, contractDay, globalActiveShares, sharesWithBonus]);

    const [nextCycleDay22, setNextCycleDay22] = useState(0);
    const [nextCycleDay69, setNextCycleDay69] = useState(0);
    const [nextCycleDay420, setNextCycleDay420] = useState(0);

    const { data: nextcyclepayoutday } = useContractReads({
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

    useEffect(() => {
        if (nextcyclepayoutday) {
            setNextCycleDay22(nextcyclepayoutday[0] ? nextcyclepayoutday[0].toString() : 0);
            setNextCycleDay69(nextcyclepayoutday[1] ? nextcyclepayoutday[1].toString() : 0);
            setNextCycleDay420(nextcyclepayoutday[2] ? nextcyclepayoutday[2].toString() : 0);
        }
    }, [nextCycleDay22, nextCycleDay69, nextCycleDay420]);

    function calculateFullPayoutCyclesTotal(nextCyclePayoutDay, stakeLength, currentContractDay, payoutCycleLength) {

        const endStakeDay = parseInt(currentContractDay) + parseInt(stakeLength);
        let totalCycles = 0;
        let nextCycleDay = parseInt(nextCyclePayoutDay);

        for (let dayCounter = currentContractDay; dayCounter <= endStakeDay; dayCounter++) {
            if (dayCounter == nextCycleDay) {
                totalCycles++;
                nextCycleDay += parseInt(payoutCycleLength);
            }
        }

        return totalCycles;
    }
    useEffect(() => {
        setCycleNum22(calculateFullPayoutCyclesTotal(nextCycleDay22, stakeLength, contractDay, 22));
        setCycleNum69(calculateFullPayoutCyclesTotal(nextCycleDay69, stakeLength, contractDay, 69));
        setCycleNum420(calculateFullPayoutCyclesTotal(nextCycleDay420, stakeLength, contractDay, 420));
        setUserUsdTotal22(((gettwoEstTitanPayout * titanx_to_usd) + (gettwoEstEthPayout * ether_to_usd)) * calculateFullPayoutCyclesTotal(nextCycleDay22, stakeLength, contractDay, 22));
        setUserUsdTotal69(((getsixEstTitanPayout * titanx_to_usd) + (getsixEstEthPayout * ether_to_usd)) * calculateFullPayoutCyclesTotal(nextCycleDay69, stakeLength, contractDay, 69));
        setUserUsdTotal420(((getfourEstTitanPayout * titanx_to_usd) + (getfourEstEthPayout * ether_to_usd)) * calculateFullPayoutCyclesTotal(nextCycleDay420, stakeLength, contractDay, 420));
    }, [gettwoEstEthPayout, getsixEstEthPayout, getfourEstEthPayout, gettwoEstTitanPayout, getsixEstTitanPayout, getfourEstTitanPayout, hlx_to_usd, ether_to_usd, stakeLength, contractDay])

    useEffect(() => {
        setUserUsdTotal(userUsdTotal22 + userUsdTotal69 + userUsdTotal420);
    }, [userUsdTotal22, userUsdTotal69, userUsdTotal420])

    useEffect(() => {
        setUserROI((userUsdTotal / (stakeAmount * hlx_to_usd) - 1) * 100);
    }, [userUsdTotal, stakeAmount, hlx_to_usd])

    const handleKeyDown = (e, type) => {
        if (e.keyCode === 8 || e.key === "BackSpace") {
            switch (type) {
                case "minerLength": setMinerLength(''); break;
                case "minerPower": setMinerPower(''); break;
                case "burnAmplifier": setBurnAmplifier(''); break;
                case "stakeAmount": setStakeAmount(''); break;
                case "stakeLength": setStakeLength(''); break;
                case "stakeBurnAmplifier": setStakeBurnAmplifier(''); break;
                default: break;
            }
        }
        if (e.key === ".") {
            switch (type) {
                case "minerLength": setMinerLength(1); break;
                case "minerPower": setMinerPower(1); break;
                case "burnAmplifier": setBurnAmplifier(1); break;
                case "stakeLength": setStakeLength(0); break;
                case "stakeBurnAmplifier": setStakeBurnAmplifier(0); break;
                default: break;
            }
        }
    };


    return (
        <ClaculatorStyleWrapper>
            <div className="calculator_container">
                <h1>Calculator</h1>

                <div className="tab_container">
                    <div className="v2_footer_logo">
                        <img src={Logo} alt="bithu nft logo" />
                    </div>
                    <div className="tab_content">
                        <ul className="tab-list">
                            <li
                                className={`tabs ${getActiveClass(1, "active-tabs")}`}
                                onClick={() => toggleTab(1)}
                            >
                                HLX Mining {setMinerLength} {setMinerPower}
                            </li>
                            <li
                                className={`tabs ${getActiveClass(2, "active-tabs")}`}
                                onClick={() => toggleTab(2)}
                            >
                                HLX Staking
                            </li>
                        </ul>
                        <div className={`content ${getActiveClass(1, "active-content")}`}>
                            <div className="miner_setting_group">
                                <div className="miner_input_button">
                                    <div className="miner-container">
                                        <h3>Miner Length</h3>
                                        <input
                                            type="number"
                                            className='count_input'
                                            min="1"
                                            max="250"
                                            step="1"
                                            value={minerLength}
                                            onChange={(e) => onChangeInputHandler(e, 'minerLength')}
                                            onKeyDown={(e) => handleKeyDown(e, 'minerLength')}
                                        />
                                        <button className='max_button' onClick={minerLengthMaxButtonCliked}>MAX</button>
                                    </div>
                                </div>
                                <div className="miner_input_button">
                                    <div className="miner-container">
                                        <h3>Miner Power</h3>
                                        <input
                                            type="number"
                                            className='count_input'
                                            min="1"
                                            max="10000"
                                            step="1"
                                            value={minerPower}
                                            onChange={(e) => onChangeInputHandler(e, 'minerPower')}
                                            onKeyDown={(e) => handleKeyDown(e, 'minerPower')}
                                        />
                                        <button className='max_button' onClick={minerPowerMaxButtonCliked}>MAX</button>
                                    </div>

                                </div>
                                <div className="miner_input_button">
                                    <div className="miner-container">
                                        <h3>Burn Amplifier</h3>
                                        <input
                                            type="number"
                                            className='count_input'
                                            min="0"
                                            max="100000"
                                            step="1"
                                            value={burnAmplifier}
                                            onChange={(e) => onChangeInputHandler(e, 'burnAmplifier')}
                                            onKeyDown={(e) => handleKeyDown(e, 'burnAmplifier')}
                                        />
                                        <button className='max_button' onClick={burnAmplifierMaxButtonCliked}>MAX</button>
                                    </div>
                                </div>
                            </div>
                            <div className="total_miner_count">
                                <p className="top">Est. ROI % at End of Miner</p>
                                <p className="bottom">{estRoiEndofMiner > 0 ? `+${(estRoiEndofMiner).toFixed(2)}` : (estRoiEndofMiner).toFixed(2)}%</p>
                            </div>
                            <div className="miner_setting_group">
                                <h3 className="summary_roi_title">Summary & Estimated ROI</h3>
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name">
                                        <h5 style={{ color: '#fff' }}>Est. HLX at End</h5>
                                    </div>
                                    <div className="position_card_balance">
                                        <h5 className="span_right">{parseFloat(getMintableHlx).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h5>
                                    </div>
                                </div>
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name_miner">
                                        <h5 style={{ color: '#fff' }}>TITANX to start miner</h5>
                                    </div>
                                    <div className="position_card_balance_miner">
                                        <h5 className="span_right">{`${parseFloat(titanxStartMiner).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TITANX (~$${parseFloat(titanx_to_usd * titanxStartMiner).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`}</h5>
                                    </div>
                                </div>
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name">
                                        <h5 style={{ color: '#fff' }}>Market Value of Miner</h5>
                                    </div>
                                    <div className="position_card_balance">
                                        <h5 className="span_right">${parseFloat(marketMiner).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`content ${getActiveClass(2, "active-content")}`}>
                            <div className="miner_setting_group">
                                <div className="miner_input_button">
                                    <div className="miner-container">
                                        <h3>Stake Amount</h3>
                                        <input
                                            type="number"
                                            className='count_input'
                                            min="1"
                                            max={
                                                userBalance ? ethers.utils.formatEther(userBalance) : 0
                                            }
                                            step="1"
                                            value={stakeAmount}
                                            onChange={(e) => onChangeInputHandler(e, 'stakeAmount')}
                                            onKeyDown={(e) => handleKeyDown(e, 'stakeAmount')}
                                        />
                                        <button className='max_button' onClick={stakeAmountMaxClicked}>MAX</button>
                                    </div>

                                </div>
                                <div className="miner_input_button">
                                    <div className="miner-container">
                                        <h3>Stake Length</h3>
                                        <input
                                            type="number"
                                            className='count_input'
                                            min="30"
                                            max="830"
                                            step="1"
                                            value={stakeLength}
                                            onChange={(e) => onChangeInputHandler(e, 'stakeLength')}
                                            onKeyDown={(e) => handleKeyDown(e, 'stakeLength')}
                                        />
                                        <button className='max_button' onClick={stakeLengthMaxClicked}>MAX</button>
                                    </div>
                                </div>
                                <div className="miner_input_button">
                                    <div className="miner-container">
                                        <h3>Burn Amplifier</h3>
                                        <input
                                            type="number"
                                            className='count_input'
                                            min="0"
                                            max="20"
                                            step="1"
                                            value={getstakeBurnAmplifier}
                                            onChange={(e) => onChangeInputHandler(e, 'stakeBurnAmplifier')}
                                            onKeyDown={(e) => handleKeyDown(e, 'stakeBurnAmplifier')}
                                        />
                                        <button className='max_button' onClick={stakeBurnAmplifierMaxClicked}>MAX</button>
                                    </div>
                                </div>
                            </div>
                            <div className="miner_setting_group">
                                <h3 className="summary_roi_title">Share Details</h3>
                                <div className="share_details">
                                    <div className="share_details_left">
                                        <p>Effective Share Rate (incl. Bonuses)</p>
                                    </div>
                                    <div className="share_details_right">
                                        <p>{parseFloat(effectiveShareRate).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="share_details">
                                    <div className="share_details_left">
                                        <p>Effective Shares (incl. Bonuses)</p>
                                    </div>
                                    <div className="share_details_right">
                                        <p>{parseFloat(sharesWithBonus).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="share_details">
                                    <div className="share_details_left">
                                        <p>% of Global Active Shares</p>
                                    </div>
                                    <div className="share_details_right">
                                        <p>{parseFloat(getGlobalShares).toFixed(2)} %</p>
                                    </div>
                                </div>
                                <div className="share_details">
                                    <div className="share_details_left">
                                        <p>HLX Stake Value</p>
                                    </div>
                                    <div className="share_details_right">
                                        <p>${(stakeAmount * hlx_to_usd).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="miner_setting_group">
                                <div className="summary_stake_content">
                                    <div className="summary_staker_payout" >
                                        <div className="summary_staker_left" style={{ fontSize: "17px" }}>
                                            HLX Stake Value
                                        </div>
                                        <div className="summary_staker_right" style={{ fontSize: "17px" }}>
                                            ${(stakeAmount * hlx_to_usd).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="total_miner_count">
                                <p className="top">Est. ROI % Throughout Stake</p>
                                <p className="bottom"> {userROI > 0 ? `+${userROI.toFixed(2)}` : userROI.toFixed(2)}%</p>
                            </div>

                            <div className="miner_setting_group">
                                <h3 className="summary_roi_title">Summary & Your % of Staker Payouts</h3>
                                <div className="summary_stake_content">
                                    <div className="summary_staker_payout">
                                        <div className="summary_staker_left">
                                            <p>Next 22-Day EST. Payout</p>
                                        </div>
                                        <div className="summary_staker_right">
                                            <p className="dollar">${parseFloat((titanx_to_usd * gettwoEstTitanPayout) + (ether_to_usd * gettwoEstEthPayout)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </p>
                                            <p className="ether">{(gettwoEstEthPayout).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ETH</p>
                                            <p className="titanx_amount_pool">{(gettwoEstTitanPayout).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TITANX</p>
                                        </div>
                                    </div>
                                    <div className="payouts_total_box">
                                        <div className="payouts_total_name">
                                            <span>{cycleNum22}</span>
                                            <span>Payouts Total</span>
                                        </div>
                                        <div className="payouts_total_dollar">$ {parseFloat(userUsdTotal22).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    </div>
                                </div>
                                <div className="summary_stake_content">
                                    <div className="summary_staker_payout">
                                        <div className="summary_staker_left">
                                            <p>Next 69-Day EST. Payout</p>
                                        </div>
                                        <div className="summary_staker_right">
                                            <p className="dollar">${parseFloat((titanx_to_usd * getsixEstTitanPayout) + (ether_to_usd * getsixEstEthPayout)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                            <p className="ether">{(getsixEstEthPayout).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ETH</p>
                                            <p className="titanx_amount_pool">{(getsixEstTitanPayout).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TITANX</p>
                                        </div>
                                    </div>
                                    <div className="payouts_total_box">
                                        <div className="payouts_total_name">
                                            <span>{cycleNum69}</span>
                                            <span>Payouts Total</span>
                                        </div>
                                        <div className="payouts_total_dollar">$ {parseFloat(userUsdTotal69).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    </div>
                                </div>
                                <div className="summary_stake_content">
                                    <div className="summary_staker_payout">
                                        <div className="summary_staker_left">
                                            <p>Next 420-Day EST. Payout</p>
                                        </div>
                                        <div className="summary_staker_right">
                                            <p className="dollar">${parseFloat((titanx_to_usd * getfourEstTitanPayout) + (ether_to_usd * getfourEstEthPayout)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                            <p className="ether">{(getfourEstEthPayout).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ETH</p>
                                            <p className="titanx_amount_pool">{(getfourEstTitanPayout).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TITANX</p>
                                        </div>
                                    </div>
                                    <div className="payouts_total_box">
                                        <div className="payouts_total_name">
                                            <span>{cycleNum420}</span>
                                            <span>Payouts Total</span>
                                        </div>
                                        <div className="payouts_total_dollar">$ {parseFloat(userUsdTotal420).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    </div>
                                </div>
                                <div className="total_payout_amount">
                                    <div className="payouts_total_name_total">
                                        <span>Est Total Payouts</span>
                                    </div>
                                    <div className="payouts_total_dollar_total">$ {parseFloat(userUsdTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="social_part">
                    <div className="button_functions"><button onClick={takeScreenshot}>Step 1: Click to Take the Screenshot</button></div>
                    <div className="button_functions"><button>Step 2: Share on Socials</button></div>
                </div>
            </div>
        </ClaculatorStyleWrapper>
    );
}
export default CalculatorContent;