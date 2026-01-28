import StatsContentStyleWrapper from "./StatsContent.style";
import StatesText from "../../common/statstext/StatsText";
import MiningStakingText from "../../common/miningstakingtext/MiningStakingText";
import heliosAvatar from "../../assets/helius/HLX.png";
import tooltipText from "../../assets/helius/tooltipText.json";
import heliosContract from "../../contract/helios.json";
import buyandburnContract from "../../contract/buyandburn.json";
import { useContractRead } from "wagmi";
import { useSelector } from "react-redux";
import { HeliosAddress, etherToFixed, BuyandburnAddress } from "../../const/const";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useState } from "react";
// import CanvasJSReact from '@canvasjs/react-charts';
import { ethers } from "ethers";

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const StatsContent = () => {
    // Start Get Redux store variables
    const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);       // Fetch the value of HLX price from redux

    /**
     *@description: getGlobalHRank
     */
    const { data: globalHRank } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getGlobalHRank',
        watch: true,
    });

    /**
     *@description: getGlobalMintPower
     */
    const { data: globalMintPower } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getGlobalMintPower',
        watch: true,
    });

    /**
     *@description: getGlobalShares
     */
    const { data: globalShares } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getGlobalShares',
        watch: true,
    });

    /**
     *@description: totalHeliosLiquidSupply
     */
    const { data: totalLiquidSupply } = useContractRead({
        address: BuyandburnAddress,
        abi: buyandburnContract.abi,
        functionName: 'totalHeliosLiquidSupply',
        watch: true,
    });

    /**
     *@description: getTotalHlxStaked
     */
    const { data: totalHlxStaked } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getTotalHlxStaked',
        watch: true,
    });

    /**
     *@description: getTotalPenalties
     */
    const { data: totalPenalties } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getTotalPenalties',
        watch: true,
    });

    /**
     *@description: getTotalBurnTotal
     */
    const { data: totalBurnTotal } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getTotalBurnTotal',
        watch: true,
    });

    /**
     *@description: getTotalHelioBuyAndBurn
     */
    const { data: totalHlxBuyBurn } = useContractRead({
        address: BuyandburnAddress,
        abi: buyandburnContract.abi,
        functionName: 'getTotalHelioBuyAndBurn',
        watch: true,
    });

    /**
     *@description: getHlxFeesBuyAndBurnFunds
     */
    const { data: lpFees } = useContractRead({
        address: BuyandburnAddress,
        abi: buyandburnContract.abi,
        functionName: 'getHlxFeesBuyAndBurnFunds',
        watch: true,
    });

    /**
    * @description: getPoolAddress
    */

    const { data: poolAddress } = useContractRead({
        address: BuyandburnAddress,
        abi: buyandburnContract.abi,
        functionName: 'getPoolAddress',
        watch: true,
    })

    const [getGlobalHRank, setGlobalHRank] = useState(0);
    const [getGlobalMintPower, seGlobalMintPowert] = useState(0);
    const [getGlobalShares, setGlobalShares] = useState(0);
    const [getTotalLiquidSupply, setTotalLiquidSupply] = useState(0);
    const [getTotalHlxStaked, setTotalHlxStaked] = useState(0);
    const [getTotalPenalties, setTotalPenalties] = useState(0);
    const [getTotalBurnTotal, setTotalBurnTotal] = useState(0);
    const [getTotalHlxBuyBurn, setTotalHlxBuyBurn] = useState(0);
    const [hlxTitanPoolAddress, setHlxTitanPoolAddress] = useState(0);
    const [investmentPoolAddress, setInvestmentPoolAddress] = useState(0);
    const [percentageTotal, setPercentageTotal] = useState(0);

    /**
     *@description: getHeliosBalance
     */
    const { data: lpHeliosbalance } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'balanceOf',
        args: [hlxTitanPoolAddress],
        watch: true,
    });

    /**
     *@description: InvestmentPool Address
     */
    const { data: investmentAddress } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getInvestmentAddress',
        watch: true,
    });

    /**
     *@description: Investment Pool Balance
     */
    const { data: investmentBalance } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'balanceOf',
        args: [investmentPoolAddress],
        watch: true,
    });

    const [getLpFees, setLpFees] = useState(0);
    const [getTotalSupply, setGetTotalSupply] = useState(1);
    // const options = {
    //     exportEnabled: false,
    //     animationEnabled: true,
    //     backgroundColor: "transparent",
    //     height: 350,
    //     legend: {
    //         fontColor: 'white', 
    //     },
    //     data: [{
    //         type: "pie",
    //         startAngle: 375,
    //         toolTipContent: "<b>{label}</b>: {y}%",
    //         showInLegend: "false",
    //         legendText: "{label}",
    //         indexLabelFontSize: 16,
    //         indexLabelFontColor: "white",
    //         indexLabelColor: "white",
    //         indexLabel: "{label} - {y}%",
    //         labelFontColor: "white",
    //         dataPoints: [
    //             { y: ((getTotalLiquidSupply / percentageTotal) * 100).toFixed(2), label: "Liquid", color: "#FE7B00" },
    //             { y: ((getTotalHlxStaked / percentageTotal) * 100).toFixed(2), label: "Staked", color: "#F2B73E" },
    //             { y: ((getTotalPenalties / percentageTotal) * 100).toFixed(2), label: "Penalties ", color: "#BD6925" },
    //             { y: ((getTotalBurnTotal / percentageTotal) * 100).toFixed(2), label: "User Burned", color: "#7F2200" },
    //             { y: ((getTotalHlxBuyBurn / percentageTotal) * 100).toFixed(2), label: "Buy & Burned", color: "#BA3505" },
    //             { y: ((getLpFees / percentageTotal) * 100).toFixed(2), label: "LP Fees Burned", color: "#8B4513" }
    //         ]
    //     }]
    // }

    useEffect(() => {
        setGlobalHRank(globalHRank ? globalHRank.toString() : 0);
        seGlobalMintPowert(globalMintPower ? globalMintPower.toString() : 0);
        setGlobalShares(etherToFixed(globalShares ? globalShares.toString() : 0));
        setTotalHlxStaked(etherToFixed(totalHlxStaked ? totalHlxStaked.toString() : 0));
        setTotalPenalties(etherToFixed(totalPenalties ? totalPenalties.toString() : 0));
        setTotalBurnTotal(totalBurnTotal ? etherToFixed(totalBurnTotal.toString()) : 0);
        setTotalHlxBuyBurn(totalHlxBuyBurn ? etherToFixed(totalHlxBuyBurn.toString()) : 0);
        setLpFees(lpFees ? etherToFixed(lpFees.toString()) : 0);
        setGetTotalSupply(etherToFixed(totalLiquidSupply ? totalLiquidSupply : 0));
        setHlxTitanPoolAddress(poolAddress ? poolAddress.toString() : ethers.constants.AddressZero);
        setInvestmentPoolAddress(investmentAddress ? investmentAddress.toString() : ethers.constants.AddressZero);
    }, [globalHRank, totalLiquidSupply, totalHlxStaked, totalPenalties, totalBurnTotal, totalHlxBuyBurn, lpFees, globalMintPower, globalShares, poolAddress, investmentAddress]);


    useEffect(() => {
        const total = (parseFloat(getTotalSupply) - parseFloat(etherToFixed(lpHeliosbalance ? lpHeliosbalance.toString() : 0)) - parseFloat(etherToFixed(investmentBalance ? investmentBalance.toString() : 0)));
        setTotalLiquidSupply(total);

    }, [getTotalSupply, lpHeliosbalance, investmentBalance])


    useEffect(() => {
        setPercentageTotal(getTotalLiquidSupply + getTotalBurnTotal + getTotalHlxBuyBurn + getTotalHlxStaked + getLpFees + getTotalPenalties);
    }, [getTotalLiquidSupply, getTotalBurnTotal, getTotalHlxBuyBurn, getTotalPenalties, getTotalHlxStaked, getLpFees])

    return (
        <StatsContentStyleWrapper>
            <div className="mine_container">
                <div className="ether_subtitle">
                    <img className="helius_icon" src={heliosAvatar} alt="" />
                    <h2>The Helios Ecosystem at a Glance</h2>
                </div>
                <div className="mine_top">
                    <div className="tablist">
                        <div className="miner_cards">
                            <h1>Helios Distribution</h1>

                        </div>
                        {/* <CanvasJSChart options={options} /> */}
                    </div>

                    <div className="mine_details">
                        <div className="card_top">
                            <div className="top_title"><h1>Supply</h1></div>
                            <div className="top_content">
                                <StatesText color={"orange"} name="Liquid"
                                    balance={parseFloat((getTotalLiquidSupply)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    usd={parseFloat((getTotalLiquidSupply * (hlx_to_usd !== 0 ? hlx_to_usd : 0.00)).toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    tooltip={tooltipText.stats[0].supply.find(asset => 'liquid' in asset)?.liquid} />
                                <StatesText color={"#F2B73E"} name="Staked"
                                    balance={parseFloat(getTotalHlxStaked).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    usd={(parseFloat(getTotalHlxStaked) * parseFloat(hlx_to_usd !== 0 ? hlx_to_usd : 0.00002)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    tooltip={tooltipText.stats[0].supply.find(asset => 'staked' in asset)?.staked} />
                                <StatesText color="#ff5b1f" name="Penalties"
                                    balance={parseFloat(getTotalPenalties).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    usd={(parseFloat(getTotalPenalties) * (hlx_to_usd !== 0 ? hlx_to_usd : 0.00002)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    tooltip={tooltipText.stats[0].supply.find(asset => 'panelty' in asset)?.panelty} />
                                <StatesText color="#ff5b1f" name="User Burned"
                                    balance={parseFloat(getTotalBurnTotal).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    usd={(parseFloat(getTotalBurnTotal) * (hlx_to_usd !== 0 ? hlx_to_usd : 0.00002)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    tooltip={tooltipText.stats[0].supply.find(asset => 'userburned' in asset)?.userburned} />
                                <StatesText color="#ff5b1f" name="Buy & Burned"
                                    balance={parseFloat(getTotalHlxBuyBurn).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    usd={(parseFloat(getTotalHlxBuyBurn) * (hlx_to_usd !== 0 ? hlx_to_usd : 0.00002)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    tooltip={tooltipText.stats[0].supply.find(asset => 'Buyburned' in asset)?.Buyburned} />
                                <StatesText color="#ff5b1f" name="LP Fees Burned"
                                    balance={parseFloat(getLpFees).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    usd={(parseFloat(getLpFees) * (hlx_to_usd !== 0 ? hlx_to_usd : 0.00002)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    tooltip={tooltipText.stats[0].supply.find(asset => 'LPfeesburned' in asset)?.LPfeesburned} />
                            </div>
                        </div>


                        <div className="card_top">
                            <div className="top_title"><h1>Mining & Staking</h1></div>
                            <div className="bottom_content">
                                <MiningStakingText name="Global hRank"
                                    tooltip={tooltipText.stats[1].miningandstaking.find(asset => 'GlobalMiners' in asset)?.GlobalMiners}
                                    balance={getGlobalHRank} />
                                <MiningStakingText name="Global Mining Power"
                                    tooltip={tooltipText.stats[1].miningandstaking.find(asset => 'GlobalMiningPower' in asset)?.GlobalMiningPower}
                                    balance={parseFloat(getGlobalMintPower).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
                                <MiningStakingText name="Global Active Shares"
                                    tooltip={tooltipText.stats[1].miningandstaking.find(asset => 'GlobalActiveShares' in asset)?.GlobalActiveShares}
                                    balance={parseFloat(getGlobalShares).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </StatsContentStyleWrapper>
    );
}
export default StatsContent;