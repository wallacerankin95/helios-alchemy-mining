import footerLogo from "../../../../../assets/helius/logo.png";
import backToTopIcon from "../../../../../assets/helius/back_to_top.svg";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterBottomStyleWrapper from "./FooterBottom.style";
const FooterBottom = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth behavior for smooth scrolling
    });
  };
  return (
    <FooterBottomStyleWrapper className="bithu_v2_main_footer">
      <div className="v2_main_footer">
        <div className="v2_footer_menu">
          <div className="v2_footer_logo">
            <Link to="/">
              <img src={footerLogo} alt="bithu nft logo" />
            </Link>
          </div>
          <div className="bottom_footer_menulist">
            <ul>
              <li>
                <a href="https://x.com/Helios_HLX" target="_blank">
                  <svg className="social-icon" stroke="currentColor" href="" target="_blank" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="35px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg></a>
              </li>
              <li>
                <a href="http://t.me/Helios_HLX" target="_blank"><FaTelegram /></a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC3K1rnId_e_9Rw7lCFLxhFQ" target="_blank"><FaYoutube /></a>
              </li>
            </ul>
          </div>


        </div>
        <div className="v2_footer_copiright_text">
          <p>Usage of DApp is at your own risk. Information is provided as-is with current market conditions at the time of generation. Investing in cryptocurrencies is speculative and can result in loss; we advise doing your own research and consulting professionals. Helios specific content is protected by copyright, with all rights reserved by Helios. We bear no responsibility for external links. Helios is not liable for any losses or damages from using this DApp. We may change or discontinue the DApp at our discretion without notice. Use of this DApp constitutes acceptance of these terms.</p>
        </div>
        <button className="bact_to_top_btn" onClick={handleClick}>
          <img src={backToTopIcon} alt="bithu nft back to top" />
        </button>
      </div>
      <span className="v2_footer_shapes_left">
        {/* <img src={footerShapesLeft} alt="bithu nft footer" /> */}
      </span>
      <span className="v2_footer_shapes_right">
        {/* <img src={footerShapesRight} alt="bithu nft footer" /> */}
      </span>
    </FooterBottomStyleWrapper>
  );
};

export default FooterBottom;
