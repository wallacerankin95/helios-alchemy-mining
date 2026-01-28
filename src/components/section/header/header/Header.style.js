import styled from "styled-components";

const NavWrapper = styled.nav`

  &.bithu_header {
    max-width: 1600px;
    margin: auto;
    padding: 24px 15px 16px 12px;
    height: auto;
    transition: all 0.3s;

    // &.sticky {
    //   position: fixed;
    //   top: 0;
    //   width: 100%;
    //   background: rgba(27, 34, 38, 0.8);
    //   backdrop-filter: blur(15px);
    //   z-index: 998;
    //   margin-top: 0px;
    //   transition: all 0.2s;
    // }
  }

  .bithu_menu_sect {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bithu_menu_left_sect {
      align-items: center;
      display: flex;
      flex-basis: 100%;
      flex-direction: row;
      justify-content: start;
      text-align: center;
  
      .logo {
        position: relative;
  
        img {
          width: 220px;
          height: 52px;
          
        }
      }
      
      .bithu_menu_right_sect {
        display: flex;
        flex-direction: row;
        position: relative;

        .bithu_menu_list {
          margin-left: 20px;
          max-width: 800px;
          min-width: 409px;
          width: 100%;
          ul {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            gap: 10px;
      
            li {
              position: relative;
              cursor: pointer;
      
              a {
                font-family: 'Cinzel', sans-serif;
                font-weight: bold;
                font-size: 14px;
                text-decoration: none;
                padding: 5px 3px; 
                // color: #f4b940; 
                color: #f4b940;
                transition: color 0.1s ease, border-color 0.1s ease;
                // border: 2px solid transparent;
                text-wrap: nowrap;
              }
      
              &:hover {
                a {
                  // border: 2px solid #ba3505; 
                  // border-radius: 20px;
                  color: #ba3505; 
                  border-color: #ba3505;
                }
              }
              &.active {
                a {
                  border: 2px solid #fff; 
                  color: #fff; 
                  border-color: #fff;
                  border-radius: 20px;
                  // padding: 0 10px;
                }
              }
      
              /* submenu */
              &.submenu {
                .sub_menu_sect {
                  background: transparent;
                  border-top: 50px solid transparent;
                  position: absolute;
                  top: -50px;
                  left: -20px;
                  width: 190px;
                  visibility: hidden;
                  opacity: 0;
                  z-index: -100;
                  transition: all 0.5s;
      
                  .sub_menu_list {
                    padding: 15px 20px;
                    background: #171f25;
                    flex-wrap: wrap;
                    li {
                      width: 100%;
                      a {
                        font-family: "Bakbak One";
                        font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 40px;
                        color: rgba(255, 255, 255, 0.8);
                        text-transform: capitalize;
                      }
      
                      &:hover {
                        a {
                          color: #00ffa3;
                        }
                      }
                    }
                  }
                }
      
                &:hover {
                  .sub_menu_sect {
                    top: 7px;
                    visibility: visible;
                    opacity: 1;
                    z-index: 99;
                  }
                }
              }
            }
          }
        }
      }
    }   
  }
  .connect_button {
    display: flex;
    line-height: 0.1;
    .header_pill_dropdown {
      margin: 0 12px 0 10px;
      border: 2pt solid #f35000;
      border-radius: 20px;
      min-width: 120px;
      .pill_day {
        text-align: center;
        font-size: 0.75rem;
        font-weight: bold;
        margin-top: 12px;
      }
      .pill_hour_time {
        text-align: center;
        font-size: 0.65rem;
        margin-top: 6px;
        margin-bottom: 9px;
      }
    }
  }

  .bithu_menu_btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // min-width: 284px;
    margin-right: 5px;

    button {
      color: #f4b940;
      font-family: 'Cinzel', sans-serif;      
      font-weight: bold;
      font-size: 5px;
    }

    .menu_btn {
      display: none;
      border: 1px solid #f4b940;
      border-radius: 5px;      
      background: transparent;
      cursor: pointer;
      svg {
        font-size: 40px;
      }
    }
  }

  .iekbcc0.ju367va.ju367v1n{
    height: 40px;
    border-radius: 40px;
    background: #BA3505;
    min-width: 165px;
    display: flex;
    align-items: center;
    justify-content: center;
    &._12cbo8i3:hover{
      transform: scale(1) !important;
    }
    button{
      background: transparent;
      border-color: transparent;
      box-shadow: none;
      text-wrap:nowrap;
    }
    .ju367v9x{
      background: transparent;
      border-color: transparent;
    }
  }

  @media (max-width: 1024px) {
    .bithu_menu_list {
      margin-right: 20px;
    }
  }
  @media (max-width: 1175px) {
    .bithu_menu_right_sect {
      justify-content: center;
    }
    .bithu_menu_btns {
      justify-content: center;
      margin-top: -5px;
      .menu_btn {
        display: block;
      }
    }

    .bithu_menu_btns {
      .join_btn {
        display: none;
      }
    }
  }
  @media (max-width: 1214px) {
    .bithu_menu_list {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }

  @media (max-width: 667px) {
    .bithu_menu_btns {
      .connect_btn {
        display: none;
      }

      .menu_btn {
        svg {
          font-size: 30px;
        }
      }
    }
  }

  @media (max-width: 540px) {
    .bithu_menu_left_sect {
      width: 180px;
      .logo {
        img {
          width: 100px;
        }
      }
    }
    .logo {
      display: none;
    }

    .bithu_menu_right_sect {
      width: 50%;
      .bithu_menu_right_sect {
        width: 50%;
      }
    }
  }
`;

export default NavWrapper;
