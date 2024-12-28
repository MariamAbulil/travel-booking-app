import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { default as LoginPage } from "./Pages/login";
import { default as HomePage } from "./Pages/home";
import { default as AdminPage } from "./Pages/admin";
import { default as SearchPage } from "./Pages/search";
import { default as HotelPage } from "./Pages/hotel";
import { default as CheckoutPage } from "./Pages/checkout/index";
import { default as ConfirmationPage } from "./Pages/confirmation";
import AuthRoute from "./Components/AuthRoute";
import ProtectedRoute from "./Components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />

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

        <Route
          path="/search"
          element={
            <ProtectedRoute role="user">
              <SearchPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotel/:hotelId"
          element={
            <ProtectedRoute role="user">
              <HotelPage />
            </ProtectedRoute>
          }
        />
        <Route path="/hotel/:hotelId" element={<HotelPage />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute role="user">
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation/:bookingId"
          element={
            <ProtectedRoute role="user">
              <ConfirmationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;