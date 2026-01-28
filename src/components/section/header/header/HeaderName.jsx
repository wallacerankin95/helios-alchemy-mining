import React from "react";
import { Link } from "react-router-dom";

const HeaderName = ({ selectedHeader, setSelectedHeader, headerName, to }) => {
    return (
        <li className={selectedHeader === headerName ? 'active' : ''}>
            <Link to={to} onClick={() => setSelectedHeader(headerName)}>{headerName}</Link>
        </li>
    );
};

export default HeaderName;
