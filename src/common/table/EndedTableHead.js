import { useState } from "react";
const EndedTableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>

        <th rowSpan="2" className="default trank"> hRank </th>
        <th colSpan="4">Miner Details</th>
        <th rowSpan="2" className="default"> Cost </th>
        <th rowSpan="2" className="default"> HLX </th>
        <th rowSpan="2" className="default"> hRank Bouns </th>
        <th rowSpan="2" className="default"> Total Calimed </th>
        <th rowSpan="2" className="default" style={{ width: '150px' }}> Progress </th>
        <th rowSpan="2" className="action" style={{ width: '100px' }}>Action</th>

      </tr>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
                ? "down"
                : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={cl}
            >
              {label}
            </th>

          );
        })}
      </tr>
    </thead>
  );
};

export default EndedTableHead;