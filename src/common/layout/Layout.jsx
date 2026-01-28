import { Helmet } from "react-helmet";
import favIcon from "../../assets/helius/HLX.png"
const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        {/* meta tag*/}
        <meta charset="utf-8" />
        <title>
          {" "}
          Helios
        </title>
        <meta name="description" content="" />
        <link rel="shortcut icon" href={favIcon} />
        {/* responsive tag */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" /> 
        {/* Bootstrap Latest compiled and minified CSS  */}
      </Helmet>  
      {children} 
    </>
  );
};

export default Layout;
