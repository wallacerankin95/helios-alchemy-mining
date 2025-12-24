import React from "react";
import { BuyandburnAddress, HeliosAddress } from "../../const/const";
import { useContractRead, useContractReads } from "wagmi";
import heliosContract from "../../contract/helios.json";
import buynburnContract from "../../contract/buyandburn.json";
import { useEffect } from "react";
import { useState } from "react";


const Timer = () => {
    const { data: currentBlockTimeStamp } = useContractRead({
        address: HeliosAddress,
        abi: heliosContract.abi,
        functionName: 'getCurrentBlockTimeStamp',
        watch: true,
    });
    const buyAndBurnContractObj = {
        address: BuyandburnAddress,
        abi: buynburnContract.abi,
    };
    const { data } = useContractReads({
        contracts: [
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

    const convertToHourFormat = (timer) => {
        const remainingSeconds = timer % 86400; // Calculate remaining seconds after subtracting days
        const date = new Date(remainingSeconds * 1000); // Convert remaining seconds to date
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        return (`${hours}H:${minutes}M:${seconds}S`);
    }

    const [countDown, setCountdown] = useState();

    useEffect(() => {
        if (data) {
            const buyburnInterval = data[0] ? data[0].toNumber() : 0;
            const lastBurnCall = data[1] ? data[1].toNumber() : 0;

            const currentBlockTime = currentBlockTimeStamp ? currentBlockTimeStamp.toString() : 0;
            const timer = parseInt(buyburnInterval) + parseInt(lastBurnCall) - parseInt(currentBlockTime);
            if (timer < 0) {
                setCountdown(0);
            } else {
                setCountdown(timer);
            }
        }
    }, [data]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (countDown > 0) {
                setCountdown(countDown - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [countDown]);


    return (
        <div className="timer_text">{convertToHourFormat(countDown)} </div>
    )
}

export default Timer;