import styled from "styled-components";

const ShareModalWrapper = styled.div`

    z-index: 999;
    .shareContainer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        // background-color: rgba($color: #000000, $alpha: 0.35);
    
        display: flex;
        justify-content: center;
        align-items: center;
    
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;

        .share {
            width: 25vw;
            height: auto;
            padding: 0.7rem;
            border-radius: 20px;
            background-color: #fff;
            backdrop-filter: blur(5px);
            box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
            
            &_header {
                position: relative;
                border: 2px solid #f35000;
                border-bottom: 1px solid #fff;
                background-color: #2b0200;
                text-align:center;
                img{
                    max-width: 80%;
                    margin-top: 30px;
                }
                &-title {
                  text-align: center;
                }
          
                .close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    border: none;
                    background-color: transparent;
                    margin: 0;
                    font: inherit;
                    color: white;
                    cursor: pointer;

                    img {
                        width: 1rem;
                        height: auto;
                        transition: all 0.3s;
                    }
                    &:hover {
                        img {
                        transform: scale(1.1);
                        }
                    }
                }
            }
        
            &_content {
                background-color: #2b0200;
                border-bottom: 1px solid #fff;
                border-left: 2px solid #f35000;
                border-right: 2px solid #f35000;
                border-bottom: 2px solid #f35000;
                padding: 2rem 0;
                display: flex;
                text-align: center;
                line-height: 1.2;

                .content_container {
                    width: 100%;

                    .children_container {
                        width: 95%;
                        display: inline-block;
                        justify-content: center;
                        align-items: center;
                        border-bottom: 1px solid #fff;
                        .position_card_name_with_balance{
                            .position_card_name {
                                h5 {
                                    font-size: 20px;
                                    margin: 5px 0 5px 0;
                                }
                            }
                            .position_card_balance {
                                h5.span_right {
                                    margin: 5px 0 5px 0;
                                }
                            }
                        }
                        
                        &:last-child {
                            border-bottom: none;
                        }
                        div.top {
                            font-size: 29px;
                            margin-top: 10px;
                            font-weight: bold;
                            color: rgb(47, 247, 18);
                        }
                        div.bottom {
                            font-size: 29px;
                            font-weight: bold;
                            color: rgb(47, 247, 18);
                        }
                    }
                }
            }
        
            &_footer {
                width: 50%;
                display: flex;
                margin-left: 23%;
                margin-top: 10px;
        
            button {
                float: right;
                padding: 0.5rem;
                margin-left: 1%;
                text-align: center;
                border-radius: 8px;
            }
            .share-close {
                width: 100%;
                text-wrap: nowrap;
                border-radius: 20px;
                border: 1px solid #FE9C01;
                font-weight: bold;
                color: white;
                font-size: 12px;
                background: #BA3505;
                height: 40px;
                cursor: pointer;
            
                // &:hover {
                // }
            }
                .submit {
                    width: 100%;
                    text-wrap: nowrap;
                    border-radius: 20px;
                    border: 1px solid #FE9C01;
                    font-weight: bold;
                    color: white;
                    font-size: 12px;
                    background: #BA3505;
                    height: 40px;
                    cursor: pointer;
                }
        
                // &:hover {
                // }
            }
        }
    }
}
.green_font_color {
    color: #2ff712;
}
.shareContainer.show {
    visibility: visible;
    opacity: 1;
    z-index: 999;

    .share {
    transform: translateY(0);
    }
}
`;
export default ShareModalWrapper;