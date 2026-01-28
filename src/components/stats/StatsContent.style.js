import styled from "styled-components";

const StatsContentStyleWrapper = styled.div`
    position: relative;
    margin: auto;
    max-width: 1600px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 12px;
    padding-top: 15px;
    .ether_subtitle {
      img.helius_icon {
        margin-top: 15px;
        margin-right: 10px;
        width: 35px;
        height: 35px;
      }
      img.eth_icon {
        margin-top: 25px;
        margin-right: 10px;
        width: 35px;
        height: 35px;
      }
      h2 {
        margin-top: 10px;
        font-size: 32px;
      }
    }
    .mine_container {
      position: relative;
      width: 100%;
      display: block;
      font-family: 'Cinzel', sans-serif;

      h1 {
        font-family: 'Cinzel', sans-serif;
      }
    }
    .mine_top {
      position: relative;
      width: 100%;
      display: inline-flex;
      justify-content: center;
      items-align: center;
      gap: 20px;
    }
    .mine_details {
      postion: relative;
      width: 50%;
      background-color: #2b0200;
      border: 1pt solid #fff;
      border-radius: 20px;
      font-family: 'Montserrat', sans-serif;
    }
    
    .tablist {
      position: relative;
      width: 50%;
      height: 500px;
      background-color: #2b0200;
      border: 1pt solid #fff;
      border-radius: 20px;   
      font-family: 'Montserrat', sans-serif;
    }
  }
  
  .miner_cards {
    position: relative;
    width: 95%;
    margin: 0 auto; /* Add margin auto to center horizontally */
    h1 {
      font-family: 'Cinzel', sans-serif;
      color: #f4b940;
      font-size: 25px;
    }
  }
  .card_top {
    display: block;
    justify-content: center;
  }

  .top_title {
    position: relative;
    width: 95%;
    margin-left: 2.5%;
    h1 {
      font-family: 'Cinzel', sans-serif;
      color: #f4b940;
      font-size: 25px;
    }
   }
   .top_content {
        width: 85%;
        margin-left: 7.5%;
        border-bottom: 2px solid hsla(0,0%,100%,.17);
        padding-bottom: 20px;
   }
   .bottom_content {
        width: 85%;
        margin-left: 7.5%;
        padding-bottom: 20px;
   }
  @media(max-width: 768px) {
    .mine_top {
      display: block;
    }
    .tablist {
      width: 100%;
      margin-bottom: 20px;
    }
    .mine_details {
      width: 100%;
    }
  }
`;

export default StatsContentStyleWrapper;
