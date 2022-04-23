import react from 'react'
import DataTable from "../COMMON/DataTable";
import OrdersColumn from './OrdersColumn';
import OrdersData from './OrdersData';
function Orders() {
    return (
        <DataTable columns={OrdersColumn} data={OrdersData}  onclicklink={'/company/track'} />
    )

}
export default Orders;