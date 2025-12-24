import React from "react";
import CustomDataTableWrapper from "./CustomDataTable.style";
import Table from "../table/Table";


const CustomDataTable = (props) => {
    const { data, minertype } = props;
    return (
        <CustomDataTableWrapper>
            <div className="table_container">
                <Table
                    data={data}
                    type={minertype}
                />

            </div>
        </CustomDataTableWrapper>
    );
}

export default CustomDataTable;