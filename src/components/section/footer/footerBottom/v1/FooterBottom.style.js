import styled from "styled-components";

const FooterBottomStyleWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 51px;
  margin-top: 30px;

  .v2_main_footer {
    width: 100%;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .v2_footer_menu {
    max-width: 550px;
    width: 100%;
  }

  .v2_footer_logo {
    margin-bottom: 0px;
    margin-left:8%;
  }

  .bottom_footer_menulist {
    display: flex;
    justify-content: center;
    ul {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 10px 0;
      padding: 0;

      a {
        color: rgba(255, 255, 255, 0.8);
        font-size: 30px;
        line-height: 40px;
        text-align: center;
        text-decoration: none;
      }
    }
  }

  .v2_footer_copiright_text {
    margin-bottom: 40px;
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
  }

  .v2_footer_shapes_left {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }

  .v2_footer_shapes_right {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  button.bact_to_top_btn {
    background: none;
    border: none;
  }

  @media only screen and (max-width: 991px) {
    margin-top: 20px;
  }

  @media only screen and (max-width: 767px) {
    .v2_footer_shapes_left,
    .v2_footer_shapes_right {
      display: none;
    }
  }

  @media only screen and (max-width: 575px) {
    .bottom_footer_menulist {
      ul {
        flex-direction: column;
      }
    }
  }
`;

export default FooterBottomStyleWrapper;
