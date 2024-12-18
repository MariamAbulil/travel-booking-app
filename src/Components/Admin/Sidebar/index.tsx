import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./style.css";
import CitiesTable from "../CitiesTable";
import HotelsTable from "../HotelsTable";

const Sidebar: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex">
      <Box className="sidebar">
        <h3 className="sidebar-title">Admin Dashboard</h3>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="admin dashboard tabs"
          orientation="vertical"
          className="sidebar-tabs"
        >
          <Tab label="🏙️ Manage Cities" tabIndex={0} />
          <Tab label="🏨 Manage Hotels" tabIndex={1} />
        </Tabs>
      </Box>
      <Box className="tab-content">
        {value === 0 && <CitiesTable />}
        {value === 1 && <HotelsTable />}
      </Box>
    </Box>
  );
};

export default Sidebar;
