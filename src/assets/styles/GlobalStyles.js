import { createGlobalStyle } from "styled-components";
import '../helius/montserrat/Montserrat-Regular.ttf';
import '../helius/montserrat/Montserrat-Bold.ttf';

const GlobalStyles = createGlobalStyle` 

html,
body {
    padding: 0;
    margin: 0;
    vertical-align: baseline;
    line-height: 1.6;
    overflow-x: hidden; 
    background: rgb(92,35,7);
    background-repeat: no-repeat;
    background-size: cover;
    text-transform: none;
}

img {
    max-width: 100%;
    height: auto;
}

ul, ol {
    list-style: outside none none;
    margin: 0px;
    padding: 0px;
}

html,
body{
    font-size: 19px;
    color: rgba(255, 255, 255, 0.8);
    background: rgb(215, 129, 66);
    background: linear-gradient(25deg, rgba(215, 129, 66, 1) 3%, rgba(230, 124, 31, 1) 32%, rgba(92, 35, 7, 1) 62%);
    background-repeat: no-repeat;
    background-size: cover;
} 

#rk_connect_title{
    line-height: 24px;
}

.container {
    width: 100%;
}
.canvasjs-chart-credit{
    display: none;
}

#disttitaneth:hover .disttinethtooltip_content {
    visibility: visible;
    opacity: 1;
}
`;

export default GlobalStyles;
