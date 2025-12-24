import RewardModalRightWrapper from "./RewardRightModal.style";
import ethereumIcon from "../../assets/helius/ethicon-min.png";

const ClaimDistModal = ({ show, close, data }) => {
    const handleCloseModal = (event) => {
        if (!event.target.closest(".modal")) {
            close();
        }
    };
    return (
        <RewardModalRightWrapper>
            <div className={`modalContainer ${show ? "show" : ""} `}
                onMouseDown={handleCloseModal}
            >
                <div className="modal">
                    <header className="modal_header">
                        <div className="header_top">Claim ETH from TITANX Staking</div>
                    </header>
                    <main className="modal_content">
                        <div className="content_container">
                            <div className="counter_box">
                                <div className="token_counter">
                                    <div className="token_counter_name">
                                        <span>
                                            <img src={ethereumIcon} alt="" /></span>
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
                        <button>CLAIM & DISTRIBUTED</button>
                    </footer>
                </div>
            </div>
        </RewardModalRightWrapper>
    );
};

export default ClaimDistModal;