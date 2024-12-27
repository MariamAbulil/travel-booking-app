import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  const location = useLocation();

  if (authToken) {
 
    return (
      <Navigate
        to={userType === "admin" ? "/admin" : "/home"}
        state={{ from: location }}
        replace
      />
    );
  }

 
  return <>{children}</>;
};

export default AuthRoute;