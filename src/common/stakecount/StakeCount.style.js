import styled from "styled-components";

const StakeCountWrapper = styled.div`
margin-bottom: 20px;
    .error_message {
        position: relative;
        display: inline-flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        p{
            position: relative;
            width: 100%;
            float: right;
            font-size: 12px;
            color: red;
            margin: 0 0 0 calc(15px + 70%);
        }
    }
    .miner-container {
        position: relative;
        display: inline-flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        .tooltip_header_text {
            padding-left: 15px;
            width: 70%;
            font-size: 19px;
            display: flex;
            text-align: center;
            align-items: center;
            h3{
                margin-right: 5px;
            }
            .tooltip{
                justify-content: center;
                align-items: center;
                text-align:center;
            }
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

    }
`;

export default StakeCountWrapper;
