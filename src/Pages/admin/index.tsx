import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar/index";
import "./style.css";

const AdminPage: React.FC = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSlidingFormOpen, setIsSlidingFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/admin/navigation"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsSlidingFormOpen(true);
  };

  const handleFormClose = () => {
    setIsSlidingFormOpen(false);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    // delete token from LocalStorage
    localStorage.setItem("authToken", "");

    // go to login page
    window.location.href = "/login";
  };

  return (
    <div className="admin-page">
      <Sidebar />
     
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
