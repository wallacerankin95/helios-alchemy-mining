import EndedMinerTableWrapper from "./EndedMinerTable.style";

import EndedTable from "../../table/EndedTable";
import tableData1 from "../../../assets/helius/tableData1.json";

const columns = [

    { label: "Length", accessor: "email", sortable: true },
    { label: "Start Day", accessor: "gender", sortable: true, sortbyOrder: "desc" },
    { label: "End Day", accessor: "age", sortable: true },
    { label: "Power", accessor: "start_date", sortable: true },

];

const EndedMinerTable = () => {

    return (
        <EndedMinerTableWrapper>
            <div className="table_container">
                <EndedTable
                    data={tableData1}
                    columns={columns}
                />

            </div>
        </EndedMinerTableWrapper>
    );
}

export default EndedMinerTable;