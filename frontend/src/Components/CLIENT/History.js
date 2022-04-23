import React from "react";
import historytablecolumns from "./historytablecolumn";
import DataTable from "../COMMON/DataTable";
import historytabledata from "./historytabledata"
function History()
{
    return (
        <DataTable columns={historytablecolumns} data={historytabledata}  onclicklink={'/client/track'} />
    )
}

export default History;