import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <Grid templateColumns="repeat(6, 1fr)"  bg="gray.50">
      {/* sidebar */}
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        className={styles.layout}
        minHeight={{ lg: "100vh" }}
        p={{ base: "20px", lg: "30px" }}
      >
        <Sidebar />
      </GridItem>

      {/* main content & navbar */}
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
