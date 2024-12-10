import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import LoginPage from "./Pages/login/index";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;