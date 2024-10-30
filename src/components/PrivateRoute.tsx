import { useEffect } from "react";
import { UseAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, loading, fetchAuthStatus } = UseAuth();

  const location = useLocation();

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
