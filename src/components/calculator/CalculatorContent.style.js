import styled from "styled-components";

const ClaculatorStyleWrapper = styled.div` 
    margin: auto;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 12px;
    .social_part {
        width: 100%;    
        margin-top: 20px;
        display: inline-block;
        justify-content: center;
        text-align : center;
        
        .button_functions {
            padding-bottom: 10px;
            button { 
                padding-top: 9px;
                padding-bottom: 9px;
                background-color: #BA3505;
                border: 1px solid #FE9C01;
                border-radius: 30px;
                font-weight: bold;
                color: white;
                cursor: pointer;
            }
        }
        
    }
    .calculator_container {
        width: 100%;
        display: inline-block;
        align-items: center;
        font-family: 'Cinzel', sans-serif;

    .v2_footer_logo {
        display: flex;
        width: 100%;
        justify-content: center;
        text-align: center;
        margin: 5px 0 40px 0;
        img{
            width: 70%;
            text-align: center;
            z-index: 1!important;
        }
    }
    
    .tab_container {
        padding: 0 30px 0 30px;
        background-color: #2b0200;
        display: block;
        border: 1pt solid #fff; 
        border-radius: 20px;
        font-family: 'Montserrat', sans-serif;
        
        .tab-list {
            text-align: center;
            width: 100%;
            height: 40px;
            display: flex;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            justify-content:center;
            font-size: 19px;
            margin: 0;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }
        .tab_content {
            width: 100%;
            margin-bottom:10px;
            // text-align: center;
            justify-content: center;
        }
        
    }
    
}

.tabs {
    width: fit-content;
    display: flex;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: center;
    align-items: center;
    background: #80808013;
    position: relative;
    cursor: pointer;
    padding: 5px 20px;
    margin: 0 3px -2px 0;
    font-weight: bold;
}

.tabs:hover {}

.tabs:not(:last-child) {}

.active-tabs {
    background-color: rgba(255, 255, 255, 0.3);
}

.active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 4px;
}

.content {
    // background-color: #4a1700;
    display: none;
    padding: 10px;
}

.active-content {
    position: relative;
    
    display: block;
    padding: 0;

}
}
}

    .miner_setting_group {
        padding: 10px 20px 10px 20px;
        .position_card_name_with_balance {
            .position_card_balance_miner {
                text-align: end;
            }
        }
        h3.summary_roi_title {
            color: #f4b940;
            font-family: 'Cinzel', sans-serif;
        }
        .miner_input_button{
            display: flex;
            width: 100%;
            padding: 10px 0 10px 0;

        }
        &:nth-child(2){
            border-bottom: 2px solid rgba(255,255,255,0.1);
        }
    }
    .total_miner_count {
        display: inline-block;
        width: 100%;
        text-align: center;
        justify-content: center;
        color: #2ff712;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        border-top: 2px solid rgba(255, 255, 255, 0.1);
        p.top {
            font-size: 23px;
            font-weight: bold;
            margin: 10px;
        }
        p.bottom {
            font-size: 27px;
            font-weight: bold;
            margin: 10px;
        }
    }
    .miner-container {
        position: relative;
        display: inline-flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        h3 {
            width: 70%;
            font-size: 19px;
        }
        .max_button {
            width: 60px;
            padding-top: 9px;
            padding-bottom: 9px;
            background-color: #BA3505;
            border: 1px solid #FE9C01;
            border-radius: 30px;
            font-weight: bold;
            color: white;
            cursor: pointer;
        }

        .count_input {
            width: 17%;
            margin-right: 1%;
            height: 15px;
            padding: 10px;
            border: 2px solid #fff;
            border-radius: 5px;
            outline: none;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .count_input:focus {
            border-color: #000;
        }

        .summary_roi {
            width: 100%;
        }
    

    }
    #miner_length {
        width: 25%; 
    }
    .share_details {
        display: flex;
        margin-left: 20px;
        .share_details_left {
            width: 70%;
            font-size: 17px;
            p {
                font-weight: bold;
                margin: 5px 0 5px 0;
            }
        }
        .share_details_right {
            width: 30%;
            font-size: 17px;
            text-align: right;
            p {
                font-weight: bold;
                margin: 5px 0 5px 0;
            }
        }
    }
    .total_payout_amount {
        display: flex;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 0;
        justify-content: space-between;
        .payouts_total_name {
            span {
                margin-right: 5px;
            }
        }
    }
    .summary_stake_content {
        margin-left: 20px;
        margin-top: 13px;
        .payouts_total_box {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #fff;
            margin-top: 10px;
            .payouts_total_name {
                font-style: italic;
                margin-bottom : 15px;

                span {
                    margin-right: 5px;
                }
            }
            .payouts_total_dollar {}
        }
        .summary_staker_payout {
            display: flex;
            
            .summary_staker_left {
                width: 70%;
                font-size: 19px;
                font-weight: bold;
                align-items: center;
            }
            .summary_staker_right {
                width: 30%;
                font-size: 22px;
                text-align: right;
                font-weight: bold;
                display: grid;
                grid-auto-rows: max-content;

                .dollar {
                    font-size: 13px;
                    margin: 0;
                }
                .ether {
                    font-size: 13px;
                    margin: 0;    
                }
                .titanx_amount_pool {
                    font-size: 13px;
                    margin: 0;
                }
            }
        }
    }
    .payouts_total_dollar_total{
        font-weight: bold;
    }
    .position_card_name_miner {
        text-align: end!important;
    }
    .position_card_name_miner {
        text-align: start!important;
    }
    .payouts_total_name_total {
        font-weight:bold;
    }
`;

export default ClaculatorStyleWrapper;