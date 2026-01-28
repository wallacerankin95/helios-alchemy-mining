import styled from "styled-components";
import arrow_up from "../../assets/helius/up_arrow.png";
import arrow_down from "../../assets/helius/down_arrow.png";
import default_sort from "../../assets/helius/default.png";

const CustomDataTableWrapper = styled.div`

  position: relative;
  width: 100%;
  
  .table_container {
    position: relative;
    width: 100%;
    /* max-height: 500px; */
    margin: 0 auto;
    overflow: auto;
  }
  
  table.table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 14px;
    color: #f4b940!important;
    background-color: #2b0200;
    font-family: 'Montserrat', sans-serif;
  }
  .trank {
    border-top-left-radius: 10px;
  }
  .action {
    border-top-right-radius: 10px;
  }
  .table th {
    background: hsla(270,4%,53%,.1);
    padding: 8px 10px;
    font-weight: bold;
    text-align: center;
  }
  .table {
    .table_claim_titanx_btn {
      width: 100%;
      text-wrap: nowrap;
      border-radius:20px;
      border: 1px solid #FE9C01;
      font-weight: bold;
      color: white;
      font-size: 12px;
      background: #BA3505;
      height: 30px;
      cursor: pointer;
    }
    .table_share_btn {
      width: 100%;
      text-wrap: nowrap;
      border-radius:20px;
      border: 1px solid #FE9C01;
      font-weight: bold;
      color: white;
      font-size: 12px;
      background: #BA3505;
      height: 30px;
      cursor: pointer;
    }
    .progress_content {
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      .progress_bar {
        text-align:center;
        width: 80%;
        margin-right: 5px;
        div: first-child {
          height: 10px!important;

        }
        
      }
      p{
        width: 20%;
        font-size: 15px;
      }
    }
  }
  
  .table th.up {
    background-image: url(${arrow_up});
  }
  .table th.down {
    background-image: url(${arrow_down});
  }
  .table th.default {
    background-image: url(${default_sort});
  }
  th.up,
  th.default,
  th.down {
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center right;
  }
  
  .table td {
    border-top: 1px solid hsla(0,0%,100%,.15);
    padding: 8px 20px;
  }
  
  .table tbody tr:first-child td {
    border-top: none;
  }
  
  .table tbody tr:nth-child(n) td {
    background: hsla(270,4%,53%,.1);
  }
  
  .table tbody tr:nth-child(2n) td {
    background: hsla(270,4%,53%,.1);
  }
  tfoot {
    background: hsla(270,4%,53%,.1);
  }
  thead > tr > th {
    border: 1px solid hsla(0,0%,100%,.15);
  }
  tbody > tr > td {
    border: 1px solid hsla(0,0%,100%,.15);
  }
  
  `;


export default CustomDataTableWrapper;