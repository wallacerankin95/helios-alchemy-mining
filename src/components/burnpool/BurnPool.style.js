import styled from "styled-components";
import BurnPoolCardBG from "../../assets/helius/fire.png"

const ContentStyleWrapper = styled.div`
    margin: auto;
    max-width: 1600px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 12px;

    .dashboard_container {
        width: 95%;
        display block;
        // padding-top: 18px;
        .ether_subtitle {
            font-family: 'Cinzel', sans-serif;
            h2 {
                font-size: 32px;
            margin-top: 10px;
            }
        }
    }
    .modal_text {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align:center;
        p{
            width: 80%;
            font-size: 20px;
            text-align: center;
        }
    }
    .row {
        position: relative;
        display: inline-flex;
        width: 100%;
        gap: 20px;
        
        .col {
            padding: 4px;
            aspect-ratio: 1.38;
            background-color: #2b0200;
            background-image: url(${BurnPoolCardBG});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            width: 50%;
            border: 1pt solid #fff;
            border-radius: 20px;
            line-height: 1.2!important;

            .burnpool_cards {
                width: 100%;
                height: 100%;
                max-height: 100%; 
                display: flex;
                justify-content: center;
                flex-direction: column;
            

                .burnpool_card_title {
                    font-family: 'Cinzel', sans-serif;
                    font-weight: bold;
                    font-size: 25px;
                    text-align: center;
                    margin-top: 10px; margin-bottom: 10px;
                    color: #f4b940;
                }
                .burnpool_cards_content {
                    padding: 20px 85px 20px 85px;
                    margin-bottom: 30px;

                    .burnpool_cards_counter{
                        display: block;
                        padding: 20px 30px 0 30px;
                        .counter_name{
                            justify-content: start;
                            font-size: 22px;
                            font-weight: bold;
                            font-family: 'Cinzel', sans-serif;
                        }
                        .counter_titanx{
                            width: 100%;
                            display: flex;
                            float: right;
                            justify-content: end;
                            gap: 20px;
                            margin-top: -27px;
                            color: #fe9c01;
                            font-size: 20px;
                            font-weight: bold;
                            font-family: 'Cinzel', sans-serif;
                        }
                        .counter_eth{
                            width: 100%;
                            display: flex;
                            justify-content: end;
                            gap: 20px;
                            font-size: 18px;
                            color: #fe9c01;
                            margin-top: 10px;
                        }
                        .counter_usd {
                            display: flex;
                            justify-content: end;
                            width: 100%;
                            float: right;
                            font-size: 14px;
                            margin-top: 10px;
                        }
                    }
                }
                .trigger_btn {
                    text-align: center;
                    margin-bottom: 20px;
                    button {
                        width: 50%;
                        background: #ba3505;
                        height: 50px;
                        color: #fff;
                        font-size: 20px;
                        font-weight: bold;
                        border-radius: 40px;
                        border: 1px solid #fe9c01;
                        &:hover {
                            box-shadow: 0 0 40px 0 rgba(255, 0, 0, 0.5);
                        }
                    }
                }
                .timer_text {
                    width: 100%;
                    text-align: center;
                    margin: 0;
                    font-weight: bold;
                    color: white;
                    font-family: 'Montserrat', sans-serif;
                }
            }
            
        }
    }
    @media (max-width: 1320px) {
        .burnpool_cards {
            .burnpool_card_title {
                font-size: 24px!important;
            }
            .burnpool_cards_content{
                .burnpool_cards_counter{
                    .counter_name{
                        font-size: 16px!important;
                    }
                    .counter_titanx{
                        font-size: 14px!important;
                    }
                    .counter_eth {
                        font-size: 12px!important;
                    }
                    .counter_usd {
                        font-size: 12px!important;
                    }
                }
            }
        }
    }
    @media (max-width: 1056px) {
        .burnpool_cards_content {
            margin-bottom: 0!important;
        }
    }
    @media (max-width: 972px) {
        .row {
            display: flex;
            .col {
                width: 99%;
                margin-bottom: 20px;
                .burnpool_cards {
                    .burnpool_card_title {
                        font-size: 30px;
                    }
                    // .burnpool_cards_content{
                    //     margin-bottom: 20px!important;
                    //     .burnpool_cards_counter{
                    //         .counter_name{
                    //             font-size: 24px!important;
                    //         }
                    //         .counter_titanx{
                    //             font-size: 24px!important;
                    //         }
                    //         .counter_eth {
                    //             font-size: 20px!important;
                    //         }
                    //         .counter_usd {
                    //             font-size: 14px!important;
                    //         }
                    //     }
                    // }
                }
            }
        }
    }
    @media (max-width: 768px) {
        .row {
            display: block;
        }
        .burnpool_cards {
            scale: 0.8;
            
            .burnpool_cards_content {
                padding: 20px 0px 20px 0px!important;
                .burnpool_cards_counter {
                    padding: 0!important;
                }
            }
        }
    }
    @media (max-width: 580px) {
        .burnpool_cards {
            .burnpool_card_title {
                font-size: 18px!important;
            }
            .burnpool_cards_content{
                margin-bottom: 20px!important;
                .burnpool_cards_counter{
                    .counter_name{
                        font-size: 20px!important;
                    }
                    .counter_titanx{
                        font-size: 20px!important;
                    }
                    .counter_eth {
                        font-size: 16px!important;
                    }
                    .counter_usd {
                        font-size: 14px!important;
                    }
                }
            }
        }
    }
    @media (max-width: 515px) {
        .burnpool_cards {
            .burnpool_card_title {
                font-size: 24px!important;
            }
            .burnpool_cards_content{
                margin-bottom: 20px!important;
                .burnpool_cards_counter{
                    .counter_name{
                        font-size: 18px!important;
                    }
                    .counter_titanx{
                        font-size: 18px!important;
                    }
                    .counter_eth {
                        font-size: 15px!important;
                    }
                    .counter_usd {
                        font-size: 13px!important;
                    }
                }
            }
        }
    }
    @media (max-width: 425px) {
        .burnpool_cards {
            margin-bottom: 5px;
            .burnpool_card_title {
                font-size: 20px!important;
            }
            .burnpool_cards_content{
                margin-bottom: 20px!important;
                .burnpool_cards_counter{
                    .counter_name{
                        font-size: 14px!important;
                    }
                    .counter_titanx{
                        font-size: 14px!important;
                    }
                    .counter_eth {
                        font-size: 10px!important;
                    }
                    .counter_usd {
                        font-size: 10px!important;
                    }
                }
            }
        }
        .trigger_btn {
            text-align: center;
            margin-bottom: 0 !important;
            button {
                width: 50%;
                background: #ba3505;
                height: 20px!important;
                color: #fff;
                font-size: 14px!important;
                font-weight: bold;
                border-radius: 40px;
                border: 1px solid #fe9c01;
            }
        }
    }
    @media (max-width: 375px) {
        .burnpool_cards {
            margin-bottom: 5px;
            .burnpool_card_title {
                font-size: 20px!important;
            }
            .burnpool_cards_content{
                margin-bottom: 20px!important;
                .burnpool_cards_counter{
                    .counter_name{
                        font-size: 14px!important;
                    }
                    .counter_titanx{
                        font-size: 14px!important;
                    }
                    .counter_eth {
                        font-size: 10px!important;
                    }
                    .counter_usd {
                        font-size: 10px!important;
                    }
                }
            }
        }
        .trigger_btn {
            text-align: center;
            margin-bottom: 0 !important;
            button {
                width: 50%;
                background: #ba3505;
                height: 20px!important;
                color: #fff;
                font-size: 14px!important;
                font-weight: bold;
                border-radius: 40px;
                border: 1px solid #fe9c01;
            }
        }
    }
    .buyburntooltip {
        width: 100%;
    }
`;

export default ContentStyleWrapper;
