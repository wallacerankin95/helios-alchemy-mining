// import react from "react";
// import { useModal } from "../../../../utils/ModalContext";
import { BsXLg } from "react-icons/bs";
import logo from "../../../../assets/helius/logo.png";
import { Link } from "react-router-dom";
import MobileMenuStyleWrapper from "./MobileMenu.style";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const MobileMenu = ({ mobileMenuhandle }) => {
  // const { walletModalHandle } = useModal();
  // const [isSubmenu, setSubmenu] = useState(false);

  // const handleSubmenu = () => {
  //   setSubmenu(!isSubmenu);
  // };
  return (
    <MobileMenuStyleWrapper className="bithu_mobile_menu">
      <div className="bithu_mobile_menu_content">
        <div className="mobile_menu_logo">
          <img className="bithu_logo" src={logo} alt="bithu logo" />
          <button
            className="mobile_menu_close_btn"
            onClick={() => mobileMenuhandle()}
          >
            {" "}
            <BsXLg />{" "}
          </button>
        </div>
        <div className="bithu_mobile_menu_list">

          <ul>
            <li>
              <Link className="" to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/mine">Mine</Link>
            </li>
            <li>
              <Link to="/stake">Stake</Link>
            </li>
            <li>
              <Link to="/rewardpools">Reward Pools</Link>
            </li>
            <li>
              <Link to="/burnpools">Burn Pools</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <a href="https://helios-hlx.win" target="_blank" rel="noopener noreferrer">
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

        <ConnectButton
          label="Connect"
          chainStatus="none"//icon,name,none
          showBalance={false}//true,false
          accountStatus="address"//avatar,address,
        //className="connect_btn"
        />
        {/* <Button
          sm
          variant="hovered"
          className="connect_btn"
          onClick={() => walletModalHandle()}
        >
          <FaWallet /> Connect
        </Button> */}
      </div>
    </MobileMenuStyleWrapper>
  );
};

export default MobileMenu;
