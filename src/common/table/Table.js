import { useEffect, React } from "react";
import { useContractRead, useAccount, useWaitForTransaction, useContractWrite } from "wagmi";
import { useSelector } from "react-redux";
import { FaSkullCrossbones } from "react-icons/fa";
import heliosContract from "../../contract/helios.json";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  HeliosAddress,
  etherToFixed,
} from "../../const/const";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../components/modal/ShareModal";

const TdButton = ({ id, isConnected, claimable }) => {
  /**
     *@description: Claim HLX for each miner
     */
  const {
    data: claimHlxData,
    write: claimHlx,
    isLoading: isClaimLoading,
  } = useContractWrite({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: "claimMint",
    args: [id],
    onError(error) {
      toast.error(error.reason.slice(0, 150) + "...", {
        autoClose: 2000,
      });
    },
  });

  const claimHlxClicked = async (mId) => {
    claimHlx({ args: [mId] });
  }

  const { isLoading: isComfirmationLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: claimHlxData?.hash,
    onSuccess(data) {
      toast.success("Successfully Claimed.", { autoClose: 1000 });
    },
    onError(error) {
      toast.error(error.reason.slice(0, 150) + "...", {
        autoClose: 2000,
      });
    },
  });

  return (
    <button className="table_claim_titanx_btn" disabled={!(claimable && isConnected && !isClaimLoading && !isComfirmationLoading)} onClick={() => { claimHlxClicked(id); }}>{(isClaimLoading && isComfirmationLoading) ? "Loading..." : "Claim HLX"}</button>
  )
}
const Tr = ({ val, minertype, setTotalHlx, number }) => {
  const [type, setType] = useState(minertype);
  useEffect(() => {
    setType(minertype);
  }, [minertype]);
  // const ether_to_usd = useSelector((state) => state.price.ether_to_usd);   // Fetch the value of ether price from redux
  const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
  const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);       // Fetch the value of HLX price from redux
  const { isConnected, address } = useAccount();
  /**
  * @description: Estimate Mint Reward
  */
  const { data: estimateReward } = useContractRead({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: 'estimateMintReward',
    watch: true,
    args: [address, val.mintId],
  });
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

  useEffect(() => {

    const hlx = parseInt(val.status) === 0 ? (parseFloat(etherToFixed(val.mintableHlx?.toString() || "0"))) : (parseFloat(etherToFixed(val.mintedHlx.toString() || "0")));

    if (number === 0) {
      setTotalHlx(hlx);
    } else {
      setTotalHlx((prevTotal) => prevTotal + hlx)
    }
  }, [val]);

  return (
    <tr>
      <td>{val.hRank}</td>
      <td>{val.length}</td>
      <td>{`${new Date(val.startDay * 1000).getMonth() + 1}/${new Date(
        val.startDay * 1000
      ).getDate()}/${new Date(val.startDay * 1000).getFullYear()}`}</td>
      <td>{`${new Date(val.endDay * 1000).getMonth() + 1}/${new Date(
        val.endDay * 1000
      ).getDate()}/${new Date(val.endDay * 1000).getFullYear()}`}</td>
      {/* const burnAmount = (parseFloat(mintCost / 100) * minerAmplifier);
      setTitanToBurn(burnAmount); */}
      <td>{val.mintPower}</td>
      {/* HLX */}
      <td>
        {(
          (parseInt(val.status) === 0
            ? etherToFixed(val.mintableHlx ? val.mintableHlx.toString() : 0)
            : etherToFixed(val.mintedHlx.toString())) -
          (parseInt(val.status) !== 0
            ? etherToFixed(val.mintedHlx.toString()) +
            etherToFixed(val.penalty.toString()) -
            etherToFixed(val.mintableHlx.toString())
            : 0)
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })}
      </td>
      {/* hRank Bonus */}
      <td style={{ color: "#2FF712" }}>
        {(parseInt(val.status) !== 0
          ? etherToFixed(val.mintedHlx.toString()) +
          etherToFixed(val.penalty.toString()) -
          etherToFixed(val.mintableHlx.toString())
          : parseFloat(etherToFixed(estimateReward ? estimateReward : 0)) -
          parseFloat(etherToFixed(val.mintableHlx.toString())) * 2
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })}
      </td>
      {/* Cost */}
      <td>
        {(
          parseFloat(etherToFixed(val.mintCost)) +
          parseFloat(etherToFixed(val.titanBurned))
        ).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </td>
      {/* $ Value */}
      {type !== "ended" ? (
        <td style={{ color: "#2FF712" }}>
          $
          {(
            etherToFixed(val.mintableHlx ? val.mintableHlx.toString() : 0) *
            hlx_to_usd
          ).toLocaleString("en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </td>
      ) : undefined}
      {/* %ROI */}
      {type !== "ended" ? (
        <td style={{ color: "#2FF712" }}>
          {(
            ((etherToFixed(val.mintableHlx) * hlx_to_usd +
              (parseInt(val.status) !== 0
                ? etherToFixed(val.mintedHlx.toString()) +
                etherToFixed(val.penalty.toString()) -
                etherToFixed(val.mintableHlx.toString())
                : parseFloat(
                  etherToFixed(estimateReward ? estimateReward : 0)
                ) -
                parseFloat(etherToFixed(val.mintableHlx.toString())) * 2) *
              hlx_to_usd) /
              ((etherToFixed(val.mintCost) +
                parseFloat(etherToFixed(val.titanBurned))) *
                titanx_to_usd) -
              1) *
            100
          ).toFixed(2)}{" "}
          %
        </td>
      ) : undefined}
      {/* Total HLX in case of ended table */}
      {type === "ended" ? (
        <td>
          {(parseInt(val.status) === 0
            ? etherToFixed(val.mintableHlx ? val.mintableHlx.toString() : 0)
            : etherToFixed(val.mintedHlx.toString())
          ).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </td>
      ) : undefined}

      <td style={{ paddingLeft: "3px", paddingRight: "3px" }}>
        <div className="progress_content">
          <ProgressBar
            className="progress_bar"
            completed={val.percentageDone}
            bgColor="linear-gradient(90deg, rgba(254,156,1,1) 13%, rgba(186,53,5,1) 87%)"
            isLabelVisible={false}
          />
          <p>{val.percentageDone}%</p>
        </div>
      </td>
      <td style={{ paddingLeft: "7px", paddingRight: "7px" }}>
        <button className="table_share_btn" onClick={Toggle}>
          Share
        </button>
        <Modal
          show={modal}
          close={Toggle}
          data={val}
          estimateReward={estimateReward ? estimateReward : 0}
          hlxPrice={hlx_to_usd}
          titanPrice={titanx_to_usd}
        />
      </td>
      {type === "claim" ? (
        <td style={{ paddingLeft: "7px", paddingRight: "7px" }}>
          <TdButton
            id={val.mintId}
            isConnected={isConnected}
            claimable={val.claimable}
          />
        </td>
      ) : undefined}
    </tr>
  );
}
const Table = ({ caption, type, data }) => {
  // const [sortConfig, setSortConfig] = useState({ direction: 'ascending', key: 'hRank' });
  const [sortConfig, setSortConfig] = useState({ direction: 'ascending', key: '' });

  const [minerType, setMinerType] = useState("active");

  const [totalHlx, setTotalHlx] = useState(0);
  const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);
  useEffect(() => {
    setMinerType(type);
  }, [type]);



  const sortData = ({ direction = '', key = '' }) =>
    (a, b) => {
      if (key === "totalhlx") {
        const temp = "mintedHlx";
        if ((a[temp] + a[temp] - a["mintableHlx"]) === 0 ? (a["mintableHlx"] + a[temp]) : (a[temp] + a[temp] - a["mintedHlx"]) < (b[temp] + b[temp] - b["mintedHlx"]) == 0 ? (b[temp] + b["mintableHlx"]) : (b[temp] + b[temp] - b["mintableHlx"])) {
          return direction === 'ascending' ? -1 : 1;
        }
        if ((a[temp] + a[temp] - a["mintableHlx"]) === 0 ? (a[temp] + a["mintableHlx"]) : (a[temp] + a[temp] - a["mintableHlx"]) > (b[temp] + b[temp] - b["mintableHlx"]) == 0 ? (b[temp] + b["mintableHlx"]) : (b[temp] + b[temp] - b["mintableHlx"])) {
          return direction === 'ascending' ? 1 : -1;
        }
      }
      if (key === "hrankbonus") {
        const temp = "mintedHlx";
        if ((a[temp] - a["mintableHlx"]) === 0 ? a["mintableHlx"] : (a[temp] - a["mintedHlx"]) < (b[temp] - b["mintedHlx"]) == 0 ? b["mintableHlx"] : (b[temp] - b["mintableHlx"])) {
          return direction === 'ascending' ? -1 : 1;
        }
        if ((a[temp] - a["mintableHlx"]) === 0 ? a["mintableHlx"] : (a[temp] - a["mintableHlx"]) > (b[temp] - b["mintableHlx"]) == 0 ? b["mintableHlx"] : (b[temp] - b["mintableHlx"])) {
          return direction === 'ascending' ? 1 : -1;
        }
      }
      if (key === "value") {
        const temp = "mintableHlx";
        if (a[temp] < b[temp]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[temp] > b[temp]) {
          return direction === 'ascending' ? 1 : -1;
        }
      }
      if (key === "stakeId" || "length") {
        if (parseFloat(a[key]) < parseFloat(b[key])) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (parseFloat(a[key]) > parseFloat(b[key])) {
          return direction === 'ascending' ? 1 : -1;
        }
      }
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }

  const handleSortingChange = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key)
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else {
        direction = 'ascending';
      }

    setSortConfig({ key, direction: direction });
  };

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th rowSpan="2" onClick={() => handleSortingChange('hRank')}
              className={`${sortConfig.key === "hRank" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}> hRank </th>
            <th colSpan="4">Miner Details</th>
            <th rowSpan="2" onClick={() => handleSortingChange('mintableHlx')}
              className={`${sortConfig.key === "mintableHlx" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}> HLX </th>
            <th rowSpan="2" onClick={() => handleSortingChange('hrankbonus')} style={{ color: "#2FF712" }}
              className={`${sortConfig.key === "hrankbonus" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>  hRank Bonus </th>
            {minerType === "ended" ? (<>
              <th rowSpan="2" onClick={() => handleSortingChange('mintCost')}
                className={`${sortConfig.key === "mintCost" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>Cost</th>
              <th rowSpan="2" onClick={() => handleSortingChange('totalhlx')}
                className={`${sortConfig.key === "totalhlx" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}> Total HLX</th>
              <th rowSpan="2" style={{ width: '150px' }}> Progress </th>
              <th rowSpan="2" className={minerType !== "claim" ? "action" : ""} style={{ width: '70px' }}>Share</th>
            </>
            ) : undefined}
            {minerType !== "ended" ? <th colSpan="3" className="miner_roi">Miner ROI</th> : undefined}
            {minerType !== "ended" ? <th rowSpan="2" style={{ width: '150px' }}> Progress </th> : undefined}
            {minerType !== "ended" ? <th rowSpan="2" className={minerType != "claim" ? "action" : ""} style={{ width: '70px' }}>Share</th> : undefined}
            {minerType == "claim" ? <th rowSpan="2" className="action" style={{ width: '100px' }}>Action</th> : undefined}
          </tr>
          <tr>
            <th onClick={() => handleSortingChange('length')}
              className={`${sortConfig.key === "length" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>Length</th>
            <th onClick={() => handleSortingChange('startDay')}
              className={`${sortConfig.key === "startDay" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>Start Day</th>
            <th onClick={() => handleSortingChange('endDay')}
              className={`${sortConfig.key === "endDay" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>End Day</th>
            <th onClick={() => handleSortingChange('mintPower')}
              className={`${sortConfig.key === "mintPower" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>Power</th>
            {minerType !== "ended" ? <th onClick={() => handleSortingChange('mintCost')}
              className={`${sortConfig.key === "mintCost" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>Cost</th> : undefined}

            {minerType !== "ended" ? <th onClick={() => handleSortingChange('value')} style={{ color: "#2FF712" }}
              className={`${sortConfig.key === "value" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>$ Value</th> : undefined}
            {minerType !== "ended" ? <th onClick={() => handleSortingChange('mintedHlx')} style={{ color: "#2FF712" }}
              className={`${sortConfig.key === "mintedHlx" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}>% ROI</th> : undefined}
          </tr>
        </thead>
        {
          <>
            <tbody>
              {data && data.length > 0 ?
                data.sort(sortData({ ...sortConfig })).map((val, ind) => (
                  <Tr key={ind} val={val} minertype={minerType} setTotalHlx={setTotalHlx} number={ind} />
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
                <td>Total ({data.length})</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {totalHlx.toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                </td>
                <td></td>
                <td></td>
                <td>${(totalHlx * hlx_to_usd).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</td>
                <td></td>
                <td></td>
                {type !== "ended" ? <td></td> : undefined}
                {type == "claim" ? <td></td> : undefined}

              </tr>
            </tfoot>

          </>
        }
      </table >
    </>
  );
};

export default Table;