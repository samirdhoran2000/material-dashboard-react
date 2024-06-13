import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import SelectComponent from "layouts/rtl/components/custom-components/SelectComponent";
import { useState } from "react";
import CustomTable from "layouts/rtl/components/custom-components/CustomTable";

function Dashboard() {
  const [selectData, setSelectData] = useState({
    exportData: [],
    country: "All",
    averageQuantity: 0,
    averagePrice: 0,
    consigneeCount: 0,
  });

  const handleDataFromSelect = (data) => {
    setSelectData(data);
    console.log("Data received in parent: ", data);
  };

  const { exportData, country, averageQuantity, averagePrice, consigneeCount } =
    selectData;

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
                count={
                  consigneeCount
                    ? consigneeCount.toFixed(0)
                    : "Please Select Country"
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
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
                count={
                  averageQuantity
                    ? averageQuantity.toFixed(0)
                    : "Please Select Country"
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
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
                count={
                  averagePrice
                    ? averagePrice.toFixed(2)
                    : "Please Select Country"
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Country Records"
                count={exportData.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
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
