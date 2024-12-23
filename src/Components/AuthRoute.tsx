import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }: any) => {
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  const location = useLocation();

  if (authToken) {
    return (
      <Navigate
        to={userType === "admin" ? "/admin" : "/home"}
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
};

export default AuthRoute;
