import ShareModalWrapper from "./ShareModal.style";
import heliosBrand from "../../assets/helius/share.png";
import { etherToFixed } from "../../const/const";
import html2canvas from 'html2canvas';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Modal = ({ show, close, data, estimateReward, hlxPrice, titanPrice }) => {
  const modalRef = useRef(null);
  const titanx_to_usd = useSelector((state) => state.price.titanx_to_usd); // Fetch the value of TitanX price from redux
  const hlx_to_usd = useSelector((state) => state.price.hlx_to_usd);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close(); // Close the modal if clicked outside of it
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, close]);
  const takeScreenshot = () => {
    const elementToDownload = document.querySelector('.share');

    html2canvas(elementToDownload).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'summary_staker_right.png';
      a.click();
    });
  };

  const tweetClicked = () => {
    window.open("https://twitter.com/intent/tweet?text=Check%20out%20the%20stats%21%0A%23HELIOS%20%24HLX%20%23TITANX%20%24TITANX%20%23BuildOnTitanX");
  }

  return (
    <ShareModalWrapper>
      <div className={`shareContainer ${show ? "show" : ""} `}>
        <div className="share" ref={modalRef}>
          <header className="share_header">
            <img src={heliosBrand} alt="" />
            <h2 className="share_header-title"> Active Miner ROI </h2>
            <button className="close" onClick={() => close()}>
              X
            </button>
          </header>
          <main className="share_content">
            <div className="content_container">
              <div className="children_container">
                <div className="position_card_name_with_balance">
                  <div className="position_card_name">
                    <h5>Cost</h5>
                  </div>
                  <div className="position_card_balance">
                    <h5 className="span_right">
                      {(etherToFixed(data.mintCost) + etherToFixed(data.titanBurned)).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })} TITANX
                    </h5>
                  </div>
                </div>
                <div className="position_card_name_with_balance">
                  <div className="position_card_name">
                    <h5>Est. HLX</h5>
                  </div>
                  <div className="position_card_balance">
                    <h5 className="span_right">
                      {(parseInt(data.status) === 0
                        ? etherToFixed(data.mintableHlx)
                        : etherToFixed(data.mintedHlx)
                      ).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                    </h5>
                  </div>
                </div>
                <div className="position_card_name_with_balance">
                  <div className="position_card_name">
                    <h5 className="green_font_color">hRank Bonus</h5>
                  </div>
                  <div className="position_card_balance">
                    <h5 className="span_right green_font_color">
                      {(parseInt(data.status) !== 0
                        ? (etherToFixed(data.mintedHlx) + etherToFixed(data.penalty)) -
                        etherToFixed(data.mintableHlx)
                        : parseFloat(
                          etherToFixed(
                            estimateReward ? estimateReward.toString() : 0
                          )
                        ) -
                        parseFloat(etherToFixed(data.mintableHlx)) * 2
                      ).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                    </h5>
                  </div>
                </div>
                <div className="position_card_name_with_balance">
                  <div className="position_card_name">
                    <h5 className="green_font_color">$ Market Value</h5>
                  </div>
                  <div className="position_card_balance">
                    <h5 className="span_right green_font_color">
                      ${(hlxPrice * etherToFixed(data.mintableHlx)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="children_container">
                <div className="position_card_name_with_balance">
                  <div className="position_card_name">
                    <h5>Start Day</h5>
                  </div>
                  <div className="position_card_balance">
                    <h5 className="span_right">{`${new Date(data.startDay * 1000).getMonth() + 1
                      }/${new Date(data.startDay * 1000).getDate()}/${new Date(
                        data.startDay * 1000
                      ).getFullYear()}`}</h5>
                  </div>
                </div>
                <div className="position_card_name_with_balance">
                  <div className="position_card_name">
                    <h5>End Day</h5>
                  </div>
                  <div className="position_card_balance">
                    <h5 className="span_right">{`${new Date(data.endDay * 1000).getMonth() + 1}/${new Date(
                      data.endDay * 1000
                    ).getDate()}/${new Date(
                      data.endDay * 1000
                    ).getFullYear()}`}</h5>
                  </div>
                </div>
              </div>
              <div className="children_container">
                <div className="top">Est. ROI %</div>
                <div className="bottom">{(((etherToFixed(data.mintableHlx) * hlx_to_usd +
                  (parseInt(data.status) !== 0
                    ? etherToFixed(data.mintedHlx.toString()) +
                    etherToFixed(data.penalty.toString()) -
                    etherToFixed(data.mintableHlx.toString())
                    : parseFloat(
                      etherToFixed(estimateReward ? estimateReward : 0)
                    ) -
                    parseFloat(etherToFixed(data.mintableHlx.toString())) * 2) *
                  hlx_to_usd) / ((etherToFixed(data.mintCost) +
                    parseFloat(etherToFixed(data.titanBurned))) *
                    titanx_to_usd) - 1) * 100) > 0 ? `+${(((etherToFixed(data.mintableHlx) * hlx_to_usd +
                      (parseInt(data.status) !== 0
                        ? etherToFixed(data.mintedHlx.toString()) +
                        etherToFixed(data.penalty.toString()) -
                        etherToFixed(data.mintableHlx.toString())
                        : parseFloat(
                          etherToFixed(estimateReward ? estimateReward : 0)
                        ) -
                        parseFloat(etherToFixed(data.mintableHlx.toString())) * 2) *
                      hlx_to_usd) / ((etherToFixed(data.mintCost) +
                        parseFloat(etherToFixed(data.titanBurned))) *
                        titanx_to_usd) - 1) * 100).toFixed(2)}` : (((etherToFixed(data.mintableHlx) * hlx_to_usd +
                          (parseInt(data.status) !== 0
                            ? etherToFixed(data.mintedHlx.toString()) +
                            etherToFixed(data.penalty.toString()) -
                            etherToFixed(data.mintableHlx.toString())
                            : parseFloat(
                              etherToFixed(estimateReward ? estimateReward : 0)
                            ) -
                            parseFloat(etherToFixed(data.mintableHlx.toString())) * 2) *
                          hlx_to_usd) / ((etherToFixed(data.mintCost) +
                            parseFloat(etherToFixed(data.titanBurned))) *
                            titanx_to_usd) - 1) * 100).toFixed(2)}{" "} %</div>
              </div>
            </div>
          </main>
          <footer className="share_footer">
            <button className="share-close" onClick={takeScreenshot}>Download</button>

            <button className="submit" onClick={tweetClicked}>Tweet</button>
          </footer>
        </div>
      </div>
    </ShareModalWrapper>
  );
};

export default Modal;