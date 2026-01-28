import styled from "styled-components";

const RewardContentStyleWrapper = styled.div`
    max-width: 1600px;
    margin: auto;
    padding: 12px 12px;

    .reward_container {
        position: relative;
        width: 100%;
        // padding-top: 18px;
        font-family: 'Cinzel', sans-serif;
        h2 {
            font-size: 32px;
            margin-top: 10px;
        }
        .assets_under_management {
            color: white;
        }
    }
    .rows {
        position: relative;
        width: 100%;
        display: flex;
        gap: 10px;
        justify-content: center;
        .cols {
            width: 50%;
            border-radius: 20px;
            border: 1pt solid #fff;
            background-color: #2b0200;
            font-family: 'Monserrat', sans-serif;

            // &:last-child {
            //     background-image:
            //         radial-gradient(
            //             circle at top right,
            //             rgba(235,236,14,1) 10%, rgba(119,102,53,1) 20%,
            //         #2b0200 25%
            //     );
            // }

            .reward_pool_cards {
                padding: 0 20px 20px 20px;
                h1.cycle_reward_pool {
                    text-align: center;
                    font-family: 'Cinzel', sans-serif;
                    color: #f4b940;
                    font-size: 25px;
                }
                .cards_contents {
                    padding: 10px 0 20px 0;
                    border-bottom: 1px solid hsla(0,0%,100%,.28);
                    h3 {
                        font-family: 'Montserrat', sans-serif;
                    }
                    .nextpayoutday_countdown{
                       padding: 10px 30px 5px 30px;

                       .nextpayoutday{
                            display: flex;
                            justify-content: space-between;
                            .nextpayoutday_title{
                                font-weight: bold;

                                span.number_next_day {
                                    color: #FE7B00;
                                }
                            }
                            .countdown_value {
                                color: #FE7B00;
                                font-weight: bold;
                            }
                       }
                       .count_down {
                            display: flex;
                            justify-content: space-between;
                       }
                    }
                    h1 {
                        font-family: 'Cinzel', sans-serif;
                        color: #f4b940;
                        font-size: 25px;
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                    h3 {
                        text-align: center;
                        font-size: 23px;
                    }
                    .card_content_rewards {
                        padding: 10px 30px 5px 30px;
                        font-family: 'Montserrat', sans-serif;
                    }
                    .progress_content {
                        width: 100%;
                        display: flex;
                        font-family: 'Montserrat', sans-serif;
                        .tooltip {
                            margin-left: 2px;
                            display: flex;
                        }
                
                        p.progress_text {
                            margin-top: 8px!important;
                            margin-bottom: 8px!important;
                        }
                
                        .progress_bar {
                            width: 97%;
                            align-items: center;
                            text-align: center;
                            justify-content: center;
                            display: flex;

                            div {
                                height: 14px!important;
                                div {
                                    height: 14px!important;
                                }
                            }
                        }
                    }
                    .reward_pool_btn_group {
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        gap: 20px;
                        margin-top: 20px;
                        .maxstaketooltip {
                            width: 50%;
                        }
                        .claimdisttooltip {
                            width: 50%;
                        }
                        .disttinethtooltip {
                            width: 50%;
                        }
                        .distpayouttooltip {
                            width: 50%;
                        }
                        .distribute_button {
                            width: 100%;
                            height: 45px;
                            border-radius: 30px;
                            border: 1px solid #FE9C01;
                            background-color: #BC3505;
                            font-weight: bold;
                            font-size: 16px;
                            font-family: 'Cinzel', sans-serif;
                            color: #fff;
                            &:hover {
                                box-shadow: 0 0 40px 0 rgba(255, 0, 0, 0.5);
                            }
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 768px) {
        .rows {
            display: block;
            .cols {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }

`;

export default RewardContentStyleWrapper;
