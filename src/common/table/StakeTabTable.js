import StakeTableHead from "./StakeTableHead";
import { useSortableTable } from "./useSortableTable";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaSkullCrossbones } from "react-icons/fa";
import { etherToFixed, HeliosAddress } from "../../const/const";
import { useContractWrite, useAccount } from "wagmi";
import heliosContract from "../../contract/helios.json";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const StakeTabTable = ({ data, type }) => {
  const [sortConfig, setSortConfig] = useState({ direction: 'ascending', key: '' });
  const [minerType, setMinerType] = useState("active");
  const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);

  useEffect(() => {
    setMinerType(type);
  }, []);

  const sortData = ({ direction = '', key = '' }) =>
    (a, b) => {
      if (key === "effshare") {
        const temp = "hlxAmount";
        if (etherToFixed(a[temp]) / etherToFixed(a["shares"]) < etherToFixed(b[temp]) / etherToFixed(b["shares"])) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (etherToFixed(a[temp]) / etherToFixed(a["shares"]) > etherToFixed(b[temp]) / etherToFixed(b["shares"])) {
          return direction === 'ascending' ? 1 : -1;
        }
      }
      if (key === "value") {
        const temp = "hlxAmount";
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
    };

  const handleSortingChange = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key)
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else {
        direction = 'ascending';
      }
    setSortConfig({ key, direction: direction });
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th rowSpan="2" className={`${sortConfig.key === "stakeId" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'} trank`}
              onClick={() => handleSortingChange('stakeId')}> StakedID </th>
            <th colSpan="3" >Stake Details</th>
            <th rowSpan="2" className={`${sortConfig.key === "hlxAmount" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}
              onClick={() => handleSortingChange('hlxAmount')}> HLX Staked </th>
            <th colSpan={minerType !== "ended" ? 3 : 2} >Stake Shares</th>
            <th rowSpan="2" style={{ width: '150px' }}> Progress </th>
            {minerType !== "ended" ? <th rowSpan="2" className="action" style={{ width: '100px' }}>Action</th> : undefined}
          </tr>
          <tr>
            <th className={`${sortConfig.key === "length" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}
              onClick={() => handleSortingChange('length')}>Length</th>
            <th className={`${sortConfig.key === "startDay" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}
              onClick={() => handleSortingChange('startDay')}>Start Day</th>
            <th className={`${sortConfig.key === "endDay" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}
              onClick={() => handleSortingChange('endDay')}>End Day</th>
            <th className={`${sortConfig.key === "effshare" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default green_font_color'}`}
              onClick={() => handleSortingChange('effshare')}>Eff. Share Rate	</th>
            <th className={`${sortConfig.key === "shares" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default'}`}
              onClick={() => handleSortingChange('shares')}>Shares</th>
            {minerType !== "ended" ? <th className={`${sortConfig.key === "value" ? sortConfig.direction === 'ascending' ? 'up' : 'down' : 'default green_font_color'}`}
              onClick={() => handleSortingChange('value')}>$ Value</th> : undefined}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.sort(sortData({ ...sortConfig })).map((item, index) => (
              <Tr key={index} val={item} minertype={minerType} />
            ))
          ) : (
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
            <td>
              {data && data.length > 0 ? (
                (() => {
                  let total = 0;
                  data.map((item) => {
                    total += etherToFixed(item.hlxAmount);
                  });
                  return total.toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 });
                })()
              ) : 0}
            </td>
            <td>

            </td>
            <td>
              {data && data.length > 0 ? (
                (() => {
                  let total = 0;
                  data.map((item) => {
                    total += etherToFixed(item.shares);
                  });
                  return total.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                })()
              ) : 0}
            </td>
            {type !== "ended" ? < td style={{ color: "#2ff712" }} >
              {data && data.length > 0 ? (
                (() => {
                  let total = 0;
                  data.map((item) => {
                    total += (etherToFixed(item.hlxAmount) * hlx_to_usd);
                  });
                  return "$" + total.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                })()
              ) : 0}
            </td> : null}
            {type !== "ended" ? <td></td> : null}
            <td></td>
          </tr>
        </tfoot>
      </table >
    </>
  )
}

const Tr = ({ val, minertype }) => {
  const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);
  const [type, setType] = useState(minertype);
  useEffect(() => {
    setType(minertype);
  }, [minertype]);

  const { isConnected, address } = useAccount();
  const [stakeId, setSetStakeId] = useState(0);

  useEffect(() => {
    if (stakeId !== 0) {
      write({ from: address });
    }
  }, [stakeId, address]);
  const { isLoading, write } = useContractWrite({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: "endStake",
    args: [stakeId],
    onSuccess(data) {
      toast.success("Successfully Ended.", { autoClose: 1000 });
    },
    onError(error) {
      toast.error(error.reason.slice(0, 150) + "...", {
        autoClose: 2000,
      });
    },
  });

  return (
    <tr>
      <td>{val.stakeId}</td>
      <td>{val.length}</td>
      <td>{`${new Date(val.startDay * 1000).getMonth() + 1
        }/${new Date(val.startDay * 1000).getDate()}/${new Date(
          val.startDay * 1000
        ).getFullYear()}`}</td>
      <td>{`${new Date(val.endDay * 1000).getMonth() + 1}/${new Date(
        val.endDay * 1000
      ).getDate()}/${new Date(
        val.endDay * 1000
      ).getFullYear()}`}</td>
      <td>{etherToFixed(val.hlxAmount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
      <td className="green_font_color">
        {parseFloat(
          etherToFixed(val.hlxAmount) / etherToFixed(val.shares)
        ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td>{etherToFixed(val.shares).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      {type !== "ended" ? <td className="green_font_color">
        ${(etherToFixed(val.hlxAmount) * hlx_to_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td> : undefined}
      <td style={{ paddingLeft: "3px", paddingRight: "3px" }}>
        <div className="progress_content">
          <ProgressBar
            className="progress_bar"
            completed={val.percentageDone}
            bgColor="linear-gradient(90deg, rgba(254,156,1,1) 13%, rgba(186,53,5,1) 87%)"
            isLabelVisible={false}
          />
          <p>{val.percentageDone + "%"}</p>
        </div>
      </td>
      {type !== "ended" ? <td style={{ paddingLeft: "7px", paddingRight: "7px" }}>
        <button
          className="table_claim_titanx_btn"
          disabled={!(val.claimable && isConnected && !isLoading)}
          onClick={() => setSetStakeId(val.stakeId)}
        >
          {isLoading ? "Loading..." : "End Stake"}
        </button>
      </td> : undefined}
    </tr>
  )
}
export default StakeTabTable;
