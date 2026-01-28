import RewardModalWrapper from "./RewardModals.style";
import ethereumIcon from "../../assets/helius/ethicon-min.png";
const DistPayoutModal = ({ show, close }) => {

    const handleCloseModal = (event) => {
        if (!event.target.closest(".modal")) {
            close();
        }
    };
    return (
        <RewardModalWrapper>
            <div className={`modalContainer ${show ? "show" : ""} `}
                onMouseDown={handleCloseModal}
            >
                <div className="modal">
                    <header className="modal_header">
                        <div className="header_top">Distributes Payout Pool to Users</div>
                    </header>
                    <main className="modal_content">
                        <div className="content_container">
                            <div className="counter_box">
                                <div className="token_counter">
                                    <div className="token_counter_name">
                                        <span><img src={ethereumIcon} alt="" /></span>
                                        <span>To Be Distributed</span>
                                    </div>
                                    <div className="token_value">0 ETH</div>
                                </div>
                                <div className="dollar_counter">=$ 0</div>
                            </div>
                            <div className="counter_box">
                                <div className="token_counter">
                                    <div className="token_counter_name">
                                        <span><img src="https://assets.coingecko.com/coins/images/32762/standard/TitanXpng_%281%29.png?1704456654 " alt="" /></span>
                                        <span>To Be Distributed</span>
                                    </div>
                                    <div className="token_value">0 TITANX</div>
                                </div>
                                <div className="dollar_counter">=$ 0</div>
                            </div>
                            <div className="counter_box">
                                <div className="token_counter">
                                    <div className="token_counter_name">
                                        <span>User Reward</span>
                                    </div>
                                    <div className="token_value">0 TITANX</div>
                                </div>
                                <div className="dollar_counter">=$ 0</div>
                            </div>
                        </div>
                    </main>
                    <footer className="modal_footer">

                        <button>DISTRIBUTE PAYOUTS</button>
                    </footer>
                </div>
            </div>
        </RewardModalWrapper>
    );
};

export default DistPayoutModal;