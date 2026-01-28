import RewardModalWrapper from "./RewardModals.style";

const RewardRightModal = ({ show, close, data }) => {
    return (
        <RewardModalWrapper>
            <div className={`modalContainer ${show ? "show" : ""} `}>
                <div className="modal">
                    <header className="modal_header">
                        <h2 className="modal_header-title"> Active Miner ROI </h2>
                        <button className="close" onClick={() => close()}>
                            X
                        </button>
                    </header>
                    <main className="modal_content">
                        <div className="content_container">
                            <div className="children_container">
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name">
                                        <h5>Est.HLX</h5>
                                    </div>
                                    <div className="position_card_balance">
                                        <h5 className="span_right">
                                            fff
                                        </h5>
                                    </div>
                                </div>
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name">
                                        <h5>hRannk Bonus</h5>
                                    </div>
                                    <div className="position_card_balance">
                                        <h5 className="span_right">
                                            fff
                                        </h5>
                                    </div>
                                </div>
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name">
                                        <h5>Cost</h5>
                                    </div>
                                    <div className="position_card_balance">
                                        <h5 className="span_right">
                                            ffff
                                        </h5>
                                    </div>
                                </div>
                                <div className="position_card_name_with_balance">
                                    <div className="position_card_name">
                                        <h5>$Market Value</h5>
                                    </div>
                                    <div className="position_card_balance">
                                        <h5 className="span_right">
                                            fff
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            <div className="children_container">
                                <div className="top">Est.ROI %</div>
                                <div className="bottom">+ %</div>
                            </div>
                        </div>
                    </main>
                    <footer className="modal_footer">
                        <button className="modal-close">Download</button>

                        <button className="submit">Tweet</button>
                    </footer>
                </div>
            </div>
        </RewardModalWrapper>
    );
};

export default RewardRightModal;