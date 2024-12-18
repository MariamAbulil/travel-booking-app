import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { default as LoginPage } from "./Pages/login";
import { default as HomePage } from "./Pages/home";
import { default as AdminPage } from "./Pages/admin"; // Add more admin pages
import AuthRoute from "./Components/AuthRoute";
import ProtectedRoute from "./Components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for /login - Check if user is already logged in */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute role="user">
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Add additional routes for user and admin here */}
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminPage /> {/* Replace with your Admin Settings Page */}
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <HomePage /> {/* Replace with your User Profile Page */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
