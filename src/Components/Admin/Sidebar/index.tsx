import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CitiesTable from "../CitiesTable";
import HotelsTable from "../HotelsTable";

import "./style.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    // delete token from LocalStorage
    localStorage.setItem("authToken", "");

    // go to login page
    navigate("/login");
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
          <Tab label="Logout" onClick={() => handleLogout()} />
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
