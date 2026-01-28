import styled from "styled-components";

const RewardModalWrapper = styled.div`

    z-index: 999;

    .modalContainer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Montserrat', sans-serif;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s ease;
        color: white;
        transparent: 70%;
        .modal {
            width: 45vw;
            height: auto;
            padding: 2rem;
            border-radius: 20px;
            background: radial-gradient(circle, #5b1b03, #bb5400); /* Outer: #5b1b03, Inner: #bb5400 */
            border:2px solid rgb(254, 156, 1);
            box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);

            &_header {
                position: relative;
                text-align:center;
                .header_top, .header_bottom {
                    font-size: 36px;
                    font-weight: bold;
                }
            }
        
            &_content {
                display: flex;
                text-align: center;
                margin: 25px 0 0 0;
                font-weight: bold;
                font-size: 26px;
                padding-bottom: 20px;
                .content_container {
                    width: 100%;
                    .counter_box {
                        .token_counter{
                            display: flex; 
                            
                            text-align: center;
                            justify-content : space-between;
                            align-items: center;
                            .token_counter_name {
                                display: flex;
                                text-align: center;
                                justify-content: center;
                                align-items: center;
                                img {
                                    margin-top: 10px;
                                    margin-right: 5px;
                                    width: 34px;
                                }
                            }                           
                        }
                        .dollar_counter {
                            display: flex;
                            width: 100%;
                            justify-content: end;
                        }
                    }
                    .counter_box:nth-child(1) {
                        padding-bottom: 20px;
                        border-bottom : 2px solid rgba(255, 255, 255, 0.48);
                    }
                    .counter_box:nth-child(2) {
                        margin-top: 15px;
                    }
                }
                
            }
        
            &_footer {
                display: flex;
                justify-content : center;
                button{
                    border-radius: 30px;
                    border:2px solid rgb(254, 156, 1);
                    height: 50px;
                    padding: 0 30px 0 30px;
                    background: rgb(188, 53, 5);
                    color: #fff;
                    font-weight: bold;
                    font-size: 18px;
                }
            }           
        }
    }
}
          
.modalContainer.show {
    visibility: visible;
    opacity: 1;
    z-index: 999;

    .modal {
    transform: translateY(0);
    }
}
`;
export default RewardModalWrapper;