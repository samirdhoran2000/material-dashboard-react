import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";
// import { exportData } from "./data";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "order_date", headerName: "Order Date", width: 130 },
  { field: "exporter_name", headerName: "Exporter", width: 130 },
  { field: "consignee_name", headerName: "Consignee", width: 130 },
  {
    field: "hs_code",
    headerName: "HS Code",
    type: "number",
    width: 90,
  },
  {
    field: "product_description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "unit_quantity",
    headerName: "Unit",
    type: "string",
    width: 90,
  },
  {
    field: "ports",
    headerName: "Ports",
    // type: "number",
    width: 90,
  },
  {
    field: "foreign_port",
    headerName: "Foreign Port",
    width: 90,
  },
  {
    field: "foreign_country",
    headerName: "Foreign Country",
    width: 90,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 90,
  },
  {
    field: "unit_inr_amount",
    headerName: "Unit INR",
    type: "number",
    width: 90,
  },
  {
    field: "total_inr_amount",
    headerName: "Total INR",
    type: "number",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
function CustomTable({ data: exportData }) {
  // const [exData, setExData] = useState([]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={exportData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

// Define prop types with shape for exportData
CustomTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      order_date: PropTypes.string.isRequired,
      exporter_name: PropTypes.string.isRequired,
      consignee_name: PropTypes.string.isRequired,
      hs_code: PropTypes.string.isRequired,
      product_description: PropTypes.string.isRequired,
      unit_quantity: PropTypes.string.isRequired,
      ports: PropTypes.string.isRequired,
      foreign_port: PropTypes.string.isRequired,
      foreign_country: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unit_inr_amount: PropTypes.number.isRequired,
      total_inr_amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  // otherProp: PropTypes.string, // Define other props if necessary
};

CustomTable.defaultProps = {
  exportData: [], // Default value for exportData if necessary
};

export default CustomTable;
