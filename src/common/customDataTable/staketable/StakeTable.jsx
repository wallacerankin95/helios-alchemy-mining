import StakeTableWrapper from "./StakeTable.style";

import StakeTabTable from "../../table/StakeTabTable";

const StakeTable = (props) => {
    const { data, staketype } = props;

    return (
        <StakeTableWrapper>
            <div className="table_container">
                <StakeTabTable data={data} type={staketype}
                />
            </div>
        </StakeTableWrapper>
    );
};

export default StakeTable;
