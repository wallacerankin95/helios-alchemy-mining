import EndedTableHead from "./EndedTableHead";
import { useSortableTable } from "./useSortableTable";
import ProgressBar from "@ramonak/react-progress-bar";
import { useContractRead, useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { FaSkullCrossbones, FaCheckCircle } from "react-icons/fa";
import heliosContract from "../../contract/helios.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import {
  HeliosAddress,
  etherToFixed,
  differenceDay,
} from "../../const/const";
import { useState } from "react";
import BigNumber from 'bignumber.js';



const Tr = ({ val, address }) => {
  // const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
  const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
  const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);       // Fetch the value of HLX price from redux

  const { data: estimateReward } = useContractRead({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: 'estimateMintReward',
    watch: true,
    args: [address, BigNumber(val.mId._hex).toNumber()],
  });

  return (
    <tr>
      <td>{BigNumber(val.hRank._hex).toNumber()}</td>
      <td>{val.mintInfo.numOfDays}</td>
      <td>{`${new Date((val.mintInfo.mintStartTs) * 1000).getMonth() + 1}/${new Date((val.mintInfo.mintStartTs) * 1000).getDate()}/${new Date((val.mintInfo.mintStartTs) * 1000).getFullYear()}`}</td>
      <td>{`${new Date((val.mintInfo.maturityTs) * 1000).getMonth() + 1}/${new Date((val.mintInfo.maturityTs) * 1000).getDate()}/${new Date((val.mintInfo.maturityTs) * 1000).getFullYear()}`}</td>
      <td>{BigNumber(val.mintInfo.mintPower._hex).toNumber()}</td>
      <td>{etherToFixed(val.mintInfo.mintableHlx)}</td>
      <td>{(etherToFixed(estimateReward._hex) - etherToFixed(val.mintInfo.mintableHlx)).toFixed(2)}</td>
      <td>{parseFloat(ethers.utils.formatEther(val.mintInfo.mintCost)).toFixed(4)}</td>
      <td>{titanx_to_usd * etherToFixed(val.mintInfo.mintCost)}</td>
      <td>{((etherToFixed(estimateReward._hex) - etherToFixed(val.mintInfo.mintableHlx)) * hlx_to_usd - titanx_to_usd * etherToFixed(val.mintInfo.mintCost)).toFixed(2)} %</td>
      <td style={{ paddingLeft: '3px', paddingRight: '3px' }}>
        <div className="progress_content">
          <ProgressBar className="progress_bar" completed={(100 / val.mintInfo.numOfDays) * (differenceDay(`${new Date((val.mintInfo.mintStartTs) * 1000).getMonth() + 1}/${new Date((val.mintInfo.mintStartTs) * 1000).getDate()}/${new Date((val.mintInfo.mintStartTs) * 1000).getFullYear()}`)) < 0 ? 0 : (differenceDay(`${new Date((val.mintInfo.mintStartTs) * 1000).getMonth() + 1}/${new Date((val.mintInfo.mintStartTs) * 1000).getDate()}/${new Date((val.mintInfo.mintStartTs) * 1000).getFullYear()}`))} bgColor="#BA3505" isLabelVisible={false} />
          <p>{
            (100 / val.mintInfo.numOfDays) * (differenceDay(`${new Date((val.mintInfo.mintStartTs) * 1000).getMonth() + 1}/${new Date((val.mintInfo.mintStartTs) * 1000).getDate()}/${new Date((val.mintInfo.mintStartTs) * 1000).getFullYear()}`)) < 0 ? 0 : (differenceDay(`${new Date((val.mintInfo.mintStartTs) * 1000).getMonth() + 1}/${new Date((val.mintInfo.mintStartTs) * 1000).getDate()}/${new Date((val.mintInfo.mintStartTs) * 1000).getFullYear()}`))}%</p>
        </div>
      </td>
      <td style={{ paddingLeft: '7px', paddingRight: '7px' }}>
        <button className="table_share_btn">Share</button>
      </td>
      <td style={{ paddingLeft: '7px', paddingRight: '7px' }}>
        <button className="table_claim_titanx_btn">Claim HLX</button>
      </td>
    </tr>
  )
}

const EndedTable = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);
  const { address } = useAccount();

  /**
   * @description: getUserMints () All User mint
   */
  const { data: activeTotalMint } = useContractRead({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: 'getUserMints',
    watch: true,
    args: [address],
  });

  const [getAllMintUser, setGetAllMintUser] = useState([]);
  const [getEndedMintUser, setGetEndedMintUser] = useState([]);

  useEffect(() => {
    setGetAllMintUser(activeTotalMint);
    if (activeTotalMint) {
      for (let i = 0; i < activeTotalMint.length; i++) {
        const filteredEndedUsers = activeTotalMint.filter(
          mintUser => mintUser?.mintInfo?.status === 0
        );

        // Update the state with the filtered array
        setGetEndedMintUser(filteredEndedUsers);
      }
    }
  }, []);

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>

        <EndedTableHead {...{ columns, handleSorting }} />
        <tbody>
          {getEndedMintUser && getEndedMintUser.length > 0 ?
            getEndedMintUser.map((val, ind) => (
              <Tr key={ind} val={val} address={address} />
            ))
            : (
              <tr className="nodata_table_body">
                <td colSpan="13">
                  <FaSkullCrossbones />
                  <span>No Data</span>
                </td>
              </tr>
            )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total(0)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>= 0</td>
            <td>0 eth</td>
            <td>$ 0</td>
            <td>NaN %</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default EndedTable;