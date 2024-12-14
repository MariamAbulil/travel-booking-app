import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: any;
  role?: "user" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  if (!authToken) {
    return <Navigate to="/login" />; // Redirect to login if no authToken
  }

  if (role && userType !== role) {
    return <Navigate to="/login" />; // Redirect to login if role doesn't match
  }

  return children;
};

export default ProtectedRoute;
