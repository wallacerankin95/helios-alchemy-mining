import { useEffect, useState } from "react";
import { MdNotes } from "react-icons/md";
import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import HeaderName from "./HeaderName";
import logo from "../../../../assets/helius/2.png";
import { useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { HeliosAddress } from "../../../../const/const";
import heliosContract from "../../../../contract/helios.json";
import { toast } from "react-toastify";
import ContractDayTooltip from "../../../../common/tooltip/ContractDayTooltip";
import tooltipText from "../../../../assets/helius/tooltipText.json";

const headers = [
  { headerName: 'Dashboard', to: '/' },
  { headerName: 'Mine', to: 'mine' },
  { headerName: 'Stake', to: 'stake' },
  { headerName: 'Reward Pools', to: 'rewardpools' },
  { headerName: 'Burn Pools', to: 'burnpools' },
  { headerName: 'Stats', to: 'stats' },
  { headerName: 'Calculator', to: 'calculator' },
]

const Header = () => {
  const location = useLocation();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState('Dashboard');

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };
  const { isConnected, address } = useAccount();
  // const { chain } = useNetwork();

  /**
   *@description: getCurrentContractDay
   */
  const { data: currentDay } = useContractRead({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: 'getCurrentContractDay',
    watch: true,
  });
  /**
   *@description: get current Block timestamp
   */
  const { data: currentBlockTimeStamp } = useContractRead({
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

  const { write: manualUpdate } = useContractWrite({
    address: HeliosAddress,
    abi: heliosContract.abi,
    functionName: "manualDailyUpdate",
    args: [],
    onSuccess(data) {
      toast.success("Manual Updated Successfully");
    },
    onError(error) {
      toast.error(error.message.slice(0, 50) + "...", {
        autoClose: 2000,
      });
    },
  });

  const [currentContractDay, setCurrentContractDay] = useState(0);
  const [nextContractDay, setNextContractDay] = useState('');
  useEffect(() => {
    setCurrentContractDay(currentDay ? currentDay.toString() : 0);
    const cur_blocktime = currentBlockTimeStamp ? currentBlockTimeStamp.toString() : 0;
    const genesis_time = genesisTs ? genesisTs.toString() : 0;
    const calc_time = cur_blocktime - genesis_time;
    const date = new Date(calc_time * 1000); // Convert remaining seconds to date
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    setNextContractDay(`${hours}H:${minutes}M:${seconds}S`);


  }, [genesisTs, currentBlockTimeStamp, currentContractDay, currentDay]);

  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case '/': setSelectedHeader('Dashboard'); break;
      case '/mine': setSelectedHeader('Mine'); break;
      case '/stake': setSelectedHeader('Stake'); break;
      case '/rewardpools': setSelectedHeader('Reward Pools'); break;
      case '/burnpools': setSelectedHeader('Burn Pools'); break;
      case '/stats': setSelectedHeader('Stats'); break;
      case '/calculator': setSelectedHeader('Calculator'); break;
      default: break;
    }
  }, [location.pathname]);

  return (
    <>
      <NavWrapper className="bithu_header" id="navbar">
        <div className="bithu_menu_sect">
          <div className="bithu_menu_left_sect">
            <div className="bithu_menu_btns">

              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>
            </div>
            <div className="logo">
              <a href="https://helios-hlx.win">
                <img src={logo} alt="bithu nft logo" />
              </a>
            </div>
            <div className="bithu_menu_right_sect bithu_v1_menu_right_sect">
              <div className="bithu_menu_list">
                <ul>
                  {headers.map((header, index) =>
                    <HeaderName key={index} selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} headerName={header.headerName} to={header.to} />
                  )}
                  <li>
                    {/* <a href="https://gov.helios-hlx.win/" target="_blank" rel="noopener noreferrer"> */}
                    <a href="#">
                      Governance
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.helios-hlx.win/helios/" target="_blank" rel="noopener noreferrer">
                      Docs
                    </a>
                  </li>

                </ul>
              </div>

            </div>
          </div>

          <div className="connect_button">
            <ContractDayTooltip text={tooltipText.header}>
              <div className="header_pill_dropdown" onClick={() => manualUpdate({ from: address })}>
                <p className="pill_day" >Day {currentContractDay}</p>
                <p className="pill_hour_time">{nextContractDay}</p>
              </div>
            </ContractDayTooltip>
            <ConnectButton
              // label="Connect Wallet"
              chainStatus="none"//icon,name,none
              showBalance={false}//true,false
              accountStatus="address"//avatar,address,
              style={{ whiteSpace: "nowrap" }}
              className="connect_btn"
            />
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
      </NavWrapper>
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
