import React from "react";
import './style.css'

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Admin Dashboard</h3>
      <ul className="sidebar-menu">
        <li>
          <a href="#cities" className="sidebar-link">
            🏙️ Manage Cities
          </a>
        </li>
        <li>
          <a href="#hotels" className="sidebar-link">
            🏨 Manage Hotels
          </a>
        </li>
        <li>
          <a href="#reservations" className="sidebar-link">
            📅 Manage Reservations
          </a>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
