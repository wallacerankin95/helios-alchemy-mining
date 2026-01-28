import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Header from "../components/section/header/header/Header";
import Layout from "../common/layout";
import Footer from "../components/section/footer/v2";
import Mine from "../pages/mine";
import Stake from "../pages/stake";
import RewardPool from "../pages/rewardpool";
import BurnPool from "../pages/burnpool";
import Stats from "../pages/stats"
import Calculator from "../pages/calculator";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import {  useContractRead, useContractReads } from "wagmi";
import BuynBurnContract from "../contract/buyandburn.json";
import {useDispatch } from "react-redux";
import {
    BuyandburnAddress, 
    WETHTitanPoolAddress, 
    WETHUsdtPoolAddress
} from "../const/const";
import pool from "../contract/pool.json";
import BigNumber from "bignumber.js";
import {setEtherToUsd, setTitanxToUsd, setHlxToUsd}  from "../store/price/index";


function App() {

    const dispatch = useDispatch();

    const [titanHlxPool, setTitanHlxPool] = useState("");
    const [titanHlxPrice, setTitanHlxPrice] = useState("0");
    const [titanEthPrice, setTitanEthPrice] = useState("0");
    const [ethUsdtPrice, setEthUsdtPrice] = useState("0");

    const buyAndBurnObj = {
        address: BuyandburnAddress,
        abi: BuynBurnContract.abi,
    }

    const { data: hlxPool } = useContractRead({
        ...buyAndBurnObj,
        functionName: "getPoolAddress",
    })

    useEffect(() => {
      setTitanHlxPool(hlxPool ? hlxPool.toString() : "");
    }, [hlxPool])

  const {data: slot0} = useContractReads({
        contracts: [
        {
            address: titanHlxPool,
            abi: pool.abi,
            functionName: "slot0",
        },
        {
            address: WETHUsdtPoolAddress,
            abi: pool.abi,
            functionName: "slot0"
        },
        {
            address: WETHTitanPoolAddress,
            abi: pool.abi,
            functionName: "slot0"
        }
        ]
    });

    useEffect(() => {
      if(slot0)
      {
        setTitanHlxPrice(slot0[0] ? new BigNumber(slot0[0].sqrtPriceX96.toString()).times(new BigNumber(slot0[0].sqrtPriceX96.toString())).div(BigNumber(2).pow(192)).toPrecision() : 0);
        const token0Decimals = 18; // ETH
        const token1Decimals = 6; // USDT
        const decimalAdjustment = new BigNumber(10).pow(token0Decimals - token1Decimals);
        setEthUsdtPrice(slot0[0] ? new BigNumber(slot0[1].sqrtPriceX96.toString()).times(new BigNumber(slot0[1].sqrtPriceX96.toString())).div(BigNumber(2).pow(192)).times(decimalAdjustment).toPrecision() : 0);
        setTitanEthPrice(slot0[0] ? BigNumber(2).pow(192).div(new BigNumber(slot0[2].sqrtPriceX96.toString()).times(new BigNumber(slot0[2].sqrtPriceX96.toString()))).toPrecision() : 0)
      }
    }, [slot0])
  
  useEffect(() => {
      dispatch(setEtherToUsd(ethUsdtPrice));
      dispatch(setTitanxToUsd((titanEthPrice * ethUsdtPrice).toFixed(10)));
      dispatch(setHlxToUsd((titanHlxPrice * (titanEthPrice * ethUsdtPrice)).toFixed(10)));
  }, [ethUsdtPrice, titanEthPrice, titanHlxPrice, dispatch])

  return (
    <Layout>
      <GlobalStyles />
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/rewardpools" element={<RewardPool />} />
        <Route path="/burnpools" element={<BurnPool />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
