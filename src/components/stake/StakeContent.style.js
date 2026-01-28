import styled from "styled-components";

const StakeContentStyleWrapper = styled.div`
    position: relative;
    margin: auto;
    max-width: 1600px;
    padding: 12px 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    .mine_container {
      position: relative;
      width: 100%;
      display: block;
    }
    .ether_subtitle {
      display: flex;
      height: 32px;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;
      margin-top: 20px;
      font-family: 'Cinzel', sans-serif;
      h2{
        font-size: 32px;
      }
      img {
        width: 30px;
      }
      p{
        display: none;
      }
    }
    .mine_top {
      position: relative;
      width: 100%;
      display: inline-flex;
      justify-content: center;
      items-align: center;
    }
    .mine_details {
      postion: relative;
      width: 49%;
      margin-left: 1%;
      border : 1pt solid #fff;
      background-color: #2b0200;
      border-radius: 10px;
      font-family: 'Montserrat', sans-serif;
      line-height: 1;

      .mine_details_subtitle {
        color: #f4b940;
        font-family: 'Cinzel', sans-serif;
        font-size: 25px;
      }
      .summary_estimated {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        
        p {
          margin-left: 5%;
        }
      }
      .titanx_details {
        width: 90%;
        margin-left: 5%;
        margin-bottom: 30px;
        p {
          margin-left: 5%;
        }
        .stake_share_bonus {
          padding-left: 20px;
          p {
            margin: 0;
            font-size: 20px;
          }
        }
      }
      .titanx_more_details {
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid rgba(255.255.5 255. 0.5);
        margin-bottom: 30px;

        .progress_p {
          display: flex;
          align-items: center;
        }
        div{
          margin-left: 5%;
          
          .progress_span {
            width: 90%;
          }
        
          .progress_bar {
            width: 100%;
            div {
              height: 10px!important;
              div {
                height: 10px!important;
              }
            }
          }
        }
      }
    }
    
    .tablist {
      position: relative;
      width: 49%;
      margin-right: 1%;
    }
    .tab_container {
        width: 100%;
        height: auto;
      }
      
      .tab-list {
        height: 40px;
        display: flex;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 19px;
        margin: 0;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
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

      .tabs:hover {
      }
      
      .tabs:not(:last-child) {
      }
      
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
        top: 20px;
        display: flex;
        padding: 0;
        
      }      
    }
  }
  .miner-cards-content {
    position: relative;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    border : 1pt solid #fff;
    background-color: #2b0200;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    /* background-image: linear-gradient(135deg,#470066,rgba(61,89,227,.1) 33%,transparent 50%,rgba(0,138,224,.149) 80%,rgba(0,147,80,.62)); */
  
  }
  .miner_cards {
    position: relative;
    width: 100%;
    margin: 0 auto; /* Add margin auto to center horizontally */
    h1 {
      font-family: 'Cinzel', sans-serif;
      color: #f4b940;
      font-size: 25px;
    }
  }
  .create_miner_btn {
    position: relative;
    width: 100%;
    margin-bottom: 20px; 

    button {
      position: relative;
      width: 100%;
      border-radius: 30px;
      border: 1px solid #FE9C01;
      font-weight: bold;
      color: white;
      font-size: 14px;
      height: 50px;
      background: #BA3505;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 40px 0 rgba(255, 0, 0, 0.5);
      }
    }
  }
  
  .claimable_miners {
    position: relative;
    width: 100%;
    display: block;
    
    h1 {
      margin: 0;
    }
  }
  .claimable_miners_title {
    display: flex;
    text-align: center;
    align-items: center;
    gap: 10px;
  }
  .batch_claim {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    button {
      width: 100%;
      border-radius: 30px;
      border: 1px solid #FE9C01;
      font-weight: bold;
      color: white;
      font-size: 14px;
      height: 50px;
      background: #ba3505;
      cursor: pointer;
    }
  }
  .no_data {
    width: 100%;
    display: block;
    gap: 20px;
    font-size: 30px;
    text-align: center;
  }
  tbody > tr.nodata_table_body {
    text-align: center;
    height: 200px;
    font-size: 40px;
  }
  table.table {
    min-width: 1200px;
    background-color: #2b0200;
    color: #fff;
  }
  @media (max-width: 953px) {    
    .ether_subtitle {
      font-family: 'Cinzel', sans-serif;
      height: 50px;

        h2{
          font-size: 32px;
          display: none;
        }
  
        img {
          width: 30px;
          display: none;
        }
        p{
          display: flex;
          font-family: 'Cinzel', sans-serif;
          font-size: 32px;
          font-weight: bold;
          color: #fff;
        }
      
    }
  }
  @media (max-width: 913px) {
    .mine_top {
      display: block;
    }
    .tablist {
      width: 100%;
    }
    .mine_details {
      width: 100%;
      margin-top: 40px;
      margin-left: 0;
      margin-bottom: 30px;
    }
  }
  @media (max-width: 500px) {
    .tab-list {
      height: 30px;
      font-size: 12px;
    }

  }
  @media (max-width: 370px) {
    .tabs {
      padding: 5px 10px;
    }
  }
  @media (max-width: 280px) {
    .tabs {
      padding: 5px 2px;
    }
  }
  @media (max-width: 337px) {
    .ether_subtitle > h2 {
      padding-top: 50px;
    }
    .mine_top {
      margin-top: 75px;
    }
  }
`;

export default StakeContentStyleWrapper;
