import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import SelectComponent from "layouts/rtl/components/custom-components/SelectComponent";
import { useState, useEffect } from "react";
import CustomTable from "layouts/rtl/components/custom-components/CustomTable";
import { exportData } from "layouts/rtl/components/custom-components/data";

function Dashboard() {
  // const { columns, rows } = authorsTableData();
  const [selectData, setSelectData] = useState({
    exportData: exportData,
    country: "Germany",
  });

  const handleDataFromSelect = (data) => {
    setSelectData(data);
    console.log("Data received in parent: ", data);
    console.table(data);
  };

  useEffect(() => {
    console.log("Selected data in parent component: ", selectData);
  }, [selectData]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SelectComponent sendData={handleDataFromSelect} />

      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="weekend"
                title="Consignees"
                count={selectData?.exportData?.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${selectData?.country}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="leaderboard"
                title="Average Quantity"
                count={"2,300"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${selectData?.country}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="store"
                title="Average Price"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${selectData?.country}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Foreign Ports"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${selectData?.country}`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Grid item xs={12}>
        <CustomTable data={selectData} />
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
